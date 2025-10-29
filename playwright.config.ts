import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  testDir: './tests',
  expect: {
    timeout: 2000
  },

  retries: 1, 
  reporter: 'html',
  // reporter: 'list',
  // reporter: [
  //   ['json', { outputFile: 'test-results/test-results.json' }],
  //   ['junit', { outputFile: 'test-results/junit.xml' }],
  //   ["allure-playwright"]
  // ],
  
  use: {
    globalsQaURL: 'https://globalsqa.com/demo-site/draganddrop',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING == '1' ? 'http://localhost:4202/'
      : 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/' 
      }
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: ['usePageObjects.spec.ts'],
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'mobile',
      testMatch: ['testMobile.spec.ts'],
      use: { ...devices['iPhone 12'] },
    }
  ],
// Start the web server before running the tests
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200'
  }
});
