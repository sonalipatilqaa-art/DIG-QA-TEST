import { Given, When, Then } from "@wdio/cucumber-framework";
import { browser, expect } from "@wdio/globals";
import Page from "../pageobjects/page.js";
const index = new Page();

Given("I am at the index page", async function () {
  await index.open();
});

When(/^I click the (.+) link$/, async function (page) {
  // Store the page name to verify it in the next step
  this.pageName = page; 
  await index.click(page);
});

Then("I should be driected to the selected page", async function () {
  const expectedPath = index.paths[this.pageName];
  expect(expectedPath).toBeDefined();

  const currentUrl = await browser.getUrl();
  await expect(currentUrl).toContain(`${index.base}/${expectedPath}`);

  /* // Option B: If you MUST use Regex on the HTML:
  const html = await $("body").getHTML(); 
  const regex = new RegExp(`h3.*${this.pageName}.*h3`, "gi"); // 'i' for case-insensitive
  expect(html).toMatch(regex);
  */
});