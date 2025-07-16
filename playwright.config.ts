import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  
  reporter: "html",
  use: {
    headless: true,
    viewport: {width: 1920, height: 1080},
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ]
});
