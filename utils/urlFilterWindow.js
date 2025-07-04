// utils/urlFilterWindow.js
import { expect } from '@playwright/test';

/**
 * Opens the URL Filter window by clicking its button.
 * @param {import('@playwright/test').Page} page
 */
export async function openUrlFilter(page) {
  const urlFilterBtn = page.locator('img[src*="list-solid.svg"]');
  await expect(urlFilterBtn).toBeVisible({ timeout: 5000 });
  await urlFilterBtn.click();
  console.log('[UI] URL Filter window opened');
}

/**
 * Closes the URL Filter window by clicking the close (×) button.
 * @param {import('@playwright/test').Page} page
 */
export async function closeUrlFilterWindow(page) {
  const fallbackBtn = page.locator('span:has-text("×")');
  try {
    await fallbackBtn.waitFor({ state: 'visible', timeout: 3000 });
    await fallbackBtn.click();
    await page.waitForTimeout(1000);
    console.log('[UI] URL Filter window closed');
  } catch {
    console.error('[UI] Window closure failed - Manual check required.');
  }
}
