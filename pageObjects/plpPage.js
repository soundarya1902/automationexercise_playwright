import helperMethods from '../utils/helperMethods'

const viewProduct_button="a[href*='/product_details']"


class plpPage extends helperMethods {
    constructor(page) {
        super(page)
    }
    async viewFirstProduct() {
        await this.clickFirstElement(viewProduct_button)
        await this.validateUrlEnd('product_details/1')
    }

}
export default plpPage