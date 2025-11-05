import helperMethods from '../utils/helperMethods';
import { expect } from '@playwright/test';
const DataManager = require('../utils/dataManager');

const products_button = 'a[href="/products"]';
const viewProduct_info = '.product-information';
const addToCart_button = '[class="btn btn-default cart"]';
const modal = '.modal-content';
const modal_text = "div[id='cartModal'] p:nth-child(1)";
const continueShopping_button = '.btn.btn-success';

class pdpPage extends helperMethods {
  constructor(page) {
    super(page);
  }
  async validateProductInfo() {
    await this.isElementVisible(viewProduct_info);
  }

  async verifyProductDetailsFromPLP() {
    // Read fresh data from file (bypasses Node.js cache)
    const testData = DataManager.readTestData();

    console.log(`Verifying PDP matches PLP data: ${testData.products.productName}, ${testData.products.productPrice}`);

    // Get PDP product details
    const pdpName = await this.page.locator('.product-information h2').textContent();
    const pdpPrice = await this.page.locator('.product-information span span').first().textContent();

    // Validate they match
    expect(pdpName.trim()).toBe(testData.products.productName);
    expect(pdpPrice.trim()).toBe(testData.products.productPrice);
    console.log('✓ Product details match between PLP and PDP');
  }

  async addToCart() {
    await this.clickFirstElement(addToCart_button);
  }
  async validateModal() {
    await this.isElementVisible(modal);
    await this.validateText(modal_text, 'Your product has been added to cart.');
  }
  async continueShopping() {
    await this.clickFirstElement(continueShopping_button);
  }
}
export default pdpPage;
