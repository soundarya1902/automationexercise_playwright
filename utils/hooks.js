import { test as baseTest } from '@playwright/test'
import pageManager from "../utils/pageManager"

const hooks = baseTest.extend({
    createPage: async ({ page }, use) => {
        const createPage = new pageManager(page);  // Initialize pageManager
        await use(createPage);  // Provide it to the tests
    }
});

export default hooks;