import helperMethods from '../utils/helperMethods'
const singnIn_button='a[href=\'/login\']'


class homePage extends helperMethods {
    constructor(page) {
        super(page)
    }

    async userSignIn() {
        await this.goTo('/')
        await this.clickFirstElement(singnIn_button)
    }

}
export default homePage