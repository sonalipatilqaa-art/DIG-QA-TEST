import fs from 'fs';
import path from 'path';

export const config = {
    runner: "local",
    specs: ["./features/**/*.feature"],
    maxInstances: 10,
    
    // REQUIRED: Add devtools service to enable getPuppeteer() for CDP auth interception
    services: ['devtools'],

    capabilities: [{
    browserName: "chrome",
    webSocketUrl: true, // Add this line
    "goog:chromeOptions": {
        args: [
            "--headless=new", 
            "--no-sandbox", 
            "--disable-dev-shm-usage"
        ]
    }
}],

    logLevel: 'error',
    framework: "cucumber",

    reporters: [
        'spec', 
        ['allure', { 
            outputDir: 'allure-results', // Matches your workflow path
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true // Better readability for Cucumber
        }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    // HOOKS
    afterStep: async function (step, scenario, result) {
        // Automatically attach screenshots to Allure on failure
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    },

    onPrepare: function () {
        // Clean allure-results locally before run to avoid mixing old data
        if (fs.existsSync('allure-results')) {
            fs.rmSync('allure-results', { recursive: true, force: true });
        }
    }
};