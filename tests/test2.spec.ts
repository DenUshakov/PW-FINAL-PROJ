import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('');
  await page.getByText('Combination Pliers').click();
  await page.locator('[data-test="product-name"]').click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect(page).toHaveURL(/product?\//);
  await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});