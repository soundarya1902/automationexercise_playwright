import test from 'node:test';
import helperMethods from '../utils/helperMethods';
import { expect } from '@playwright/test';
const DataManager = require('../utils/dataManager');

const viewProduct_button = "a[href*='/product_details']";
const mainCategory = 'a[data-parent="#accordian"]';
const headertextLocator = '.title.text-center';
const breadcrumbLocator = '.breadcrumb li';
let subcategories = [];
const productTiles = '.features_items .col-sm-4';
const productInfo = '.productinfo';
const productOverlay = '.product-overlay';
const chooseIcon = '.choose i';
const chooseLink = '.choose a';
const priceLocator = 'h2';
const descriptionLocator = 'p';
const imageRole = 'img';

class plpPage extends helperMethods {
  constructor(page) {
    super(page);
  }
  async viewFirstProduct() {
    await this.clickFirstElement(viewProduct_button);
    await this.validateUrlEnd('product_details/1');
  }
  async verifyCategories() {
    const categoryCount = Object.keys(this.testData.category).filter((key) => key !== 'subcategories').length;
    await this.validateElementCount(mainCategory, categoryCount);
    const categoryKeys = Object.keys(this.testData.category).filter((key) => key !== 'subcategories');
    await Promise.all(
      categoryKeys.map(async (CategoryKeyName, index) => {
        const categoryName = (await this.page.locator(mainCategory).nth(index).textContent()).trim();
        expect(categoryName).toBe(this.testData.category[CategoryKeyName]);
      }),
    );
  }
  async verifySubCategories() {
    const categoryKeysWithSubcategories = Object.keys(this.testData.category.subcategories);
    console.log(`Found categories with subcategories: ${categoryKeysWithSubcategories.join(', ')}`);
    for (const categoryKey of categoryKeysWithSubcategories) {
      const categoryDisplayName = this.testData.category[categoryKey];
      subcategories = this.testData.category.subcategories[categoryKey];
      console.log(`\n=== Testing ${categoryDisplayName} subcategories ===`);
      for (let i = 0; i < subcategories.length; i++) {
        const subcategoryName = subcategories[i];
        const expectedHeaderText = `${categoryDisplayName} - ${subcategoryName} Products`;
        console.log(`Clicking on subcategory: ${subcategoryName}`);
        await this.page.locator(`a[href="#${categoryDisplayName}"]`).click();
        await this.page.waitForSelector(`#${categoryDisplayName} ul`, { state: 'visible' });
        await this.page.locator(`#${categoryDisplayName} ul li`).nth(i).locator('a').click();
        await this.page.waitForLoadState('networkidle');

        // Verify header text
        const headerText = await this.page.locator(headertextLocator).textContent();
        expect(headerText.trim()).toBe(expectedHeaderText);

        // Verify breadcrumb navigation pattern: Products > Women > Dress
        const breadcrumbItems = this.page.locator(breadcrumbLocator);
        await expect(breadcrumbItems.first()).toBeVisible();

        // Get all breadcrumb items
        const breadcrumbCount = await breadcrumbItems.count();
        const breadcrumbTexts = [];
        for (let j = 0; j < breadcrumbCount; j++) {
          const text = await breadcrumbItems.nth(j).textContent();
          breadcrumbTexts.push(text.trim());
        }
        const breadcrumbText = breadcrumbTexts.join(' > ');
        const expectedBreadcrumb = `Products > ${categoryDisplayName} > ${subcategoryName}`;
        expect(breadcrumbText).toBe(expectedBreadcrumb);
        console.log(`✓ Breadcrumb validated: ${breadcrumbText}`);

        await this.page.locator('a[href="/"]').first().click();
        await this.page.waitForLoadState('networkidle');
      }
      console.log(`=== Completed ${categoryDisplayName} subcategories ===`);
    }
  }

  async viewProductInCategory(categoryName) {
    const firstProduct = await this.getProductDetailsFromPlp(categoryName);

    // Verify product overlay on hover
    await firstProduct.hover();
    await expect(firstProduct.locator(productOverlay)).toBeVisible();
    await expect(firstProduct.locator(productOverlay).locator(priceLocator)).toHaveText(
      this.testData.products.productPrice,
    );
    await expect(firstProduct.locator(productOverlay).locator(descriptionLocator)).toHaveText(
      this.testData.products.productName,
    );
    await expect(firstProduct.locator(productOverlay).locator('a').filter({ hasText: 'Add to cart' })).toBeVisible();

    // Unhover and verify view button
    await this.page.locator('body').hover();
    await expect(firstProduct.locator(chooseIcon)).toHaveClass(/fa-plus-square/);
    await this.navigateToProductsPageFromPlp(firstProduct);
  }
  async navigateToProductsPageFromPlp(firstProduct) {
    // Navigate to PDP
    await firstProduct.locator('.choose a').filter({ hasText: 'View Product' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.validateUrlEnd(this.testData.products.url);
  }

  async getProductDetailsFromPlp(categoryName) {
    console.log(`Viewing first product in category: ${categoryName}`);
    await this.page.locator(`a[href*="${categoryName}"]`).click();
    categoryName = categoryName.toLowerCase();
    subcategories = this.testData.category.subcategories[categoryName];
    await this.page.locator(`a:has-text("${subcategories[0]}")`).first().click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator(productTiles)).toHaveCount(3);

    // Verify first product elements
    const firstProduct = this.page.locator(productTiles).first();
    const productinfo = firstProduct.locator(productInfo);
    await expect(productinfo).toBeVisible();

    // Verify image with alt attribute
    await expect(productinfo.getByRole(imageRole)).toBeVisible();
    await expect(productinfo.getByRole(imageRole)).toHaveAttribute('alt');
    expect(typeof (await productinfo.getByRole(imageRole).getAttribute('alt'))).toBe('string');
    // Verify and capture price
    await expect(productinfo.locator(priceLocator)).toBeVisible();
    const priceText = await productinfo.locator(priceLocator).textContent();
    expect(priceText).toMatch(/Rs\.\s*\d+/);

    // Verify and capture product name
    await this.isElementVisible(productinfo.locator(descriptionLocator));
    const productName = await productinfo.locator(descriptionLocator).textContent();
    expect(productName).toBeTruthy();

    DataManager.updateTestData({
      products: {
        productName: productName.trim(),
        productPrice: priceText.trim(),
        productAmount: parseInt(priceText.replace(/[^\d]/g, '')),
      },
    });
    console.log('Product data written to testData.json');
    return firstProduct;
  }
}
export default plpPage;
