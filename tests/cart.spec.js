import test from '../utils/hooks';

test.describe('cart page checks', () => {
  test('cart page checks', async ({ createPage }) => {
    await createPage.homePage.navigateToHomepage();
    const firstProduct = await createPage.plpPage.getProductDetailsFromPlp('Women');
    await createPage.plpPage.navigateToProductsPageFromPlp(firstProduct);
    await createPage.pdpPage.addToCart();
    await createPage.cartPage.validateCartDetails();
    await createPage.cartPage.continueGuestCheckout();
    await createPage.cartPage.validateCheckoutModal();
    await createPage.loginPage.validUserLogin();
  });
});
