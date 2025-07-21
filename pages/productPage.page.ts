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
  async checkProductDetails(index:number, quantity?: number) {
    await this.checkUrl(`product_details/${index}`);
    const productInformation = this.page.locator(locators.productInformation);
    await expect(productInformation.locator('h2')).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.availability)).toBeVisible();
    await expect(productInformation.locator(locators.category)).toBeVisible();
    await expect(productInformation.locator(locators.brand)).toBeVisible();
    if(quantity) {
      const name = await productInformation.locator('h2').textContent();
      const price = await productInformation.locator('span span').first().textContent();
      const product = {
        name: name?.trim(),
        price: price?.trim(),
        quantity: quantity
      };
      await this.saveToJson(product, './downloads/productsDetails.json')
      await this.waitAndFill('#quantity', `${quantity}`)
      await this.clickByText('Add to cart');
      await this.clickByText('View Cart')
    }
  }

  async addToCart(number: number) {
    const addedProducts: { name: string; price: string, quantity: number }[] = [];
    for (let i = 0; i < number; i++) {
        const card = this.productCards.nth(i);
        const innerText = await card.innerText()
        const flatText = innerText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0); 
        const price = flatText[0];
        const name = flatText[1];
        const quantity = 1;           // here the quantity is static : 1 as only add quantity once

        if(price && name) {
          addedProducts.push({name, price, quantity})
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
  
  async checkNavFromCategory(category: string, subCategory: string) {
    await this.checkUrl('category_products')
    await this.isTextVisible(`${category} - ${subCategory} Products`);
  }
}

export default ProductsPage;