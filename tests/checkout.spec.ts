import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout Feature', () => {
  test('should complete checkout process', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await page.waitForTimeout(1000)
    await login.goto();
    await page.waitForTimeout(1000)
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
    await page.waitForTimeout(1000)
    await product.addItemToCart('Sauce Labs Onesie');
    await page.waitForTimeout(1000)
    await product.goToCart();
    await page.waitForTimeout(1000)
    await cart.proceedToCheckout();
    await page.waitForTimeout(2000)
    await checkout.fillCheckoutInfo('Maha', 'dalaa', 'P400');
    await page.waitForTimeout(2000)
    await checkout.finishOrder();
    await page.waitForTimeout(2000)
    await expect(await checkout.getSuccessMessage()).toContain('Thank you for your order!');
    await page.waitForTimeout(2000)
  });
});
