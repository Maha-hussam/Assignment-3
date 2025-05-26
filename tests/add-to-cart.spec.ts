import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';

test.describe('Add to Cart Feature', () => {
  test('You add item to cart', async ({ page }) => {
    await page.goto('/inventory.html');
    const product = new ProductsPage(page);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await product.addItemToCart('Sauce Labs Backpack');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await product.goToCart();
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });
});
