import test from '../utils/hooks'

const loginData = [
    { email: 'valid', description: 'valid login' },
    { email: 'invalid' , description: 'invalid login'}
];
loginData.forEach( ({email,description})=>
{
    test(`Login test - ${description}`, async ({createPage}) => {
        await createPage.homePage.navigateToHomepage()
        await createPage.homePage.userSignIn()
        await createPage.loginPage.enterEmail(email)
        await createPage.loginPage.enterPassword()
        await createPage.loginPage.clickLogin()
        await createPage.loginPage.validateLogin(email)
    })
})
