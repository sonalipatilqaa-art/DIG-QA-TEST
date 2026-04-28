import { Before } from '@wdio/cucumber-framework';

Before(async function () {
    // In WDIO, the 'browser' object is already global.
    // To handle Basic Auth popups in WDIO:
    await browser.setCredentials(
        process.env.LOGIN_USER || 'admin', 
        process.env.LOGIN_PASS || 'admin'
    );
});