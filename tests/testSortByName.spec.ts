import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import dotenv from 'dotenv'
dotenv.config();

const sortOption = [
    {label: 'name,asc', ascending: true}, 
    {label: 'name,desc', ascending: false},
];

sortOption.forEach(({ label, ascending }) => {
    test(`testSortByName ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      await homePage.sort(label); 
      await homePage.waitForProducts();
  
      const products = await homePage.getProductNames();
  
      const isSorted = products.every((value, index, array) => {
        if (index === 0) return true;
        const compare = array[index - 1].localeCompare(value);
        return ascending ? compare <= 0 : compare >= 0;
      });
  
      expect(isSorted).toBe(true);
    });
  });