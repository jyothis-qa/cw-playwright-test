// utils/clientStatus.js
import { expect } from '@playwright/test';

/**
 * Returns true if the client is shown as "Connected" in the group tree,
 * by checking for `.active-status` inside the span with the client name.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} clientName - e.g., "CWCLAP029"
 * @returns {Promise<boolean>}
 */
export async function isClientOnline(page, clientName) {
  try {
    await page.goto('https://cwclap029:8998/currentware/browsecontrol');
    await page.waitForLoadState('load');

    // Find the span containing the client name
    const clientSpan = page.locator('span.text-computer-user', {
      hasText: clientName,
    });

    await expect(clientSpan).toBeVisible({ timeout: 10000 });
    console.log('[DEBUG] Client span found for:', clientName);

    // Check for active-status div within that span
    const statusIndicator = clientSpan.locator('div.active-status');

    const isOnline = await statusIndicator.isVisible();
    console.log(`✅ Client "${clientName}" is ${isOnline ? 'reachable' : 'offline'}.`);

    return isOnline;
  } catch (err) {
    console.error('[ERROR] Client online check failed:', err.message);
    return false;
  }
}
