import { defineConfig, devices } from '@playwright/test';

// This file defines your Playwright test project configuration
export default defineConfig({

  // Folder where all tests are stored
  testDir: './tests',

  // Max time a test can run before failing
  timeout: 60000, // 60 seconds per test

  // Run tests in parallel (fullyParallel = true for all files)
  fullyParallel: true,

  // Fail the test suite if someone accidentally uses test.only
  forbidOnly: !!process.env.CI,

  // Number of retries for failing tests (in CI only)
  retries: process.env.CI ? 2 : 0,

  // Limit workers in CI to 1 (can increase locally)
  workers: process.env.CI ? 1 : undefined,

  // Reporters to use — includes:
  // - 'html' for local view
  // - 'allure-playwright' for Allure reports
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  // Shared settings used across all browser projects
  use: {
    headless: false,                 // Run browsers in UI mode (set to true in CI)
    ignoreHTTPSErrors: true,        // Accept self-signed HTTPS certs
    trace: 'retain-on-failure',     // Save trace only when test fails
    screenshot: 'only-on-failure',  // Capture screenshot only on failure
    video: 'retain-on-failure',     // Retain video only on failure to reduce size
    actionTimeout: 0,               // No timeout for single actions (e.g. click)
    navigationTimeout: 30000        // 30s timeout for page navigations
  },

  // Define different browser environments for testing
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome', // Launches real Chrome, not bundled Chromium
        headless: false,
        browserName: 'chromium',
      },
    },
  ],

});