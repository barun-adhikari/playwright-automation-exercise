import { Page, expect } from '@playwright/test';
import * as locators from '../pageObjects/homePage.objects'
import {name} from '../pageObjects/signupORLoginPage.objects'
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
    await this.clickByText(locators.signupORloginPageLink);
    await this.isPageVisible();
  }
  
  async goToContactus() {
    await this.clickByText(locators.contactUsLink);
    await this.isPageVisible();
  }

  async logoutAccount() {
    await this.clickByText(locators.logoutAccount)
  }

  async verifylogout(){
    await this.pause();
    await expect(this.page).toHaveURL('https://www.automationexercise.com/login')
    await expect(this.page.locator(`text=${locators.logoutAccount}`)).not.toBeVisible();  // As we are not logged in we cannot logout account.
    await expect(this.page.locator(`text=${locators.deleteAccount}`)).not.toBeVisible();  // As we are not logged in we cannot delete account.
  }

  async goToDeleteAccount() {
    await this.clickByText(locators.deleteAccount);
    await this.isPageVisible();
  }

  async isUserNameVisible() {
    await this.isTextVisible(`Logged in as ${name}`)
  }

}

export default HomePage;