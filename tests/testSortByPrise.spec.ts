import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import dotenv from 'dotenv'
dotenv.config();

const sortOption = [
    {label: 'price,asc', ascending: true}, 
    {label: 'price,desc', ascending: false},
];

sortOption.forEach(({ label, ascending }) => {
    test(`testSort ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      await homePage.sort(label); 
      await homePage.waitForProducts();
  
      const products = await homePage.getProductPrices();
      const numericPrices = products.map(price =>
        parseFloat(price.replace(/[^0-9.]/g, ''))
      );

    //   const isSorted = numericPrices.every((value, index, array) => {
    //   if (index === 0) return true;
    //   return ascending
    //     ? array[index - 1] <= value
    //     : array[index - 1] >= value;
    // });

let isSorted = true;

for (let i = 1; i < numericPrices.length; i++) {
  const prev = numericPrices[i - 1];
  const current = numericPrices[i];

  if (ascending && prev > current) {
    isSorted = false;
    break;
  }

  if (!ascending && prev < current) {
    isSorted = false;
    break;
  }
}

      expect(isSorted).toBe(true);
    });
  });