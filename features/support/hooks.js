import { After, AfterStep } from '@wdio/cucumber-framework';

/**
 * Defensive After Hook
 * Ensures that if a test crashes, the cleanup doesn't throw a secondary error.
 */
After(async function () {
    // 1. Cleanup CDP session (if used in Basic Auth)
    if (this.cdp) {
        try {
            await this.cdp.send('Fetch.disable');
            await this.cdp.detach();
            console.log('Successfully detached CDP');
        } catch (e) {
            // Silently ignore if session is already gone
            console.log('CDP cleanup skipped: Session already closed');
        }
        this.cdp = null;
    }

    // 2. Clear Local Storage/Cookies to ensure the next test is isolated
    try {
        await browser.reloadSession(); 
    } catch (e) {
        console.log('Session reload skipped: Browser already closed');
    }
});

/**
 * Defensive Screenshot Hook
 */
AfterStep(async function (step, scenario, result) {
    // Only take a screenshot if the step failed AND the browser is still alive
    if (!result.passed) {
        try {
            await browser.takeScreenshot();
        } catch (e) {
            console.log('Failed to take screenshot: Browser session ended abruptly');
        }
    }
});