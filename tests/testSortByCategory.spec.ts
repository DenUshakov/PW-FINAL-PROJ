import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

enum ProductCategory {
    HandTools = 'HandTools',
    PowerTools = 'PowerTools',
    Sander = 'Sander',
    Other = 'Other',
  }

  test('testSortByCategory', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');

    const waitPromise = page.waitForResponse(request => 
      request.url().includes('by_category=') && request.status() === 200, {timeout: 5000});
  
    await page.getByText(ProductCategory.Sander).check();
    await waitPromise;

    const products = await homePage.getProductNames();
    
    const allContainCategory = products.every(productName =>
        productName.includes(ProductCategory.Sander)
      );
    
      expect(allContainCategory).toBe(true);

    });