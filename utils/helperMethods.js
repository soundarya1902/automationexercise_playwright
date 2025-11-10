import { expect } from '@playwright/test';
const DataManager = require('./dataManager');

const interval = 15000;

class helperMethods {
  constructor(page) {
    this.page = page;
    this.testData = DataManager.readTestData(); // Global testData for all page objects
  }

  async goTo(url) {
    console.log(`Navigating to '${url}'.`);
    await this.page.goto(url);
  }

  async lookForLocator(selector) {
    try {
      if ((await this.page.locator(selector).count()) > 0) return true;
      else return false; // Element not found
    } catch (error) {
      if (error.name === 'ElementHandleError' && error.message.includes('no element found')) {
        return false; // Element not found
      }
      throw error; // Propagate other errors
    }
  }

  async clickIfExists(selector) {
    try {
      if ((await this.page.locator(selector).count()) > 0) await this.page.locator(selector).click();
      // else console.log(`Element not found with selector: ${selector}`)
    } catch (error) {
      console.error(`Error while clicking element with selector ${selector}:`, error);
    }
  }

  async clickFirstElement(selector) {
    await this.page.locator(selector).first().click({ timeout: interval });
  }

  async getByPlaceholderAndClick(selector) {
    await this.page.getByPlaceholder(selector).click({ timeout: interval });
  }

  async getByRoleNameAndClick(selector, name) {
    await this.page.getByRole(selector, { name: name }).click();
  }

  async fillTextBox(selector, value) {
    await this.page.fill(selector, value);
  }

  async fillTextBoxForPlaceHolder(selector, value) {
    await this.page.getByPlaceholder(selector).fill(value);
  }

  async forceClick(selector) {
    await this.page.locator(selector).dispatchEvent('click');
  }

  async fillIframeTextBox(iframeSelector, selector, value) {
    await this.page.frameLocator(iframeSelector).locator(selector).fill(value);
  }

  async fillIframeClickBtn(iframeSelector, selector) {
    await this.page.frameLocator(iframeSelector).locator(selector).first().click();
  }

  async validateText(selector, expectedText) {
    const textContent = await this.page.textContent(selector);
    console.log(`Text content of element with selector '${selector}': ${textContent}`);
    expect(textContent.trim()).toBe(expectedText);
  }

  async getTextFromLocator(selector) {
    await this.page.locator(selector).nth(0).waitFor();
    const text = await this.page.locator(selector).nth(0).textContent();
    if (!text || text.trim() === '') {
      throw new Error(`Text from locator ${selector} is empty`);
    }
    return text.trim();
  }
  async getTextFromAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }
  async checkTextNotEmpty(selector) {
    const locator = this.page.locator(selector).nth(0);
    await locator.waitFor();
    const text = await locator.textContent();
    if (!text || text.trim() === '') {
      throw new Error(`The text content of the element ${selector} is empty`);
    }
  }

  async isElementChecked(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    expect(await this.page.locator(selector)).toBeChecked();
  }

  async isElementDisabled(selector) {
    await this.page.waitForTimeout(3000);
    await expect(await this.page.locator(selector)).toBeDisabled();
  }

  async isElementEnabled(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    await expect(await this.page.locator(selector)).toBeEnabled();
  }

  async validateUrlIncludes(substring) {
    await expect(this.page).toHaveURL(new RegExp(`.${substring}.*`));
  }

  async validateUrlEnd(expectedEnd) {
    expect(this.page.url()).toMatch(new RegExp(`/${expectedEnd}$`));
  }
  async isElementVisible(selectorOrLocator) {
    // Check if it's a string selector or a locator object
    const locator =
      typeof selectorOrLocator === 'string'
        ? this.page.locator(selectorOrLocator) // Convert string to locator
        : selectorOrLocator; // Already a locator

    await locator.waitFor({ state: 'visible' });
    await expect(locator).toBeVisible();
  }

  async isElementNotVisible(element) {
    await expect(element).toBeHidden();
  }

  async isElementExists(selector) {
    if ((await this.page.locator(selector).count()) > 0) console.log('Element exists on the page.');
    else console.log('Element does not exist on the page.');
  }
  async injectcookie(sessionCookie) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem('sessionid', value);
    }, sessionCookie);
  }
  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkCalls() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitforsomeTime() {
    await this.page.waitForTimeout(5000);
  }
  async selectRadioButton(selector) {
    await this.page.locator(selector).click();
  }
  async selectDropdownOption(dropdownSelector, optionValue) {
    // Use Playwright's selectOption to select the dropdown option by option
    await this.page.selectOption(dropdownSelector, optionValue);
  }
  async selectDropdownValue(dropdownSelector, labelText) {
    // Use Playwright's selectOption to select the dropdown option by value
    await this.page.selectOption(dropdownSelector, { label: labelText });
  }
  async pauserun() {
    await this.page.pause(5000);
  }

  /**
   * Validates the count of elements against an expected count
   * @param {string} element - The CSS selector to find elements
   * @param {number} count - The expected number of elements
   */
  async validateElementCount(element, count) {
    const actualCount = await this.page.locator(element).count();
    if (actualCount === count) {
      console.log(`✓ Element count validation passed: Found ${actualCount} elements`);
    } else {
      throw new Error(`Element count validation failed: Expected ${count}, but found ${actualCount} elements`);
    }
  }
}
export default helperMethods;
