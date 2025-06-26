import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.automationexercise.com/');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle('Automation Exercise');
  }
}
