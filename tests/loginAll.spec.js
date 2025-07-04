import { test, expect } from '@playwright/test';
import { login } from '../utils/loginBase';
import { allure } from 'allure-playwright';

const BASE_URL = process.env.BASE_URL || 'https://cwclap029:8998';

test.describe('Login Module', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    if (!testInfo.title.includes('valid credentials')) {
      await page.goto(`${BASE_URL}/login`);
    }
  });

  test('Login with valid credentials', async ({ page }) => {
    await allure.step('Login using valid credentials', async () => {
      await login(page); // Allure steps already included in loginBase.js
    });
  });

  test('Login with wrong password', async ({ page }) => {
    await allure.step('Fill valid username and wrong password', async () => {
      await page.getByPlaceholder('Enter Operator Username').fill('aaa');
      await page.getByPlaceholder('Enter Password').fill('wrongpass');
      await page.getByRole('button', { name: 'SIGN IN' }).click();
    });

    await allure.step('Verify error message appears', async () => {
      await expect(page.getByText('Invalid username or password')).toBeVisible({ timeout: 5000 });
    });
  });

  test('Login with empty fields', async ({ page }) => {
    await allure.step('Submit login form with empty fields', async () => {
      await page.getByRole('button', { name: 'SIGN IN' }).click();
    });

    await allure.step('Verify login fails and URL remains the same', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/login`);
    });
  });
});