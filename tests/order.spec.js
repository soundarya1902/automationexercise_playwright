import test from '../utils/hooks';

test.describe('Order Product', () => {
  test('orderProductUI', async ({ createPage }) => {
    await createPage.homePage.navigateToHomepage();
    await createPage.homePage.userSignIn();
    await createPage.commonPage.userLogin();
    await createPage.homePage.navigateToProductsPage();
    await createPage.plpPage.viewFirstProduct();
    await createPage.pdpPage.validateProductInfo();
    await createPage.pdpPage.addToCart();
    await createPage.homePage.navigateToCartsPage();
    await createPage.cartPage.continueCheckout();
    await createPage.checkoutPage.placeOrder();
  });

  test('orderProductAPI', async ({ createPage }) => {
    await createPage.homePage.navigateToHomepage();
  });
});
