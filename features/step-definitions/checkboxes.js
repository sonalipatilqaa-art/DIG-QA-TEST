import { Given, When, Then } from '@wdio/cucumber-framework';
import CheckboxesPage from '../pageobjects/checkboxes.page.js';

// This must match "Given I am on the Checkboxes page" exactly
Given(/^I am on the Checkboxes page$/, async () => {
    await CheckboxesPage.open(); 
});

When(/^I select checkbox (\d+)$/, async function (num) {
    const index = parseInt(num);
    // Store the element for the Then step assertion
    this.targetCheckbox = (await CheckboxesPage.checkboxInputs)[index - 1];
    await CheckboxesPage.select(index);
});

Then(/^The checkbox should be checked$/, async function () {
    // Use the stored element to verify it is selected
    await expect(this.targetCheckbox).toBeSelected();
});