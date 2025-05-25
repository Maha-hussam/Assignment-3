import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sorting Feature', () => {
  test('Sort items from A to Z ', async ({ page }) => {
    const login = new LoginPage(page);
     await page.waitForTimeout(2000)
    const product = new ProductsPage(page);
     await page.waitForTimeout(2000)
    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
     await page.waitForTimeout(2000)
    await product.sortBy('az');
     await page.waitForTimeout(2000)
    const firstItem = await page.locator('.inventory_item_name').first().textContent();
     await page.waitForTimeout(2000)
    expect(firstItem).toBe('Sauce Labs Backpack');
  });

  test('should sort items by price high to low', async ({ page }) => {
    const login = new LoginPage(page);
     await page.waitForTimeout(2000)
    const product = new ProductsPage(page);
     await page.waitForTimeout(2000)
    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
     await page.waitForTimeout(2000)
    await product.sortBy('hilo');
     await page.waitForTimeout(2000)
    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(e => parseFloat(e.textContent!.replace('$', '')))
    );
     await page.waitForTimeout(2000)
    expect(prices[0]).toBeGreaterThanOrEqual(prices[1]);
  });
});
