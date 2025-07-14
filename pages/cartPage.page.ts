import { expect, Page } from "@playwright/test";
import BasePage from "./basePage.page";
import * as locators from '../pageObjects/cartPage.objects'


class CartPage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }
  async checkAddedCart() {
    const products = await this.getJsonData<{ name: string; price: string; quantity: number }[]>('./downloads/productsDetails.json');
    await this.page.waitForSelector(locators.cardDetailsRow);

    const productRows = this.page.locator(locators.cardDetailsRow);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const row = productRows.nth(i);

      const nameLocator = row.locator(`${locators.cartDescription} h4 a`);
      const priceLocator = row.locator(`${locators.cartPrice} p`);
      const quantityLocator = row.locator(`${locators.cartQuantity} button`);
      const totalPriceLocator = row.locator(`${locators.cartTotal} .cart_total_price`);

      // Verify name
      await expect(nameLocator).toHaveText(product.name);

      // Verify price
      await expect(priceLocator).toHaveText(product.price);

      // Verify quantity
      await expect(quantityLocator).toHaveText(product.quantity.toString());

      // Calculate expected total
      const numericPrice = parseInt(product.price.replace(/[^\d]/g, '')); // remove 'Rs.' and convert to number
      const expectedTotal = `Rs. ${numericPrice * product.quantity}`;

      // Verify total price
      await expect(totalPriceLocator).toHaveText(expectedTotal);
    }
  }

}

export default CartPage