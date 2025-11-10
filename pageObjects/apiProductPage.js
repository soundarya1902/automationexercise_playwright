import helperMethods from '../utils/helperMethods';
import { expect, request } from '@playwright/test';

class apiProductPage extends helperMethods {
  static async addproductToCart() {
    // Get testData in static method
    const DataManager = require('../utils/dataManager');
    const testData = DataManager.readTestData();

    const addProductContext = await request.newContext();
    const addProductResponse = await addProductContext.get(testData.apiUrl + '/add_to_cart/1', {
      params: {
        quantity: 1,
      },
      headers: {
        referer: '/product_details/1',
        Cookie: `csrftoken=${testData.csrfToken}; sessionid=${testData.sessionId}`,
        'accept-encoding': 'gzip, deflate, br, zstd',
      },
    });
    expect(await addProductResponse.status()).toEqual(200);
    expect(await addProductResponse.text()).toContain('Added To Cart');
  }
}

export default apiProductPage;
