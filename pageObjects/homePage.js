import helperMethods from '../utils/helperMethods'


class homePage extends helperMethods {
    constructor(page) {
        super(page)
        this.signIn_button = this.page.locator('a[href=\'/login\']')
        this.delete_button = this.page.locator("a[href='/delete_account']")
        this.products_button = this.page.locator("a[href='/products']")
        this.carts_button = this.page.locator("[href=\"/view_cart\"]:visible")
    }


    async userSignIn() {
        await this.clickFirstElement(this.signIn_button)
    }
    async navigateToHomepage() {
        await this.goTo('/')
    }
    async deleteAccount() {
        await this.clickFirstElement(this.delete_button)
    }
    async navigateToProductsPage() {
        await this.clickFirstElement(this.products_button)
        await this.validateUrlIncludes('products')
    }
    async navigateToCartssPage() {
        await this.clickFirstElement(this.carts_button)
        await this.validateUrlIncludes('view_cart')
    }
}
export default homePage