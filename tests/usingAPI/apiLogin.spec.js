import test from '../../utils/hooks';
import apiMethods from '../../utils/apiMethods';
import apiLoginPage from '../../pageObjects/apiLoginPage';

let page, createPage;
test.describe('API Login', () => {
  //login->get cookie from browser context->store cookie in session storage->use cookie to login
  test('apilogin using session storage', async ({ browser, createPage }) => {
    // Set the session cookie in the browser context
    const context = await browser.newContext({
      storageState: {
        cookies: [
          {
            name: 'sessionid',
            value: await new apiMethods().login({ createPage }),
            domain: testData.domain,
            path: '/',
            expires: -1, // Set to -1 to indicate a session cookie
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
          },
        ],
      },
    });
    page = await context.newPage();
    await page.goto('/');
    await createPage.loginPage.validateLogin('valid');
  });
  // login using apicalls-- used this everywhere
  test('apilogin using preloading cookie', async ({ browser }) => {
    createPage = await apiLoginPage.loginApi({ browser });
    await createPage.loginPage.validateLogin('valid');
  });
});
