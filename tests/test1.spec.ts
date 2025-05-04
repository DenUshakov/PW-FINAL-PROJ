import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv'
dotenv.config();

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
 
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

  await expect(page).toHaveURL('/account');
  await expect(page.locator('h1')).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText(process.env.USER_NAME as string);
  
});