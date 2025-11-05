import test from '../utils/hooks';

test.describe('plp page checks', () => {
  test('category checks', async ({ createPage }) => {
    await createPage.homePage.navigateToHomepage();
    await createPage.plpPage.verifyCategories();
    await createPage.plpPage.verifySubCategories();
    await createPage.plpPage.viewProductInCategory('Women');
    await createPage.pdpPage.verifyProductDetailsFromPLP();
  });
});
