import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', process.env.USER_NAME!);
  await page.fill('[data-test="password"]', process.env.PASSWORD_SWAG!);
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
