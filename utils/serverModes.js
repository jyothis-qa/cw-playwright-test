// utils/serverModes.js
import { expect } from '@playwright/test';

/**
 * Switches the console into the desired mode (PC | User).
 * Automatically skips if already in desired mode.
 *
 * @param {import('@playwright/test').Page} page
 * @param {'PC' | 'User'} mode
 */
export async function setServerMode(page, mode) {
  const allButtons = page.locator('.btn-mode-switch');
  await expect(allButtons.first()).toBeVisible({ timeout: 10000 });

  const activeMode = await page.locator('.btn-mode-switch-active').textContent();
  const trimmedActive = activeMode?.trim().toLowerCase();
  const desired = mode.toLowerCase();

  if (trimmedActive === desired) {
    console.log(`[MODE] Already in ${mode} mode`);
    return;
  }

  const targetButton = page.locator('.btn-mode-switch', { hasText: mode });
  await targetButton.click();

  // ✅ Handle confirmation dialog if it appears
  const confirmDialog = page.locator('text=Switching to User Mode');
  if (await confirmDialog.isVisible({ timeout: 2000 }).catch(() => false)) {
    console.log(`[MODE] Confirmation dialog detected - confirming mode switch`);
    await page.getByRole('button', { name: 'SWITCH' }).click();
  }

  // ✅ Now wait for actual switch to complete
  await expect(page.locator('.btn-mode-switch-active')).toHaveText(mode, { timeout: 10000 });
  console.log(`[MODE] Successfully switched to ${mode} mode`);
}
