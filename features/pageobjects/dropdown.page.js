import Page from './page.js';

class DropdownPage extends Page {
    /**
     * Define selectors using getter methods
     */
    get dropdownMenu() { return $('#dropdown'); }

    /**
     * Opens the dropdown page
     */
    async open() {
        return super.open('dropdown');
    }

    /**
     * Selects an option by its visible text
     * @param {string} option - The text of the option to select (e.g., "Option 1")
     */
    async select(option) {
        await this.dropdownMenu.waitForDisplayed({ timeout: 5000 });
        // ✅ The "Select API" fix: bypasses the need to click the menu
        await this.dropdownMenu.selectByVisibleText(option);
    }

    /**
     * Gets the text of the currently selected option via JavaScript execution
     * This is safer than CSS selectors for native HTML select elements.
     */
    async getSelectedOptionText() {
        await this.dropdownMenu.waitForDisplayed({ timeout: 5000 });
        return await browser.execute((el) => {
            return el.options[el.selectedIndex].text;
        }, await this.dropdownMenu);
    }
}

export default new DropdownPage();