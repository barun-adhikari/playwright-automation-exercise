import {test as fixtures, Page} from '@playwright/test'
import HomePage from '../pages/homePage.page'
import SignupORLoginPage from '../pages/signupORLoginPage.page'
import ContactUsPage from '../pages/contactusPage.page'

const test = fixtures.extend <{
    homePage : HomePage
    signuporloginPage: SignupORLoginPage
    contactusPage: ContactUsPage
}>({
    homePage: async({page}: {page: Page}, use) => {
        await use(new HomePage(page))
    },
    signuporloginPage: async({page}: {page: Page}, use) => {
        await use(new SignupORLoginPage(page))
    },
    contactusPage: async({page}: {page: Page}, use) => {
        await use(new ContactUsPage(page))
    }
})
export default test;