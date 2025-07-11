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
  async checkProduct(index: number) {
    const productIndex = this.page.locator(locators.productCard).nth(index);
    const viewProductButton = productIndex.locator(locators.clickViewReport)
    await viewProductButton.click()
  }
  async checkProductDetails(index:number) {
    await this.checkUrl(`product_details/${index}`);
    const productInformation = this.page.locator(locators.productInformation);
    await expect(productInformation.locator('h2')).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.availability)).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.brand)).toBeVisible();
  }

  async addToCart(number: number) {
    const count = await this.productCards.count();
    const addedProducts: { name: string; price: string }[] = [];
    for (let i = 0; i < number; i++) {
        const card = this.productCards.nth(i);
        const innerText = await card.innerText()
        const flatText = innerText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0); 
        const price = flatText[0];
        const name = flatText[1];

        if(price && name) {
          addedProducts.push({name, price})
        } else {
          console.warn(`Unexpected product card structure at index ${i}:`, flatText);
        }

        await card.hover();
        await card.locator('text=Add to cart').click();

        const modal = this.page.locator('.modal-content');
        await expect(modal).toBeVisible();

        await modal.locator('text=Continue Shopping').click();
        await expect(modal).toBeHidden();
    }
    await this.saveToJson(addedProducts, './downloads/productsDetails.json')
  }

}

export default ProductsPage;