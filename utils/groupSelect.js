// utils/groupSelect.js
import { expect } from '@playwright/test';

/**
 * Selects the target group from the BrowseControl tree.
 * Uses unique text match within span with icon and status.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} groupName - Example: "CWCLAP029"
 */
export async function selectGroup(page, groupName) {
  const groupSpan = page.locator('span.text-computer-user', {
    hasText: groupName,
  });

  await expect(groupSpan).toBeVisible({ timeout: 10000 });
  await groupSpan.click();

  console.log(`[GROUP] Selected group: ${groupName}`);
}
