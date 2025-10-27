import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
    testDir: './tests', // ensure Playwright scans the correct folder


  use: {
    globalsQaURL: 'https://globalsqa.com/demo-site/draganddrop',
    baseURL: 'http://localhost:4200/',
  },

  projects: [
    {
      name: 'chromium',
    },
  ],
});
