import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Tự động xác định thư mục xuất báo cáo HTML dựa trên lệnh đang chạy
 * (Giúp không bị ghi đè khi chạy riêng lẻ từng Feature x từng Trình duyệt)
 */
function getDynamicReportFolder(): string {
  if (process.env.PLAYWRIGHT_HTML_REPORT) {
    return process.env.PLAYWRIGHT_HTML_REPORT;
  }

  const args = process.argv.join(' ').toLowerCase();

  let browser = 'all';
  if (args.includes('--project=chromium') || args.includes('-p chromium')) browser = 'chromium';
  else if (args.includes('--project=firefox') || args.includes('-p firefox')) browser = 'firefox';
  else if (args.includes('--project=webkit') || args.includes('-p webkit')) browser = 'webkit';

  let feature = '';
  if (args.includes('fr02') || args.includes('login')) feature = 'fr02_';
  else if (args.includes('fr08') || args.includes('checkout')) feature = 'fr08_';
  else if (args.includes('fr13') || args.includes('dashboard')) feature = 'fr13_';

  if (feature && browser !== 'all') {
    return `reports/${feature}${browser}_report`;
  }
  if (browser !== 'all') {
    return `reports/${browser}_report`;
  }
  if (feature) {
    return `reports/${feature}report`;
  }

  return 'reports/html_report';
}

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

  /* Reporter config - tự động xuất đúng folder cho từng feature và trình duyệt */
  reporter: [
    ['html', { outputFolder: getDynamicReportFolder(), open: 'never' }],
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
      metadata: {
        'Run by': '23127125',
        'Student ID': '23127125',
        'Execution Date': new Date().toISOString(),
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      metadata: {
        'Run by': '23127125',
        'Student ID': '23127125',
        'Execution Date': new Date().toISOString(),
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      metadata: {
        'Run by': '23127125',
        'Student ID': '23127125',
        'Execution Date': new Date().toISOString(),
      },
    },
  ],
});

