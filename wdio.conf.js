import fs from 'fs';
import path from 'path';

export const config = {
    runner: "local",
    specs: ["./features/**/*.feature"],
    maxInstances: 10,
    capabilities: [{
        browserName: "chrome",
        "goog:chromeOptions": {
            args: [
                "--headless", 
                "--no-sandbox", 
                "--disable-dev-shm-usage",
                "--window-size=1920,1080",
                "--incognito"
            ]
        }
    }],
    framework: "cucumber",
    // Ensure this matches the workflow 'allure-results' path
    reporters: ['spec', ['allure', { 
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }]],
    cucumberOpts: {
        require: ['./features/step-definitions/*.js'],
        timeout: 60000
    },
    afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    }
};
