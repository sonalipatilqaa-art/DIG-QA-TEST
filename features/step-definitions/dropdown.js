import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import dropdownPage from '../pageobjects/dropdown.page.js';

Given(/^I am on the Dropdown page$/, async () => {
    await dropdownPage.open();
});

When(/^I select "([^"]*)"$/, async (option) => {
    await dropdownPage.select(option);
});

Then(/^The dropdown value should be "([^"]*)"$/, async (expectedText) => {
    const actualText = await dropdownPage.getSelectedOptionText();
    
    // Using WDIO globals expect for clean assertions
    await expect(actualText).toBe(expectedText);
    
    console.log(`✅ Dropdown verification passed: Found "${actualText}"`);
});