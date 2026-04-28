import { When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import dropdownPage from "../pageobjects/dropdown.page.js";

When(/^I select "(.+)"$/, async function (option) {
  await dropdownPage.select(option);
});

Then(/^The dropdown value should be "([^"]*)"$/, async (expectedText) => {
    const actualText = await dropdownPage.getSelectedOptionText();
    expect(actualText).toBe(expectedText);
});