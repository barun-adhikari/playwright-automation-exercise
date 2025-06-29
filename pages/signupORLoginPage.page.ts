import { Page } from 'playwright-core'
import BasePage from './basePage.page'
import * as locators from '../pageObjects/signupORLoginPage.objects'

class SignupORLoginPage extends BasePage {
    constructor(page : Page) {
        super(page)
    }
    async logIn(email:string, password: string, name:string) {
        await this.isTextVisible(locators.loginFormHeaderText);
        await this.waitAndFill(locators.loginEmailInputField, email);
        await this.waitAndFill(locators.loginPasswordInputField, password);
        await this.waitAndClickButton(locators.loginButtonText);
        await this.isTextVisible(`Logged in as ${name}`)
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
        await this.waitAndFill(locators.passwordInputField, locators.password);
        await this.selectRandomFromDropdown(locators.dayDropdown);
        await this.selectRandomFromDropdown(locators.monthDropdown);
        await this.selectRandomFromDropdown(locators.yearDropdown);
        await this.click(locators.newsletterCheckbox);
        await this.click(locators.specialOfferCheckbox);
        await this.waitAndFill(locators.firstNameInputField, "test");
        await this.waitAndFill(locators.lastNameInputField, "user");
        await this.waitAndFill(locators.companyInputField, "none")
        await this.waitAndFill(locators.address1InputField, "nepal");
        await this.waitAndFill(locators.address2InputField, "KTM");
        await this.selectRandomFromDropdown(locators.conuntryDropdown);
        await this.waitAndFill(locators.stateInputField, "bagmati");
        await this.waitAndFill(locators.cityInputField, "kathmandu");
        await this.waitAndFill(locators.zipcodeInputField, '1101');
        await this.waitAndFill(locators.mobileNumberInputField, '0000000000');
        await this.waitAndClickButton(locators.createAccountButton)
    }
    async accountCreatedMessage() {
        await this.isTextVisible(locators.successfulAccountCreatedMessage);
        await this.click(locators.continueButton);
    }
    async accountDeleteMessage() {
        await this.isTextVisible(locators.successfulAccountDeletedMessage);
        await this.pause()
        await this.click(locators.continueButton)
    }
}

export default SignupORLoginPage