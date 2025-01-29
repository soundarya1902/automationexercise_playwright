import { test } from '@playwright/test';
import pageManager from '../utils/pageManager';

let context, page;

const login = test.extend({
  // Define the fixture
  testData: {
    email: 'valid',
    description: 'valid login',
  },
  createPage: async ({ browser }, use) => {
    context = await browser.newContext();
    page = await context.newPage();
    const createPage = new pageManager(page); // Initialize pageManager
    await use(createPage); // Provide it to the tests
  },
});
export default login;
