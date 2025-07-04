// scripts/forceShowAllure.js
const { execSync } = require('child_process');

try {
  console.log('[ALLURE] Generating Allure report...');
  execSync('allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });

  console.log('[ALLURE] Opening Allure report...');
  execSync('allure open allure-report', { stdio: 'inherit' });
} catch (err) {
  console.error('[ERROR] Failed to generate or open Allure report:', err.message);
  process.exit(1);
}
