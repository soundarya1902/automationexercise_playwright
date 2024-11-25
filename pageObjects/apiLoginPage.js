import helperMethods from '../utils/helperMethods';
import { request } from '@playwright/test';
import pageManager from '../utils/pageManager';
import fs from 'fs';

const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')));
let createPage;

class apiLoginPage extends helperMethods {
  static async loginApi({ browser }) {
    // req2-- no need of req1
    const csrfmiddleware = await request.newContext();
    const csrfmiddlewareResponse = await csrfmiddleware.get(testData.apiUrl + '/login');
    const csrfmiddlewaretokenText = await csrfmiddlewareResponse.text();
    const csrfmiddlewaretoken = csrfmiddlewaretokenText.split('name="csrfmiddlewaretoken" value="')[1].split('"')[0];
    const csrfToken = csrfmiddlewareResponse.headers()['set-cookie'].split('csrftoken=')[1].split(';')[0];
    testData.csrfToken = csrfToken;
    fs.writeFileSync('testData/testData.json', JSON.stringify(testData, null, 2));
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
    testData.sessionId = sessionIdCookie.value;
    fs.writeFileSync('testData/testData.json', JSON.stringify(testData, null, 2));
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
