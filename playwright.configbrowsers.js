const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
global.testData = JSON.parse(JSON.stringify(require(path.join(__dirname, `/testData/testData.json`))));
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['*.spec.js'],
  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 300000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium_execution',
      use: {
        browserName: 'chromium',
        baseURL: testData.baseUrl,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    {
      name: 'firefox_execution',
      use: {
        browserName: 'firefox',
        baseURL: testData.baseUrl,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    {
      name: 'webkit_execution',
      use: {
        browserName: 'webkit',
        baseURL: testData.baseUrl,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'MobileChrome_execution',
      use: {
        browserName: 'chromium',
        baseURL: testData.baseUrl,
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        viewport: { width: 720, height: 1280 }, //using viewport
      },
    },

    {
      name: 'iphoneChrome_execution',
      use: {
        browserName: 'safari',
        baseURL: testData.baseUrl,
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        use: { ...devices['iPhone 11'] }, //using device
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
