import { Page, expect } from '@playwright/test';
import * as locators from '../pageObjects/homePage.objects'
import BasePage from './basePage.page';

class HomePage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }

  async goto() {
    await this.page.goto('https://www.automationexercise.com/');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle('Automation Exercise');
  }

  async gotoHome() {
    await this.clickByText(locators.homePageLink);
    await this.isPageVisible();
  }

  async goToProducts() {
    await this.clickByText(locators.productsPageLink);
    await this.isPageVisible();

  }

  async goToCart() {
    await this.clickByText(locators.cartPageLink);
    await this.isPageVisible();

  }

  async goToSignORLogin() {
    await this.clickByText(locators.signupORloginPageLink)
    await this.isPageVisible();
  }
}

export default HomePage;