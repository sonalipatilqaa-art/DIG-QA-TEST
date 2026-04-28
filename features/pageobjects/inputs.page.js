import Page from './page.js';

class InputsPage extends Page {
    /**
     * Define selectors using getter methods
     */
    get inputField() { 
        return $('input[type="number"]'); 
    }

    /**
     * Helper method to open the specific sub-page
     */
    open() {
        return super.open('inputs');
    }

    /**
     * Action methods to encapsulate logic
     */
    async enterValue(val) {
        await this.inputField.waitForDisplayed();
        await this.inputField.setValue(val);
    }
}

export default new InputsPage();