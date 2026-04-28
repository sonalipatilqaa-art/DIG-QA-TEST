import Page from './page.js';

class CheckboxesPage extends Page {
    // Selects all checkbox elements inside the form
    get checkboxInputs() { 
        return $$('#checkboxes input'); 
    }

    // Directs navigation to the specific checkboxes sub-page
    open() {
        return super.open('checkboxes');
    }

    async select(num) {
        const el = (await this.checkboxInputs)[num - 1];
        await el.waitForDisplayed();
        
        // Logical check: only click if not already checked
        const isSelected = await el.isSelected();
        if (!isSelected) {
            await el.click();
        }
    }
}

export default new CheckboxesPage();