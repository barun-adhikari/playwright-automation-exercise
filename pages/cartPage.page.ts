import { Page } from "@playwright/test";
import BasePage from "./basePage.page";


class CartPage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }
  async checkAddedCart() {
    // Add code here to check the details one by one
  }

}

export default CartPage