import test from '../utils/hooks'

test.describe('Order Product', () => {
    test('orderProductUI', async ({createPage}) => {
        await createPage.homePage.navigateToHomepage()
        await createPage.homePage.userSignIn()
        await createPage.commonPage.userLogin()
        await createPage.homePage.navigateToProductsPage()
        await createPage.plpPage.viewFirstProduct()
        await createPage.pdpPage.validateProductInfo()
        await createPage.pdpPage.addToCart()
        await createPage.pdpPage.validateModal()
        await createPage.pdpPage.continueShopping()
        await createPage.homePage.navigateToCartssPage()
        await createPage.cartPage.conitnueCheckout()
        await createPage.checkoutPage.placeOrder()
    })

    test('orderProductAPI', async ({createPage}) => {
        await createPage.homePage.navigateToHomepage()
    })
})
