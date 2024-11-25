import commonPage from '../pageObjects/commonPage';
import homePage from '../pageObjects/homePage';
import loginPage from '../pageObjects/loginPage';
import helperMethods from './helperMethods';
import registerPage from '../pageObjects/registerPage';
import plpPage from '../pageObjects/plpPage';
import pdpPage from '../pageObjects/pdpPage';
import cartPage from '../pageObjects/cartPage';
import checkoutPage from '../pageObjects/checkoutPage';
import apiLoginPage from '../pageObjects/apiLoginPage';

class pageManager extends helperMethods {
  constructor(page) {
    super(page);
    this.homePage = new homePage(page);
    this.loginPage = new loginPage(page);
    this.commonPage = new commonPage(page);
    this.registerPage = new registerPage(page);
    this.plpPage = new plpPage(page);
    this.pdpPage = new pdpPage(page);
    this.cartPage = new cartPage(page);
    this.checkoutPage = new checkoutPage(page);
  }
}

export default pageManager;
