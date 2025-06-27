import { Page } from 'playwright-core'
import BasePage from './basePage.page'
import * as locators from '../pageObjects/signupORLoginPage.objects'
import { expect } from 'playwright/test'

class SignupORLoginPage extends BasePage {
    constructor(page : Page) {
        super(page)
    }
    async signUp() {
        await this.isTextVisible(locators.signupFormHeaderText)
        await this.waitAndFill(locators.signupNameInputField, locators.name)
        await this.waitAndFill(locators.signupEmailInputField, locators.email)
        await this.waitAndClickButton(locators.signupButtonText)
    }
    async fillSignUp() {
        await this.isTextVisible(locators.detailsFormHeader);
        const randomTitle = locators.title[Math.floor(Math.random() * locators.title.length)];
        await this.clickByText(randomTitle);
        
    }
}

export default SignupORLoginPage