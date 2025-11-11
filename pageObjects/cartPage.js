import helperMethods from '../utils/helperMethods';

const proceedToCheckout_button = '.btn.btn-default.check_out';
const productImage = '.product_image';
const productNameLocator = '.cart_description a';
const productPriceLocator = '.cart_price';
const productQuantityLocator = '.cart_quantity';
const cartDeleteButton = '.cart_quantity_delete';
const cartModalId = '#checkoutModal';
const registerLoginLinkSelector = `${cartModalId} a[href="/login"]`;

class cartPage extends helperMethods {
  constructor(page) {
    super(page);
  }
  async continueCheckout() {
    await this.clickFirstElement(proceedToCheckout_button);
    await this.validateUrlEnd('checkout');
  }
  async continueGuestCheckout() {
    await this.clickFirstElement(proceedToCheckout_button);
    await this.page.waitForLoadState('networkidle');
  }
  async validateCartDetails() {
    await this.validateUrlEnd(this.testData.cart.cartPageUrl);
    await this.isElementVisible(proceedToCheckout_button);
    await this.isElementVisible(productImage);
    await this.validateText(productNameLocator, this.testData.products.productName);
    await this.validateText(productPriceLocator, this.testData.products.productPrice);
    await this.validateText(productQuantityLocator, '1');
    await this.isElementVisible(cartDeleteButton);
  }
  async validateCheckoutModal() {
    await this.isElementVisible(cartModalId);
    await this.validateText(`${cartModalId} .modal-body p`, this.testData.cart.guestCheckoutModal.bodyText);
    await this.validateText(`${cartModalId} .modal-footer button`, 'Continue On Cart');
    await this.isElementVisible(registerLoginLinkSelector);
    await this.clickFirstElement(registerLoginLinkSelector);
  }
}
export default cartPage;
