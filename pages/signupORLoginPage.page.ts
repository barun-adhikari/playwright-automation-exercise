import { Page } from 'playwright-core'
import BasePage from './basePage.page'
import * as locators from '../pageObjects/signupORLoginPage.objects'

class SignupORLoginPage extends BasePage {
    constructor(page : Page) {
        super(page)
    }
    async logIn(email:string, password: string, scenerio:string) {
        await this.isTextVisible(locators.loginFormHeaderText);
        await this.waitAndFill(locators.loginEmailInputField, email);
        await this.waitAndFill(locators.loginPasswordInputField, password);
        await this.waitAndClickButton(locators.loginButtonText);
        if(scenerio === "invalid") {
            await this.isTextVisible('Your email or password is incorrect!');
        } else{
            await this.isTextVisible(`Logged in as ${scenerio}`);
        }
    }
    async signUp(email: string, name: string, scenerio: string) {
        await this.isTextVisible(locators.signupFormHeaderText)
        await this.waitAndFill(locators.signupNameInputField, name)
        await this.waitAndFill(locators.signupEmailInputField, email)
        await this.waitAndClickButton(locators.signupButtonText)
        if(scenerio === "invalid"){
            await this.isTextVisible('Email Address already exist!')
        }
    }
    async fillSignUp() {
        await this.isTextVisible(locators.detailsFormHeader);

        const title = locators.title[Math.floor(Math.random() * locators.title.length)];
        await this.clickByText(title);

        const password = locators.password;
        await this.waitAndFill(locators.passwordInputField, password);

        const day = await this.selectRandomFromDropdown(locators.dayDropdown);
        const month = await this.selectRandomFromDropdown(locators.monthDropdown);
        const year = await this.selectRandomFromDropdown(locators.yearDropdown);

        await this.click(locators.newsletterCheckbox);
        await this.click(locators.specialOfferCheckbox);

        const firstName = "test";
        const lastName = "user";
        const company = "none";
        const address1 = "nepal";
        const address2 = "KTM";
        const state = "bagmati";
        const city = "kathmandu";
        const zipcode = "1101";
        const mobile = "0000000000";
        const country = await this.selectRandomFromDropdown(locators.conuntryDropdown); // Capture selected value

        await this.waitAndFill(locators.firstNameInputField, firstName);
        await this.waitAndFill(locators.lastNameInputField, lastName);
        await this.waitAndFill(locators.companyInputField, company);
        await this.waitAndFill(locators.address1InputField, address1);
        await this.waitAndFill(locators.address2InputField, address2);
        await this.waitAndFill(locators.stateInputField, state);
        await this.waitAndFill(locators.cityInputField, city);
        await this.waitAndFill(locators.zipcodeInputField, zipcode);
        await this.waitAndFill(locators.mobileNumberInputField, mobile);
        await this.waitAndClickButton(locators.createAccountButton);

        return {
            fullName: `${title} ${firstName} ${lastName}`,
            company,
            address1,
            address2,
            state,
            city,
            zipcode,
            country,
            mobile
        };
    }

    async accountCreatedMessage() {
        await this.isTextVisible(locators.successfulAccountCreatedMessage);
        await this.click(locators.continueButton);
    }
    async accountDeleteMessage() {
        await this.isTextVisible(locators.successfulAccountDeletedMessage);
        await this.click(locators.continueButton)
    }
}

export default SignupORLoginPage