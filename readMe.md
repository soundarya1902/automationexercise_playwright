npm init playwright --> all set
only one browser:browserName: 'chromium',
all browsers and parallel: user projects[]
npx playwright test login.spec.js -- from terminal -single
npx playwright test -- from terminal -all
put trace as on in config file to get trace.zip when run in terminal -for debugging
npx playwright test /tests/login.spec.js --config .\playwright.configbrowsers.js-- to run all projects
npx playwright test /tests/login.spec.js --config .\playwright.configbrowsers.js --project=webkit_execution-- to run
only specific project
npx playwright test --grep @api -- to run using tags

import test from '../testData/loginfixture';== comes with testData fixture and createpage
import test from '../utils/hooks'-- only for createapge

in config file
ignoreHttpsErrors: true,-- when company is restricitnq the access to the site
permissions: {notifications: 'granted'},-- when site is asking for permission
permissions: {geolocation: },-- when site is asking for location
trace and video-retain-on-failure: true,-- to get trace and video on failure

specs are triggered in parallel
tests in spec are triggered in sequence
to test tests in a spec in parallel->use describe block->describe.configure({mode: 'parallel'})/test.describe.parallel('
Login tests', () => {-- in spec file
spec mean worker and by default playwright max is 5 and can be customized workers :2 in config file

Allue reporting:
need package first:
1)npm install --save-dev @playwright/test allure-playwright
2)npx playwright test --reporter=line,allure-playwright
3)allure generate ./allure-results --clean
4)allure open ./allure-report



