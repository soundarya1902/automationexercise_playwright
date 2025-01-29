import helperMethods from '../utils/helperMethods'
const singnIn_button='a[href=\'/login\']'
const delete_button="a[href='/delete_account']"
const products_button="a[href='/products']"
const carts_button="[href=\"/view_cart\"]:visible"

class homePage extends helperMethods {
    constructor(page) {
        super(page)
    }

    async userSignIn() {
        await this.clickFirstElement(singnIn_button)
    }
    async navigateToHomepage() {
        await this.goTo('/')
    }
    async deleteAccount() {
        await this.clickFirstElement(delete_button)
    }
    async navigateToProductsPage() {
        await this.clickFirstElement(products_button)
        await this.validateUrlIncludes('products')
    }
    async navigateToCartssPage() {
        await this.clickFirstElement(carts_button)
        await this.validateUrlIncludes('view_cart')
    }
}
export default homePage