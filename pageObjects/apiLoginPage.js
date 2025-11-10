import helperMethods from '../utils/helperMethods';
import { request } from '@playwright/test';
import pageManager from '../utils/pageManager';

let createPage;

class apiLoginPage extends helperMethods {
  static async loginApi({ browser }) {
    // Get testData in static method
    const DataManager = require('../utils/dataManager');
    const testData = DataManager.readTestData();

    // req2-- no need of req1
    const csrfmiddleware = await request.newContext();
    const csrfmiddlewareResponse = await csrfmiddleware.get(testData.apiUrl + '/login');
    const csrfmiddlewaretokenText = await csrfmiddlewareResponse.text();
    const csrfmiddlewaretoken = csrfmiddlewaretokenText.split('name="csrfmiddlewaretoken" value="')[1].split('"')[0];
    const csrfToken = csrfmiddlewareResponse.headers()['set-cookie'].split('csrftoken=')[1].split(';')[0];
    //req3
    const loginContext = await request.newContext();
    const loginResponse = await loginContext.post(testData.apiUrl + '/login', {
      form: {
        csrfmiddlewaretoken: csrfmiddlewaretoken,
        email: testData.validemail,
        password: testData.password,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        origin: testData.apiUrl,
        referer: testData.apiUrl + '/login',
        Cookie: `csrftoken=${csrfToken}`,
        'accept-encoding': 'gzip, deflate, br, zstd',
      },
      maxRedirects: 0,
    });
    const sessionIdCookie = {
      name: 'sessionid',
      value: loginResponse.headers()['set-cookie'].split('sessionid=')[1].split(';')[0],
      domain: testData.domain,
      path: '/',
      expires: -1, // Set to -1 to indicate a session cookie
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    };

    // Update both values at once to avoid multiple file writes
    DataManager.updateTestData({
      csrfToken: csrfToken,
      sessionId: sessionIdCookie.value,
    });

    const context = await browser.newContext();
    await context.addCookies([sessionIdCookie]);
    //return await context.newPage()
    const page = await context.newPage();
    await page.goto('/');
    createPage = new pageManager(page);
    return createPage;
  }
}

export default apiLoginPage;
