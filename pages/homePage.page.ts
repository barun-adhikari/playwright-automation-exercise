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
    await this.isPageVisible()

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
    await this.checkUrl('products')

  }

  async goToCart() {
    await this.clickByRole('link', locators.cartPageLink, false);
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

  async goToTestCase() {
    await this.clickByRole('link',locators.testCaseLink, true);
    await this.isPageVisible()
    await this.checkUrl('test_case')
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

  async isUserNameVisible(name: string) {
    await this.isTextVisible(`Logged in as ${name}`)
  }

  async subscribe() {
      await this.isTextVisible(locators.subText);
      await this.waitAndFill(locators.subEmailInputField, 'hahah@yopmail.com');
      await Promise.all([
          this.click(locators.subButtonID),
      ]);
      await this.isTextVisible(locators.successfulSubMessage);
  }
  
  async categoryList(category: string, subCategory: string) {
    await this.isTextVisible('Category');

    // Locate only the top-level category titles (Women, Men, Kids)
    const categoryHeaders = this.page.locator('#accordian .panel-title a');

    const actualCategories = await categoryHeaders.allTextContents();
    const trimmedCategories = actualCategories.map(text => text.trim());
    const expectedCategories = ['Women', 'Men', 'Kids'];

    expect(trimmedCategories).toEqual(expectedCategories);
    await this.page.locator(`a[href="#${category}"]`).click();
    const panel = this.page.locator(`#${category}`);
    await expect(panel).toBeVisible({ timeout: 5000 });
    await panel.locator('a', { hasText: `${subCategory}` }).click();
  }

  async addRecommendedItemToCartAndVerify() {
    const featureItemContainer = this.page.locator('.recommended_items');
    await featureItemContainer.scrollIntoViewIfNeeded();
    await expect(featureItemContainer).toContainText(/recommended items/i);

    const firstCard = featureItemContainer.locator('.single-products').first();
    await firstCard.hover();
    const addToCartButton = firstCard.locator('text=Add to cart');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    const modal = this.page.locator('.modal-content');
    await expect(modal).toBeVisible();
    const viewCartBtn = modal.locator('text=View Cart');
    await viewCartBtn.click();

    const cartItem = this.page.locator('.cart_info .cart_description');
    await expect(cartItem).toBeVisible();
    const productName = await cartItem.locator('h4 a').innerText();
    console.log(`Verified product in cart: ${productName}`);
  }

}
 
export default HomePage;