import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * List of sub-page paths for the Heroku app
   */
  get paths() {
    return {
      "Basic Auth": "basic_auth",
      Checkboxes: "checkboxes",
      Dropdown: "dropdown",
      inputs: "inputs",
      "A/B Testing": "abtest",
      "Add/Remove Elements": "add_remove_elements/",
      "Broken Images": "broken_images",
      "Challenging DOM": "challenging_dom",
      "Context Menu": "context_menu",
      "Digest Authentication": "digest_auth",
      "Disappearing Elements": "disappearing_elements",
      "Drag and Drop": "drag_and_drop",
      "Dynamic Content": "dynamic_content",
      "Dynamic Controls": "dynamic_controls",
      "Dynamic Loading": "dynamic_loading",
      "Entry Ad": "entry_ad",
      "Exit Intent": "exit_intent",
      "File Download": "download",
      "File Upload": "upload",
      Inputs: "inputs",
      "Floating Menu": "floating_menu",
      "Forgot Password": "forgot_password",
      "Form Authentication": "login",
      Frames: "frames",
      Geolocation: "geolocation",
      "Horizontal Slider": "horizontal_slider",
      Hovers: "hovers",
      "Infinite Scroll": "infinite_scroll",
      "JQuery UI Menus": "jqueryui/menu",
      "JavaScript Alerts": "javascript_alerts",
      "JavaScript onload event error": "javascript_error",
      "Key Presses": "key_presses",
      "Large & Deep DOM": "large",
      "Multiple Windows": "windows",
      "Nested Frames": "nested_frames",
      "Notification Messages": "notification_message",
      "Redirect Link": "redirector",
      "Secure File Download": "download_secure",
      "Shadow DOM": "shadowdom",
      "Shifting Content": "shifting_content",
      "Slow Resources": "slow",
      "Sortable Data Tables": "tables",
      "Status Codes": "status_codes",
      Typos: "typos",
      "WYSIWYG Editor": "tinymce",
    };
  }

  /**
   * Base URL for the application
   */
  get base() {
    return `https://the-internet.herokuapp.com`;
  }

  /**
   * Selectors for common UI modals/popups
   */
  get modal() { return $('#modal'); }
  get modalCloseBtn() { return $('.modal-footer p'); }

  /**
   * Helper to click links based on their path mapping
   */
  async click(name) {
    const path = this.paths[name];
    const anchor = await $(`a[href="/${path}"]`);
    await anchor.click();
  }

  /**
   * Closes the common 'Entry Ad' modal if it appears on screen
   */
  async closeEntryAdIfPresent() {
    try {
      // Check if modal appears within 2 seconds
      const isVisible = await this.modal.waitForDisplayed({ timeout: 2000 });
      if (isVisible) {
        await this.modalCloseBtn.click();
        // Wait for it to disappear so it doesn't block future clicks
        await this.modal.waitForDisplayed({ reverse: true });
      }
    } catch (error) {
      // If no modal appears, we simply ignore the error and continue
    }
  }

  /**
   * Opens a sub page of the page
   * @param path key from the paths object or a direct string (e.g. 'login')
   */
  async open(path = "") {
    const targetPath = this.paths[path] || path;
    await browser.url(`${this.base}/${targetPath}`);
  }
}