import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./basePage.page";
import * as locators from '../pageObjects/productsPage.objects';

class ProductsPage extends BasePage {
  productCards!: Locator;
  constructor(page: Page) { 
    super(page)
    this.productCards = this.page.locator('div.productinfo.text-center');

  }
  async searchProduct(productName: string) {
    await this.waitAndFill(locators.searchInputField, productName);
    await this.click(locators.searchButton)
    await this.isTextVisible(locators.searchProductsHeader)
  }

  async verifyProductList(searchText?:string) {
    const count = await this.productCards.count();
    console.log(`Found ${count} products.`);
    
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      await expect(card.locator('img')).toBeVisible();
      await expect(card.locator('h2')).toHaveText(/Rs\.\s?\d+/);
        await expect(card.locator('p')).toBeVisible();
        if(searchText) {
          const paragraphText = await card.locator('p').textContent();
          expect(paragraphText?.toLowerCase()).toContain(searchText.toLowerCase());
        }
        console.log(`Product #${i + 1} verified successfully.`);
    }
  }
  async checkFirstProduct() {
    const firstProduct = this.page.locator(locators.productCard).first();
    const viewProductButton = firstProduct.locator(locators.clickViewReport)
    await viewProductButton.click()
  }
  async checkFirstProductDetails() {
    await this.checkUrl('product_details/1');
    const productInformation = this.page.locator(locators.productInformation);
    await expect(productInformation.locator('h2')).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.availability)).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.brand)).toBeVisible();
  }

  async addToCart(number: number) {
    const count = await this.productCards.count();
    for (let i = 0; i < number; i++) {
        const card = this.productCards.nth(i);

        await card.hover();
        await card.locator('text=Add to cart').click();

        const modal = this.page.locator('.modal-content');
        await expect(modal).toBeVisible();

        await modal.locator('text=Continue Shopping').click();
        await expect(modal).toBeHidden();
    }
  }

}

export default ProductsPage;