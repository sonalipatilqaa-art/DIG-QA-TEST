import { Given, When, Then } from '@wdio/cucumber-framework';
import InputsPage from '../pageobjects/inputs.page.js';

Given(/^I am on the inputs page$/, async () => {
    await InputsPage.open();
});

When(/^I enter "([^"]*)"$/, async function (num) {
    this.enteredValue = num; // Store for the next step
    await InputsPage.enterValue(num);
});

Then(/^The input value should be the number I entered$/, async function () {
    // WebdriverIO's expect is asynchronous and handles the 'await' internally 
    // when passed an element object
    await expect(InputsPage.inputField).toHaveValue(this.enteredValue);
});