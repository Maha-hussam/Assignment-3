import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Sorting Feature', () => {
  test('You sort items from A to Z', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductsPage(page);

    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
    await product.sortBy('az');

    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    expect(itemNames[0]).toBe('Sauce Labs Backpack');
  });

  test('You sort items by price high to low', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductsPage(page);

    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
    await product.sortBy('hilo');

    const priceStrings = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceStrings.map(text => parseFloat(text.replace('$', '')));

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });
});
