import helperMethods from '../utils/helperMethods'
const products_button="a[href='/products']"
const viewProduct_info=".product-information"
const addToCart_button="[class=\"btn btn-default cart\"]"
const modal=".modal-content"
const modal_text="div[id='cartModal'] p:nth-child(1)"
const continueShopping_button=".btn.btn-success"


class pdpPage extends helperMethods {
    constructor(page) {
        super(page)
    }
    async validateProductInfo() {
        await this.isElementVisible(viewProduct_info)
    }
    async addToCart() {
        await this.clickFirstElement(addToCart_button)
    }
    async validateModal() {
        await this.isElementVisible(modal)
        await this.validateText(modal_text,'Your product has been added to cart.')
    }
    async continueShopping() {
        await this.clickFirstElement(continueShopping_button)
    }

}
export default pdpPage