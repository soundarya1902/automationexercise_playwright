import { restoreSessionInfo, storeSessionInfo } from './hooks';

const fs = require('fs');



class apiMethods {
  async login({ createPage }) {
    await createPage.homePage.navigateToHomepage();
    await createPage.homePage.userSignIn();
    await createPage.loginPage.validUserLogin()
    await storeSessionInfo()
    const data = fs.readFileSync('cookies.json', 'utf8');
    const cookies = JSON.parse(data).cookies;
    const sessionCookie = cookies.find(cookie => cookie.name === 'sessionid');
    return sessionCookie ? sessionCookie.value : null;

  }
}

export default apiMethods