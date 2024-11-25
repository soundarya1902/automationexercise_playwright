import helperMethods from '../utils/helperMethods'

const placeOrder_button=".btn.btn-default.check_out"
const cardname_input="input[name='name_on_card']"
const cardnumber_input="input[name='card_number']"
const cardcvv_input="[data-qa=\"cvc\"]"
const cardexpiration_input="[data-qa=\"expiry-month\"]"
const cardexpirationYear_input="[data-qa=\"expiry-year\"]"
const confirmOrder_button="#submit"
const orderConfirmation="[data-qa=\"order-placed\"]"


class checkoutPage extends helperMethods {
    constructor(page) {
        super(page)
    }
    async placeOrder() {
        await this.clickFirstElement(placeOrder_button)
        await this.validateUrlEnd('payment')
        await this.page.fill(cardname_input, 'John Doe')
        await this.page.fill(cardnumber_input, '4242424242424242')
        await this.page.fill(cardcvv_input, '123')
        await this.page.fill(cardexpiration_input, '12')
        await this.page.fill(cardexpirationYear_input, '2023')
        await this.clickFirstElement(confirmOrder_button)
        await this.validateText(orderConfirmation, 'Order Placed!')
    }

}
export default checkoutPage