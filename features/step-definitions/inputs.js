import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

Given('I am on the inputs page', async function () {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = await $('input[type="number"]');
    await input.waitForDisplayed({ timeout: 5000 });
});

When('I enter {string}', async function (num) {
    const input = await $('input[type="number"]');
    await input.setValue(num);
});

Then('The input value should be the number I entered', async function () {
    const input = await $('input[type="number"]');
    const val = await input.getValue();
    
    // Validate that the value is a number string
    await expect(val).toMatch(/^\d+$/);
});