import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * Adds a URL to the Blocked List and applies policy in URL Filter.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} rawUrl
 */
export async function blockUrlAndApplyPolicy(page, rawUrl) {
  await allure.step(`Add "${rawUrl}" to Blocked List and apply policy`, async () => {
    console.log(`[NAVIGATE] Opening BrowseControl > URL Filter...`);
    await page.goto('https://cwclap029:8998/currentware/browsecontrol');

    const urlFilterBtn = page.locator('img[src*="list-solid.svg"]');
    await expect(urlFilterBtn).toBeVisible({ timeout: 5000 });
    await urlFilterBtn.click();

    console.log(`[INPUT] Adding URL: ${rawUrl}`);
    const urlInput = page.getByPlaceholder('Enter a URL');
    await expect(urlInput).toBeVisible({ timeout: 5000 });
    await urlInput.fill(rawUrl);
    await page.getByRole('button', { name: 'ADD', exact: true }).click();

    // Wait for URL to appear
    const urlListTable = page.locator('.cw-font').first();
    await expect(urlListTable).toContainText(rawUrl, { timeout: 10000 });

    // Select the added URL
    const urlRow = urlListTable.locator('tr', { hasText: rawUrl });
    const urlCheckbox = urlRow.locator('input[type="checkbox"]');
    await expect(urlCheckbox).toBeVisible({ timeout: 5000 });
    await urlCheckbox.check();

    console.log(`[TAB] Switching to BLOCKED LIST tab...`);
    const blockedTab = page.getByText('BLOCKED LIST', { exact: true });
    await expect(blockedTab).toBeVisible({ timeout: 5000 });
    await blockedTab.click();

    console.log(`[ACTION] Adding "${rawUrl}" to Blocked List...`);
    const addToBlockedBtn = page.getByRole('button', { name: /ADD TO BLOCKED LIST/i });
    await expect(addToBlockedBtn).toBeEnabled({ timeout: 5000 });
    await addToBlockedBtn.click();

    console.log(`[POLICY] Applying policy to clients...`);
    const applyBtn = page.getByRole('button', { name: /Apply to Clients/i });
    await expect(applyBtn).toBeEnabled({ timeout: 5000 });
    await applyBtn.click();

    console.log('[WAIT] Waiting 45 seconds for policy propagation...');
    await page.waitForTimeout(45000);
  });
}
