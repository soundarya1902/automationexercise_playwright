import test from '../testData/loginfixture';

test(`Login test`, async ({ createPage, testData }) => {
  await createPage.homePage.navigateToHomepage();
  await createPage.homePage.userSignIn();
  await createPage.loginPage.enterEmail(testData.email);
  await createPage.loginPage.enterPassword();
  await createPage.loginPage.clickLogin();
  await createPage.loginPage.validateLogin(testData.email);
});
