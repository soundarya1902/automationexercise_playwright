import { expect } from '@playwright/test'

const interval = 15000

class helperMethods {
  constructor(page) {
    this.page = page
  }

  async goTo(url) {
    console.log(`Navigating to '${url}'.`)
    await this.page.goto(url)
  }


  async clickIfExists(selector) {
    try {
      if ((await selector.count()) > 0) await this.page.locator(selector).click()
      // else console.log(`Element not found with selector: ${selector}`)
    } catch (error) {
      console.error(`Error while clicking element with selector ${selector}:`, error)
    }
  }

  async clickFirstElement(locator) {

        await locator.first().click({ timeout: interval });

  }

  async fillTextBox(selector, value) {
    await selector.fill(value);
  }


  async validateText(selector, expectedText) {
    const textContent = await selector.textContent()
    console.log(`Text content of element with selector '${selector}': ${textContent}`)
   await  expect(textContent).toBe(expectedText)
  }

  async getTextFromLocator(selector) {
    await selector.nth(0).waitFor()
    const text = selector.nth(0).textContent()
    if (!text || text.trim() === '') {
      throw new Error(`Text from locator ${selector} is empty`)
    }
    return text.trim()
  }
  async getTextFromAttribute(selector,attribute) {

    return await this.page.getAttribute(selector, attribute)
  }
  async checkTextNotEmpty(selector) {
    const locator = this.page.locator(selector).nth(0)
    await locator.waitFor()
    const text = await locator.textContent()
    if (!text || text.trim() === '') {
      throw new Error(`The text content of the element ${selector} is empty`)
    }
  }

  async isElementChecked(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' })
    expect(await this.page.locator(selector)).toBeChecked()
  }

  async isElementDisabled(selector) {
    await this.page.waitForTimeout(3000)
    await expect(await this.page.locator(selector)).toBeDisabled()
  }

  async isElementEnabled(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' })
    await expect(await this.page.locator(selector)).toBeEnabled()
  }

  async validateUrlIncludes(substring) {
    await expect(this.page).toHaveURL(new RegExp(`.${substring}.*`))
  }

  async validateUrlEnd(expectedEnd) {
    expect(this.page.url()).toMatch( new RegExp(`/${expectedEnd}$`))
  }
  async isElementVisible(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' })
    //await expect(await this.page.locator(selector)).toBeVisible()
    await expect(this.page.locator(selector)).toBeVisible()
  }

  async isElementNotVisible(element) {
    await expect(element).toBeHidden()
  }

  async isElementExists(selector) {
    if (await selector.count()  > 0)
      console.log('Element exists on the page.');
     else
      console.log('Element does not exist on the page.');
  }
  async injectcookie(sessionCookie) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem('sessionid', value)
    },sessionCookie)
  }
  async waitForNavigation() {
    await this.page.waitForNavigation()
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded')
  }

  async waitForNetworkCalls() {
    await this.page.waitForLoadState('networkidle')
  }

  async waitforsomeTime() {
    await this.page.waitForTimeout(5000)
  }
  async selectRadioButton(selector) {
    await this.page.locator(selector).click()
  }
  async selectDropdownOption(dropdownSelector, optionValue) {
    // Use Playwright's selectOption to select the dropdown option by option
    await this.page.selectOption(dropdownSelector, optionValue);
  }
  async selectDropdownValue(dropdownSelector, labelText) {
    // Use Playwright's selectOption to select the dropdown option by value
    await this.page.selectOption(dropdownSelector, { label: labelText })
  }
  async pauserun() {
    await this.page.pause(5000)
  }
}
export default helperMethods
