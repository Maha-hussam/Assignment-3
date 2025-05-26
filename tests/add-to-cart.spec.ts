import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Add to Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page)
    await page.waitForTimeout(1000)
    await login.goto();
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
    await page.waitForTimeout(1000)
  });

  test('You add item to cart', async ({ page }) => {
    const product = new ProductsPage(page);
    await page.waitForTimeout(1000)
    await product.addItemToCart('Sauce Labs Backpack');
    await page.waitForTimeout(2000)
    await product.goToCart();
    await page.waitForTimeout(2000)
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
    await page.waitForTimeout(2000)
  });
});
