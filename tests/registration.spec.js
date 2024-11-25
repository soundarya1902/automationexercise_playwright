import test from '../utils/hooks'

test('register', async ({ createPage }) => {
  await createPage.homePage.navigateToHomepage()
  await createPage.homePage.userSignIn()
  await createPage.registerPage.enterEmail()
  await createPage.registerPage.enterName()
  await createPage.registerPage.clickSignUp()
  await createPage.registerPage.validateUrl()
  await createPage.registerPage.fillRegisterData()
  await createPage.registerPage.validateUserCreation()
  await createPage.loginPage.validateNewAccount()
  await createPage.homePage.deleteAccount()
});

