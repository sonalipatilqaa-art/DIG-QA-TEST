import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";

// Ensure the 'Given' step is defined in this file
Given(/^I am on the (.+) page$/, async (pageName) => {
    // 1. Open the page (e.g., login)
    await LoginPage.open(); 
    
    // 2. Clear any popups that might be blocking the view
    await LoginPage.closeEntryAdIfPresent();
});

// Use "([^"]*)" to capture the <username> and <password> strings
When(/^I login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
    await LoginPage.login(username, password);
});


Then(/^I should see a flash message saying "([^"]*)"$/, async (message) => {
    const flash = await SecurePage.flashAlert;
    
    // Explicitly wait for the flash message to exist and be visible
    await flash.waitForDisplayed({ 
        timeout: 8000, 
        timeoutMsg: 'Flash message did not appear. Browser alert might still be blocking.' 
    });

    await expect(flash).toHaveTextContaining(message);
});