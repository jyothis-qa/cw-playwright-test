// tests/urlFilterUnified.spec.js
import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';

import { login } from '../utils/loginBase.js';
import { isClientOnline } from '../utils/clientStatus.js';
import { setServerMode } from '../utils/serverModes.js';
import { selectGroup } from '../utils/groupSelect.js';
import { blockUrlAndApplyPolicy } from '../utils/urlBlock.js';
import { verifyBlockInBrowser } from '../utils/blockFilter.js';
import { removeBlockedUrl } from '../utils/urlCleanup.js';
import { openUrlFilter, closeUrlFilterWindow } from '../utils/urlFilterWindow.js';

const test = base;

test.describe('Unified Test - BrowseControl URL Filter', () => {
  const clientName = 'CWCLAP029';
  const userName = 'jyothis';
  const urlPC = 'facebook.com';
  const urlUser = 'flipkart.com';

  test.beforeEach(async ({ page }) => {
    await login(page);
    const online = await isClientOnline(page, clientName);
    test.skip(!online, `Client "${clientName}" is offline. Skipping test.`);
  });

  test('Block facebook.com (PC mode) then flipkart.com (User mode)', async ({ page }) => {
    test.setTimeout(150000);

    // --- PC Mode ---
    await setServerMode(page, 'PC');
    await selectGroup(page, clientName);
    await openUrlFilter(page);
    await blockUrlAndApplyPolicy(page, urlPC);
    await verifyBlockInBrowser(page, urlPC);
    await removeBlockedUrl(page, urlPC);
    await closeUrlFilterWindow(page);

    // --- User Mode ---
    await setServerMode(page, 'User');
    await selectGroup(page, userName);
    await openUrlFilter(page);
    await blockUrlAndApplyPolicy(page, urlUser);
    await verifyBlockInBrowser(page, urlUser);
    await removeBlockedUrl(page, urlUser);
    await closeUrlFilterWindow(page);
  });
});
