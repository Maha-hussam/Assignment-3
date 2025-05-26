import { test, chromium, firefox, BrowserType } from '@playwright/test';

test.describe('Test on at least two different browsers', () => {
  const browsers: { name: string, type: BrowserType }[] = [
    { name: 'Chromium', type: chromium },
    { name: 'Firefox', type: firefox }
  ];

  for (const { name, type } of browsers) {
    test(`Test Launch new Browser - ${name}`, async () => {
      const browser = await type.launch({ headless: false });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForTimeout(1000);
      await browser.close();
    });
  }
});
