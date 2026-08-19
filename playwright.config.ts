import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Chạy tuần tự các test case để tránh race-condition với trạng thái khóa tài khoản */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Chạy 1 worker tại 1 thời điểm */
  workers: 1,

  /* Reporter config - dynamic output folder with fallback to reports/html_report */
  reporter: [
    ['html', { outputFolder: process.env.PLAYWRIGHT_HTML_REPORT || 'reports/html_report', open: 'never' }],
    ['list'],
  ],

  /* Anti-AI-Cheat metadata required by HW04 */
  metadata: {
    'Run by': '23127125',
    'Student ID': '23127125',
    'Execution Date': new Date().toISOString(),
  },

  /* Shared settings for all projects */
  use: {
    /* Base URL of EShop frontend */
    baseURL: 'http://localhost:5173',

    /* Auto capture screenshot on failure for Bug Reporting */
    screenshot: 'only-on-failure',

    /* Retain video on failure */
    video: 'retain-on-failure',

    /* Collect trace when retrying failed test */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers (Chromium, Firefox, WebKit) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

