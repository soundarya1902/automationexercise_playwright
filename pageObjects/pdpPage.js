import exp from 'node:constants';
import helperMethods from '../utils/helperMethods';
import { expect } from '@playwright/test';

// Optimized locators
const productsButton = 'a[href="/products"]';
const productInfo = '.product-information';
const addToCartButton = '.btn.btn-default.cart';
const modalContent = '.modal-content';
const modalCartId = '#cartModal';
const continueShoppingButton = '.btn.btn-success';
const ratingImg = 'img[src*="rating"]';
const quantityInput = '#quantity';
const shopDetailsTab = '.shop-details-tab';
const reviewForm = '#review-form';

class pdpPage extends helperMethods {
  constructor(page) {
    super(page);
  }

  async validateProductInfo() {
    await this.isElementVisible(productInfo);
  }

  async verifyProductDetailsFromPLP() {
    console.log(
      `Verifying PDP matches PLP data: ${this.testData.products.productName}, ${this.testData.products.productPrice}`,
    );

    // Get PDP product details
    const productInfoLocator = this.page.locator(productInfo);
    const pdpName = await productInfoLocator.locator('h2').textContent();
    const pdpPrice = await productInfoLocator.locator('span span').first().textContent();

    // Validate they match
    expect(pdpName.trim()).toBe(this.testData.products.productName);
    expect(pdpPrice.trim()).toBe(this.testData.products.productPrice);
    console.log('✓ Product details match between PLP and PDP');
  }

  async addToCart() {
    await this.clickFirstElement(addToCartButton);
    await this.page.waitForLoadState('networkidle');

    await this.page
      .locator(modalCartId)
      .getByRole('link', { name: this.testData.products.cartModal.viewCartLinkText })
      .click();

    await this.page.waitForLoadState('networkidle');
  }

  async continueShopping() {
    await this.clickFirstElement(continueShoppingButton);
  }

  async navigateToProductsPage() {
    await this.goTo(this.testData.baseUrl + this.testData.products.url);
    await this.page.waitForLoadState('networkidle');
  }

  async validateProductDetails() {
    await this.validateUrlEnd(this.testData.products.url);
    const productInfoLocator = this.page.locator(productInfo);
    await expect(productInfoLocator.getByRole('heading', { level: 2 })).toHaveText(this.testData.products.productName);
    await expect(productInfoLocator.locator('p').first()).toContainText(this.testData.products.category);
    await expect(productInfoLocator.getByRole('img', { name: this.testData.products.altText }).first()).toBeVisible();
    await expect(productInfoLocator.locator('span span')).toHaveText(this.testData.products.productPrice);
    await expect(productInfoLocator.locator(ratingImg)).toBeVisible();
    const quantityValue = await productInfoLocator.locator(quantityInput).inputValue();
    expect(quantityValue).toBe('1');

    const addToCartBtn = productInfoLocator.locator(addToCartButton);
    await expect(addToCartBtn).toHaveText(this.testData.products.addToCartButtonText);
    await addToCartBtn.click();

    const cartModal = this.page.locator(modalCartId);
    await this.isElementVisible(cartModal.getByRole('heading', { name: this.testData.products.cartModal.header }));
    await expect(cartModal.locator('.modal-body p').first()).toHaveText(this.testData.products.cartModal.bodyText);
    await expect(
      cartModal.getByRole('link', { name: this.testData.products.cartModal.viewCartLinkText }),
    ).toHaveAttribute('href', this.testData.products.cartModal.viewCartLink);
    const continueShoppingBtn = cartModal.getByRole('button', {
      name: this.testData.products.cartModal.continueShoppingButton,
    });
    await expect(continueShoppingBtn).toBeVisible();
    await continueShoppingBtn.click();

    //validate category shop details tab
    const shopDetailsTabLocator = this.page.locator(shopDetailsTab);
    await this.isElementVisible(shopDetailsTab);
    await expect(
      shopDetailsTabLocator.getByRole('link', { name: this.testData.products.shopDetails.writeYourReview }),
    ).toBeVisible();

    const reviewFormLocator = this.page.locator(reviewForm);
    await this.isElementVisible(reviewForm);
    await this.isElementVisible(reviewFormLocator.locator('#name'));
    await this.isElementVisible(reviewFormLocator.locator('#email'));
    await this.isElementVisible(reviewFormLocator.locator('#review'));

    // Fill form with visible typing
    await reviewFormLocator.locator('#name').fill('Test User', { delay: 50 });
    await reviewFormLocator.locator('#email').fill('testuser@example.com', { delay: 50 });
    await reviewFormLocator.locator('#review').fill('This is a test review.', { delay: 50 });

    // Verify values were entered
    await expect(reviewFormLocator.locator('#name')).toHaveValue('Test User');
    await expect(reviewFormLocator.locator('#email')).toHaveValue('testuser@example.com');
    await expect(reviewFormLocator.locator('#review')).toHaveValue('This is a test review.');

    await reviewFormLocator.getByRole('button', { name: ' Submit ' }).click();
    //await this.pauserun();
  }
}
export default pdpPage;
