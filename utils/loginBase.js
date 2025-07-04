import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://cwclap029:8998';
const USERNAME = process.env.CW_USERNAME || 'aaa';
const PASSWORD = process.env.CW_PASSWORD || 'a';

/**
 * Logs into the CurrentWare Web Console with basic Allure step reporting.
 * @param {import('@playwright/test').Page} page
 */
export async function login(page) {
  await allure.step('Go to login page', async () => {
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  });

  await allure.step('Enter login credentials', async () => {
    await page.getByPlaceholder('Enter Operator Username').fill(USERNAME);
    await page.getByPlaceholder('Enter Password').fill(PASSWORD);
  });

  await allure.step('Click SIGN IN and wait for dashboard', async () => {
    await Promise.all([
      page.waitForURL('**/currentware/**'),
      page.getByRole('button', { name: 'SIGN IN' }).click(),
    ]);
  });

  await allure.step('Verify successful login (AccessPatrol visible)', async () => {
    await expect(page.getByRole('link', { name: 'AccessPatrol' })).toBeVisible({ timeout: 5000 });
  });
}