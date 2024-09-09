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

  async lookForLocator(selector) {
    try {
      if ((await this.page.locator(selector).count()) > 0) return true
      else return false // Element not found
    } catch (error) {
      if (error.name === 'ElementHandleError' && error.message.includes('no element found')) {
        return false // Element not found
      }
      throw error // Propagate other errors
    }
  }

  async clickIfExists(selector) {
    try {
      if ((await this.page.locator(selector).count()) > 0) await this.page.locator(selector).click()
      // else console.log(`Element not found with selector: ${selector}`)
    } catch (error) {
      console.error(`Error while clicking element with selector ${selector}:`, error)
    }
  }

  async clickFirstElement(selector) {
    await this.page.locator(selector).first().click({ timeout: interval })
  }

  async getByPlaceholderAndClick(selector) {
    await this.page.getByPlaceholder(selector).click({ timeout: interval })
  }

  async getByRoleNameAndClick(selector, name) {
    await this.page.getByRole(selector, { name: name }).click()
  }

  async fillTextBox(selector, value) {
    await this.page.fill(selector, value)
  }

  async fillTextBoxForPlaceHolder(selector, value) {
    await this.page.getByPlaceholder(selector).fill(value)
  }

  async forceClick(selector) {
    await this.page.locator(selector).dispatchEvent('click')
  }

  async fillIframeTextBox(iframeSelector, selector, value) {
    await this.page.frameLocator(iframeSelector).locator(selector).fill(value)
  }

  async fillIframeClickBtn(iframeSelector, selector) {
    await this.page.frameLocator(iframeSelector).locator(selector).first().click()
  }

  async validateText(selector, expectedText) {
    const textContent = await this.page.textContent(selector)
    console.log(`Text content of element with selector '${selector}': ${textContent}`)
    expect(textContent.trim()).toBe(expectedText)
  }

  async getTextFromLocator(selector) {
    await this.page.locator(selector).nth(0).waitFor()
    const text = await this.page.locator(selector).nth(0).textContent()
    if (!text || text.trim() === '') {
      throw new Error(`Text from locator ${selector} is empty`)
    }
    return text.trim()
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
    expect(await this.page.locator(selector)).toBeDisabled()
  }

  async isElementEnabled(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' })
    expect(await this.page.locator(selector)).toBeEnabled()
  }

  async validateUrlIncludes(substring) {
    await expect(this.page).toHaveURL(new RegExp(`.${substring}.*`))
  }

  async isElementVisible(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' })
    expect(await this.page.locator(selector)).toBeVisible()
  }

  async isElementNotVisible(element) {
    await expect(element).toBeHidden()
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
}

export default helperMethods
