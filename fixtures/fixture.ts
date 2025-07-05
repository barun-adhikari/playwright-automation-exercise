import {test as fixtures, Page} from '@playwright/test'
import HomePage from '../pages/homePage.page'
import SignupORLoginPage from '../pages/signupORLoginPage.page'
import ContactUsPage from '../pages/contactusPage.page'
import ProductsPage from '../pages/productPage.page'

const test = fixtures.extend <{
    homePage : HomePage
    signuporloginPage: SignupORLoginPage
    contactusPage: ContactUsPage
    productsPage: ProductsPage
}>({
    homePage: async({page}: {page: Page}, use) => {
        await use(new HomePage(page))
    },
    signuporloginPage: async({page}: {page: Page}, use) => {
        await use(new SignupORLoginPage(page))
    },
    contactusPage: async({page}: {page: Page}, use) => {
        await use(new ContactUsPage(page))
    },
    productsPage: async({page}: {page: Page}, use)=> {
        await use(new ProductsPage(page))
    }
})
export default test;