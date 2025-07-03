import { Page, expect } from '@playwright/test';
import BasePage from "./basePage.page";
import * as locators from '../pageObjects/contactusPage.objects'

class ContactUsPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    
    async verifyMessage() {
        await this.isTextVisible(locators.contactFormHeaderMessage);
    }

    async fillupContactForm() {
        await this.waitAndFill(locators.nameInputField, "dummy text");
        await this.waitAndFill(locators.emailInputField, "dummy@email.com");
        await this.waitAndFill(locators.subjectInputField, "Testing Automation");
        await this.waitAndFill(locators.messageInputField, "this is an automation test");
        await this.page.locator(locators.fileUploadeField).setInputFiles({
            name: 'test.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from("Automation test file.")
        });
        // This is done in the form as the form is submitted.
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async confirm() {
        // Here the Javascript dialog is handled
        await this.page.once('dialog', async dialog=>{
            await dialog.accept();
        });
        // The dialog appers after the click of the button but the click is not registered so i am clicking it again but investigationg further
        await this.page.getByRole('button', { name: 'Submit' }).click();

        await this.page.locator(locators.pageName).getByText(locators.successfulContactFormFilledMessage);
        // Here the Home has the role of a link and using the locator so that it doesnot take the Home page link in the header too.
        await this.page.locator(locators.pageName).getByRole('link', { name: locators.homepageButtonText }).click();
    }

}
export default ContactUsPage;