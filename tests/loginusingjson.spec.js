import test from '../utils/hooks';

const dataSet = JSON.parse(JSON.stringify(require('../testData/login.json')));
for (const data of dataSet) {
  test(`loginusingjson - ${data.description}`, async ({ createPage }) => {
    await createPage.homePage.navigateToHomepage();
    await createPage.homePage.userSignIn();
    await createPage.loginPage.enterEmail(data.email);
    await createPage.loginPage.enterPassword();
    await createPage.loginPage.clickLogin();
    await createPage.loginPage.validateLogin(data.email);
  });
}
