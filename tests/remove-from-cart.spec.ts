import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Remove from Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
     await page.waitForTimeout(2000)
    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
  });

  test('should remove item from cart', async ({ page }) => {
    const product = new ProductsPage(page);
    await page.waitForTimeout(2000)
    await product.addItemToCart('Sauce Labs Bike Light');
     await page.waitForTimeout(2000)
    await product.removeItemFromCart('Sauce Labs Bike Light');
     await page.waitForTimeout(2000)
    await product.goToCart();
     await page.waitForTimeout(2000)
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
