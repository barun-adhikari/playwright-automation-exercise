import { expect, Page } from "@playwright/test";
import BasePage from "./basePage.page";
import * as locators from '../pageObjects/cartPage.objects'


class CartPage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }
  
  async checkAddedCart(isRemoved?: boolean) {
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

      if (isRemoved) {
        await expect(nameLocator).toHaveCount(0);
        await expect(priceLocator).toHaveCount(0);
        await expect(quantityLocator).toHaveCount(0);
        await expect(totalPriceLocator).toHaveCount(0);
    } else {
      await expect(nameLocator).toHaveText(product.name);
      await expect(priceLocator).toHaveText(product.price);
      await expect(quantityLocator).toHaveText(product.quantity.toString());

      const numericPrice = parseInt(product.price.replace(/[^\d]/g, ''));
      const expectedTotal = `Rs. ${numericPrice * product.quantity}`;
      await expect(totalPriceLocator).toHaveText(expectedTotal);
      }
    }
  }

  async checkout(options?: { afterLogin?: boolean }) {
    await this.clickByText('Proceed To Checkout');
    const isAfterLogin = options?.afterLogin ?? false;
    if (!isAfterLogin) {
      await this.clickByRole('link', 'Register / Login', true);
    }
  }

  async removeProduct() {
    await this.page.locator('.cart_quantity_delete').click();
    this.checkAddedCart(true);
  }
}

export default CartPage