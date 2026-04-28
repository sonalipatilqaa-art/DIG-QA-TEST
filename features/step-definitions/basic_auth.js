import { Given, Then } from '@wdio/cucumber-framework';

Given(/^I use basic auth to login with (\w+) and (.+)$/, async function (username, password) {
    // 1. Visit the base domain first
    await browser.url('https://the-internet.herokuapp.com/');

    // 2. Navigate using the credentials in the URL
    await browser.pause(1000);
    await browser.url(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);

    // 3. If the Native Popup appears (happens on wrong credentials/Safari), click Cancel
    try {
        if (await browser.isAlertOpen()) {
            await browser.dismissAlert();
        }
    } catch (e) {
        // No alert, which is expected for a successful admin login
    }
});

Then(/^I should see a paragraph saying (.*)$/, async function (message) {
    // FIX: Use 'body' instead of '.example' 
    // This allows the code to "see" the text even on the blank error page
    const pageBody = await $('body');
    await pageBody.waitForDisplayed({ timeout: 5000 });

    const text = (await pageBody.getText()).toLowerCase();
    const expected = message.trim().toLowerCase();

    if (!text.includes(expected)) {
        throw new Error(`Text check failed! Expected "${message}", but found: "${text}"`);
    }
    
    console.log(`✅ Verified message: ${message}`);
});