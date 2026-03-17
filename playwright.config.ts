import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Playwright Configuration
 *
 * This config reads environment variables from .env (via dotenv) and sets up
 * multi-browser testing with sensible defaults for both local and CI runs.
 *
 * Usage:
 *   npm test            - Run all tests across all browsers
 *   npm run test:ui     - Run only @ui-tagged tests
 *   npm run test:api    - Run only @api-tagged tests
 *   npm run test:debug  - Run tests in debug mode (headed + Playwright Inspector)
 *   npm run report      - Open the HTML report
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /* Directory where test files are located */
  testDir: './tests',

  /* Directory for test artifacts (screenshots, videos, traces) */
  outputDir: './test-results',

  /* Maximum time a single test can run (30 seconds) */
  timeout: 30_000,

  /* Maximum time expect() assertions can wait (5 seconds) */
  expect: {
    timeout: 5_000,
  },

  /* Run tests in parallel within each file */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left in source code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests: 2 retries on CI, 0 locally */
  retries: process.env.CI ? 2 : 0,

  /* Limit parallel workers on CI to avoid resource contention */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter configuration: HTML report (never auto-open) + list output */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  /* Shared settings applied to all projects below */
  use: {
    /* Base URL for navigation actions like page.goto('/') */
    baseURL: process.env.BASE_URL || 'http://example.com',

    /* Capture trace on first retry to help debug flaky tests */
    trace: 'on-first-retry',

    /* Take screenshots only when a test fails */
    screenshot: 'only-on-failure',

    /* Record video but keep only for failed tests */
    video: 'retain-on-failure',

    /* Extra HTTP headers (useful for API testing or auth tokens) */
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  /* Multi-browser project configuration */
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
