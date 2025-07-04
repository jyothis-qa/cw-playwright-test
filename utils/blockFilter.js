// utils/blockFilter.js
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * Verifies that the block page appears when browsing a blocked domain.
 * Reuses the current browser context. Adds logs and Allure attachments.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {string} blockedDomain e.g. 'facebook.com'
 */
export async function verifyBlockInBrowser(page, blockedDomain) {
  await allure.step(`Verify block page for ${blockedDomain}`, async () => {
    console.log('[TAB] Opening new tab...');
    const newTab = await page.context().newPage();

    try {
      console.log(`[BROWSE] Navigating to https://${blockedDomain}...`);
      await newTab.goto(`https://${blockedDomain}`, {
        waitUntil: 'domcontentloaded',
        timeout: 8000,
      });
    } catch {
      console.warn(`[WARN] Page load may be blocked or delayed.`);
    }

    await newTab.waitForTimeout(5000); // Wait for block page to appear

    const bodyText = await newTab.locator('body').innerText();
    await allure.attachment('Blocked Page Text', bodyText, 'text/plain');

    console.log('[ASSERT] Checking for block message...');
    expect(bodyText).toContain('Your IT Administrator has prevented');
    console.log('[PASS] Block message found.');

    await newTab.close();
  });
}