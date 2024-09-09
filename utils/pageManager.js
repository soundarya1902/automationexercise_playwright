import commonPage from '../pageObjects/commonPage'
import homePage from '../pageObjects/homePage'
import loginPage from '../pageObjects/loginPage'
import helperMethods from "./helperMethods";


class pageManager extends helperMethods {
    constructor(page) {
        super(page)
        this.homePage = new homePage(page)
        this.loginPage = new loginPage(page)
        this.commonPage = new commonPage(page)

    }
}

export default pageManager
