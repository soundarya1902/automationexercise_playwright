import test from '../../utils/hooks';
import apiLoginPage from '../../pageObjects/apiLoginPage';
import apiProductPage from '../../pageObjects/apiProductPage';

test.describe('Order Product', () => {
  let createPage;
  test.beforeAll(async ({ browser }) => {
    createPage = await apiLoginPage.loginApi({ browser });
  });

  test('@api orderProductUI', async () => {
    await createPage.loginPage.validateLogin('valid');
    await createPage.plpPage.viewFirstProduct();
    await createPage.pdpPage.validateProductInfo();
    await createPage.pdpPage.addToCart();
    await createPage.homePage.navigateToCartsPage();
    await createPage.cartPage.continueCheckout();
    await createPage.checkoutPage.placeOrder();
  });
  test('@api orderProduct', async () => {
    await apiProductPage.addproductToCart();
    await createPage.homePage.navigateToCartsPage();
    await createPage.cartPage.continueCheckout();
    await createPage.checkoutPage.placeOrder();
  });
});
