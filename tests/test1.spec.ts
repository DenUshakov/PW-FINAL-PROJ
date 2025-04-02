import { test, expect } from '@playwright/test';
require('dotenv').config();

test('test', async ({ page }) => {
  await page.goto(process.env.WEB_URL + '/auth/login');
 
  await page.fill('#email', process.env.USER_EMAIL as string);
  await page.fill('#password', process.env.USER_PASSWORD as string);
  await page.locator('[data-test="login-submit"]').click();
  
  await expect(page).toHaveURL(process.env.WEB_URL + '/account');
  await expect(page.locator('h1')).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText(process.env.USER_NAME as string);
  
});