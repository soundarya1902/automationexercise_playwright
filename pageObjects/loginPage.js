import helperMethods from '../utils/helperMethods'
const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')))



class loginPage extends helperMethods {
    constructor(page) {
        super(page)
         this.email_text=this.page.locator("[data-qa=\"login-email\"]")
         this.password_text=this.page.locator("[data-qa=\"login-password\"]")
         this.login_button=this.page.locator('[data-qa="login-button"]')
         this.logout=this.page.locator("a[href*='logout']")
         this.error_text=this.page.locator('[data-qa="login-password"] + p')
    }
   async enterEmail(email) {
      let inputEmail=email==='valid'?testData.validemail:testData.invalidemail
        await this.fillTextBox(this.email_text, inputEmail)
    }
    async enterPassword() {
         await this.fillTextBox(this.password_text, testData.password)
    }
    async clickLogin() {
        await this.clickFirstElement(this.login_button)
    }
    async validateLogin(email) {
        await this.waitForNetworkCalls()
        email==='valid'?await this.isElementExists(this.logout):await this.validateText(this.error_text,testData.errormessage)
    }
    async validateNewAccount() {
        await this.isElementVisible(this.logout)
    }
    async validUserLogin() {
        await this.enterEmail('valid')
        await this.enterPassword()
        await this.clickLogin()
        await this.validateLogin('valid')
    }
}
export default loginPage