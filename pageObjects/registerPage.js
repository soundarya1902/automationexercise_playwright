import helperMethods from '../utils/helperMethods'
import {expect} from "@playwright/test";
const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')))
const signupEmail_input='[data-qa="signup-email"]'
const signupname_input='[data-qa="signup-name"]'
const signUp_button='[data-qa="signup-button"]'
const getRandomText = () => Math.random().toString(36).substring(2, 9)
const gender_radio='#id_gender1'
const name_input='#name'
const email_input='#email'
const password_input='#password'
const days_dropdown='#days'
const months_dropdown='#months'
const years_dropdown='#years'
const firstName_input='#first_name'
const lastName_input='#last_name'
const company_input='#company'
const address_input='#address1'
const country_dropdown='#country'
const state_dropdown='#state'
const city_input='#city'
const zipcode_input='#zipcode'
const mobile_input='#mobile_number'
const namevalue_input='myname'
const createAccount_button='[data-qa="create-account"]'
const accountCreated_text='[data-qa="account-created"] b'
const continue_button='[data-qa="continue-button"]'
const randomEmail=getRandomText()+"@gmail.com"

class registerPage extends helperMethods {
    constructor(page) {
        super(page)
    }

    async enterEmail() {
        console.log(randomEmail)
        await this.fillTextBox(signupEmail_input, randomEmail)
    }

    async enterName(name) {
        await this.fillTextBox(signupname_input, namevalue_input)
    }

    async clickSignUp() {
        await this.clickFirstElement(signUp_button)
    }

    async validateUrl() {
        await this.validateUrlIncludes('signup')
    }

    async fillRegisterData() {
        await this.selectRadioButton(gender_radio)
        expect(await this.getTextFromAttribute(name_input, 'value')).toBe(namevalue_input)
        expect(await this.getTextFromAttribute(email_input, 'value')).toBe(randomEmail)
        await this.fillTextBox(password_input, testData.registerpassword)
        await this.selectDropdownOption(days_dropdown, testData.days)
        await this.selectDropdownValue(months_dropdown, testData.months)
        await this.selectDropdownOption(years_dropdown, testData.years)
        await this.fillTextBox(firstName_input, testData.firstName)
        await this.fillTextBox(lastName_input, testData.lastName)
        await this.fillTextBox(company_input, testData.company)
        await this.fillTextBox(address_input, testData.address)
        await this.selectDropdownOption(country_dropdown, testData.country)
        await this.fillTextBox(state_dropdown, testData.state)
        await this.fillTextBox(city_input, testData.city)
        await this.fillTextBox(zipcode_input, testData.zipcode)
        await this.fillTextBox(mobile_input, testData.mobile)
        await this.clickFirstElement(createAccount_button)
    }

    async validateUserCreation() {
        await this.validateUrlIncludes('account_created')
        await this.validateText(accountCreated_text,'Account Created!')
        await this.clickFirstElement(continue_button)
    }
}
export default registerPage
