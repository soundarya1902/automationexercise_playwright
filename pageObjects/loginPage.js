import helperMethods from '../utils/helperMethods'
const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')))
const email_text="[data-qa=\"login-email\"]"
const password_text="[data-qa=\"login-password\"]"
const login_button='[data-qa="login-button"]'


class loginPage extends helperMethods {
    constructor(page) {
        super(page)
    }


    async enterEmail() {
        await this.fillTextBox(email_text, testData.email)
    }
    async enterPassword() {
         await this.fillTextBox(password_text, testData.password)
    }
    async clickLogin() {
        await this.clickFirstElement(login_button)
    }
}
export default loginPage