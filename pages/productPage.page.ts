import { Page, expect } from "@playwright/test";
import BasePage from "./basePage.page";
import * as locators from '../pageObjects/productsPage.objects';

class ProductsPage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }
  async verifyProductList() {
    const productCards = this.page.locator('div.productinfo.text-center');
    const count = await productCards.count();

    console.log(`Found ${count} products.`);

    for (let i = 0; i < count; i++) {
        const card = productCards.nth(i);
        await expect(card.locator('img')).toBeVisible();
        await expect(card.locator('h2')).toHaveText(/Rs\.\s?\d+/);
        await expect(card.locator('p')).toBeVisible();
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
}
export default ProductsPage;