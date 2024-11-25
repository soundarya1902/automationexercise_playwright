import helperMethods from '../utils/helperMethods'

const proceedToCheckout_button=".btn.btn-default.check_out"


class cartPage extends helperMethods {
    constructor(page) {
        super(page)
    }
    async conitnueCheckout() {
        await this.clickFirstElement(proceedToCheckout_button)
        await this.validateUrlEnd('checkout')
    }

}
export default cartPage