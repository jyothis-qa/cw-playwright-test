import { test as base, expect, chromium } from '@playwright/test';
import { login } from '../utils/loginBase';
import { allure } from 'allure-playwright';

const test = base.extend({});

test.describe('BrowseControl Policy Enforcement', () => {
  test('Apply policy and verify Facebook is blocked', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Runs only in Chromium');

    await allure.step('Login to CurrentWare Console', async () => {
      await login(page);
    });

    await allure.step('Turn Internet OFF from BrowseControl', async () => {
      await page.getByRole('link', { name: 'BrowseControl' }).click();
      await page.locator('.mat-mdc-menu-trigger.mat-mdc-tooltip-trigger').click();
      await page.getByText('OFF').click();
      await expect(page.getByText('Internet is turned OFF')).toBeVisible();
      await page.waitForTimeout(10000);
    });

    await allure.step('Verify Facebook is blocked in new browser', async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      const fbPage = await context.newPage();

      try {
        await fbPage.goto('https://www.facebook.com', { waitUntil: 'load' });
        const html = await fbPage.content();

        if (!html.includes('Your IT Administrator')) {
          await allure.attachment('Facebook Page HTML', html, 'text/html');
        }

        expect(html).toContain('Your IT Administrator');
      } finally {
        await browser.close();
      }
    });
  });
});