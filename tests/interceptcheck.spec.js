import { test } from '@playwright/test';

const mockResponse = {
  data: [
    {
      _id: '6581ca979fd99c85e8ee7faf',
      productName: 'ADIDAS ORIGINAL',
      productCategory: 'household',
      productSubCategory: 'shoes',
      productPrice: 31500,
      productDescription: 'Adidas shoes for Men',
      productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg',
      productRating: '0',
      productTotalOrders: '0',
      productStatus: true,
      productFor: 'men',
      productAddedBy: 'admin@gmail.com',
      __v: 0,
    },
  ],
  count: 1,
  message: 'All Products fetched Successfully',
};

// Use ignoreHTTPSErrors globally for the test
test.use({
  ignoreHTTPSErrors: true, // Ignore SSL certificate errors
});

test('verify intercept', async ({ page }) => {
  await page.route('**/get-all-products', async (route) => {
    const response = await page.request.fetch(route.request());
    await route.fulfill({
      response,
      body: JSON.stringify(mockResponse),
    });
  });

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.fill('#userEmail', 'soundarya.gunti@gmail.com');
  await page.fill('#userPassword', 'Test@123');
  await page.locator('#login').click();

  await page.waitForTimeout(5000);
  console.log(await page.locator("div[class='card-body'] h5 b").textContent());
});
