import helperMethods from '../utils/helperMethods';
import { expect, request } from '@playwright/test';

const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')));

class apiProductPage extends helperMethods {
  static async addproductToCart() {
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
