import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Test Login Feature', () => {
  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await page.waitForTimeout(2000)
    await login.login(process.env.USER_NAME!, process.env.PASSWORD_SWAG!);
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL(/inventory/);
  });
});

