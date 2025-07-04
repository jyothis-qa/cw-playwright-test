// utils/urlCleanup.js
import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * Removes a given URL from the Blocked List.
 * Assumes the current tab is already in the URL Filter modal and on the BLOCKED LIST tab.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {string} url e.g. 'facebook.com'
 */
export async function removeBlockedUrl(page, url) {
  await allure.step(`Remove "${url}" from Blocked List`, async () => {
    const checkbox = page.getByRole('checkbox', { name: url });
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.check();

    const removeButton = page.getByRole('button', { name: /REMOVE FROM BLOCKED LIST/i });
    await expect(removeButton).toBeEnabled({ timeout: 5000 });
    await removeButton.click();

    console.log(`[CLEANUP] Removed "${url}" from Blocked List.`);
  });
}
