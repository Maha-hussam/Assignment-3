import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout Feature', () => {
  test('should complete checkout process', async ({ page }) => {
    await page.goto('/inventory.html');
    const product = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await product.addItemToCart('Sauce Labs Onesie');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await product.goToCart();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await cart.proceedToCheckout();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await checkout.fillCheckoutInfo('Maha', 'dalaa', 'P400');
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
    await checkout.finishOrder();
    await expect(checkout.getSuccessMessage()).toContainText('Thank you for your order!');
  });
});
