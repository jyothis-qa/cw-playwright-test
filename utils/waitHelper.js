// utils/waitHelper.js
/**
 * Helper for consistent wait with log.
 * @param {import('@playwright/test').Page} page
 * @param {number} ms
 */
export async function pageWait(page, ms) {
  console.log(`[WAIT] Waiting ${ms / 1000} seconds...`);
  await page.waitForTimeout(ms);
}
