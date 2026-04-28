import Page from './page.js';

class DropdownPage extends Page {
    get dropdownMenu() { return $('#dropdown'); }

    async open() {
        return super.open('dropdown');
    }

    async select(option) {
        await this.dropdownMenu.waitForDisplayed({ timeout: 5000 });
        await this.dropdownMenu.selectByVisibleText(option);
    }

    // This replaces the slow CSS selector with a direct browser query
    async getSelectedOptionText() {
        await this.dropdownMenu.waitForDisplayed({ timeout: 5000 });
        return await browser.execute((el) => {
            return el.options[el.selectedIndex].text;
        }, await this.dropdownMenu);
    }
}

export default new DropdownPage();