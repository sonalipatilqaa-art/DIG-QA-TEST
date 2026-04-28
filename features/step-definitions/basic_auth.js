import { Given, Then, After } from '@wdio/cucumber-framework';

// 1. YOUR GIVEN STEP
Given(/^I use basic auth to login with (\w+) and (.+)$/, async function (username, password) {
    const puppeteer = await browser.getPuppeteer();
    const pages = await puppeteer.pages();
    const page = pages[0];
    const cdp = await page.target().createCDPSession();

    await cdp.send('Network.enable');
    await cdp.send('Fetch.enable', {
        handleAuthRequests: true,
        patterns: [{ urlPattern: '*' }]
    });

    cdp.on('Fetch.authRequired', async (event) => {
        await cdp.send('Fetch.continueWithAuth', {
            requestId: event.requestId,
            authChallengeResponse: {
                response: 'ProvideCredentials',
                username: username,
                password: password
            }
        });
    });

    cdp.on('Fetch.requestPaused', async (event) => {
        await cdp.send('Fetch.continueRequest', { requestId: event.requestId });
    });

    await browser.url(`https://the-internet.herokuapp.com/basic_auth`);
    
    // Store CDP session on the "this" object so the After hook can see it
    this.cdp = cdp; 
});

// 2. YOUR THEN STEP
Then(/^I should see a paragraph saying (.*)$/, async function (message) {
    const body = await $('body');
    
    await browser.waitUntil(async () => {
        const text = await body.getText();
        return text.trim().length > 0;
    }, {
        timeout: 5000,
        timeoutMsg: 'Page body remained empty'
    });

    const actualText = (await body.getText()).toLowerCase();
    const expectedText = message.replace(/['"]+/g, '').trim().toLowerCase();

    if (!actualText.includes(expectedText)) {
        throw new Error(`Expected: "${expectedText}", but found: "${actualText}"`);
    }
});

// 3. THE AFTER HOOK (Add this at the end)
After(async function () {
    if (this.cdp) {
        try {
            // This turns off the network interception so the next test starts clean
            await this.cdp.send('Fetch.disable');
            await this.cdp.detach();
            console.log('Successfully cleaned up CDP session.');
        } catch (e) {
            console.log('CDP already closed or failed to detach');
        }
        this.cdp = null;
    }
});