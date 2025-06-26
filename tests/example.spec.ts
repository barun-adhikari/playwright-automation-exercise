import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Example.com should have correct title', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.expectTitle();
});
