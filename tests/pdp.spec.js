import test from '../utils/hooks';

test.describe('pdp page checks', () => {
  test('product checks', async ({ createPage }) => {
    await createPage.pdpPage.navigateToProductsPage();
    await createPage.pdpPage.validateProductDetails();
  });
});
