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
    await page.getByText(ProductCategory.Sander).check();
    await page.waitForTimeout(1000);
    const products = await homePage.getProductNames();
    
    const allContainCategory = products.every(productName =>
        productName.includes(ProductCategory.Sander)
      );
    
      expect(allContainCategory).toBe(true);

    });