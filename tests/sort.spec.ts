import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';

test.describe('Sorting Feature', () => {
  let product: ProductsPage;
test.beforeEach(async ({ page }) => {
    product = new ProductsPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForSelector('.inventory_list');
  });

  test('should sort items alphabetically from A to Z', async ({ page }) => {
    await product.sortBy('az');

    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    expect(itemNames[0]).toBe('Sauce Labs Backpack');
  });

  test('should sort items by price from high to low', async ({ page }) => {
    await product.sortBy('hilo');

    const priceStrings = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceStrings.map(text => parseFloat(text.replace('$', '')));

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });
});
