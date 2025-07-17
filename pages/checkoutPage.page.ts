import { expect ,Page } from "@playwright/test";
import BasePage from "./basePage.page";


class CheckoutPage extends BasePage {
  constructor(page: Page) { 
    super(page)
  }
  async verifyAddressDetails(addressInfo: {
    fullName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  }) {
    const delivery = this.page.locator('#address_delivery');
    const billing = this.page.locator('#address_invoice');

    const expectedLines = [
      addressInfo.fullName,
      addressInfo.company,
      addressInfo.address1,
      addressInfo.address2,
      `${addressInfo.city} ${addressInfo.state} ${addressInfo.zipcode}`,
      addressInfo.country,
      addressInfo.phone
    ];

    for (const section of [delivery, billing]) {
      for (const line of expectedLines) {
        if (line) {
          await expect(section).toContainText(line);
        } else {
          throw new Error(`Expected address line is missing or undefined: ${line}`);
        }
      }
    }
  }

  async descriptionAndPlaceOrder() {
      await this.waitAndFill('textarea[name="message"]', "Please deliver between 9 AM - 5 PM.");
      await this.clickByText("Place Order");
  }

  async enterPaymentDetailsAndSubmit(payment: {
    name: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.page.locator('[data-qa="name-on-card"]').fill(payment.name);
    await this.page.locator('[data-qa="card-number"]').fill(payment.cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(payment.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(payment.expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(payment.expiryYear);
    await this.page.locator('[data-qa="pay-button"]').click();
  }
  async verifyOrderSuccessMessage() {
    await this.isTextVisible("Congratulations! Your order has been confirmed!");
    await this.clickByText('Continue');
  } 

}

export default CheckoutPage;