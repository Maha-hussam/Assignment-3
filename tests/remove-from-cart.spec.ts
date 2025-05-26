import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';

test.describe('Remove from Cart Feature', () => {
  test('You remove item from cart', async ({ page }) => {
    await page.goto('/inventory.html');
    const product = new ProductsPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
    await product.addItemToCart('Sauce Labs Bike Light');
    await product.removeItemFromCart('Sauce Labs Bike Light');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await product.goToCart();

    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
