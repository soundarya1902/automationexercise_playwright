import { test ,expect } from '@playwright/test'
import pageManager from '../utils/pageManager'


//test
let createPage
test('valid login', async ({ page }) => {
    createPage= new pageManager(page)
    await createPage.homePage.userSignIn()
    await createPage.loginPage.enterEmail()
    await createPage.loginPage.enterPassword()
    await createPage.loginPage.clickLogin()
});
