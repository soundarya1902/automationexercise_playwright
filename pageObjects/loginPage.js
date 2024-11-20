import helperMethods from '../utils/helperMethods'
const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')))
const email_text="[data-qa=\"login-email\"]"
const password_text="[data-qa=\"login-password\"]"
const login_button='[data-qa="login-button"]'
const logout="a[href*='logout']"
const error_text='[data-qa="login-password"] + p'


class loginPage extends helperMethods {
    constructor(page) {
        super(page)
    }
   async enterEmail(email) {
      let inputEmail=email==='valid'?testData.validemail:testData.invalidemail
        await this.fillTextBox(email_text, inputEmail)
    }
    async enterPassword() {
         await this.fillTextBox(password_text, testData.password)
    }
    async clickLogin() {
        await this.clickFirstElement(login_button)
    }
    async validateLogin(email) {
        await this.waitForNetworkCalls()
        email==='valid'?await this.isElementExists(logout):await this.validateText(error_text,testData.errormessage)
    }
    async validateNewAccount() {
        await this.isElementVisible(logout)
    }
    async validUserLogin() {
        await this.enterEmail('valid')
        await this.enterPassword()
        await this.clickLogin()
        await this.validateLogin('valid')
    }
}
export default loginPage