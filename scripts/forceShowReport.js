// scripts/forceShowReport.js
const { execSync } = require('child_process');

try {
  // Kill anything running on port 9323
  console.log('[INFO] Closing existing report server on port 9323...');
  execSync('npx kill-port 9323', { stdio: 'inherit' });
} catch (err) {
  console.warn('[WARN] Failed to kill port (might not be in use). Skipping...');
}

try {
  // Open fresh Playwright report
  console.log('[INFO] Opening Playwright HTML report...');
  execSync('npx playwright show-report', { stdio: 'inherit' });
} catch (err) {
  console.error('[ERROR] Failed to open Playwright report:', err.message);
  process.exit(1);
}
