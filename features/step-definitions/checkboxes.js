import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

Given('I am on the Checkboxes page', async function () {
    await browser.url('https://the-internet.herokuapp.com/checkboxes');
    await $('#checkboxes').waitForDisplayed({ timeout: 5000 });
});

When('I select checkbox {int}', async function (n) {
    // $$ returns an array of all matching checkboxes
    const checkboxes = await $$('#checkboxes input[type="checkbox"]');
    const targetCheckbox = checkboxes[n - 1]; // Convert 1-based index to 0-based

    if (!(await targetCheckbox.isSelected())) {
        await targetCheckbox.click();
    }
});

Then('The checkbox {int} should be checked', async function (n) {
    const checkboxes = await $$('#checkboxes input[type="checkbox"]');
    const targetCheckbox = checkboxes[n - 1];
    
    await expect(targetCheckbox).toBeSelected();
});