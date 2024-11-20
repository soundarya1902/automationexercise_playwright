import { test as baseTest } from '@playwright/test';
import pageManager from '../utils/pageManager';

let context, page, webContext;

const hooks = baseTest.extend({
  createPage: async ({ browser }, use) => {
    context = await browser.newContext();
    page = await context.newPage();
    const createPage = new pageManager(page);  // Initialize pageManager
    await use(createPage);  // Provide it to the tests
  }
});

async function storeSessionInfo() {
  await context.storageState({ path: 'cookies.json' });
}

async function restoreSessionInfo({ browser }, use) {
  webContext = await browser.newContext({ storageState: 'cookies.json' });
  page = await webContext.newPage();
  await use(new pageManager(page));
}

export { hooks as default, storeSessionInfo, restoreSessionInfo };