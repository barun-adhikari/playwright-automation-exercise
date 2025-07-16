import {test as fixtures, Page} from '@playwright/test'
import HomePage from '../pages/homePage.page'
import SignupORLoginPage from '../pages/signupORLoginPage.page'
import ContactUsPage from '../pages/contactusPage.page'
import ProductsPage from '../pages/productPage.page'
import CartPage from '../pages/cartPage.page'
import CheckoutPage from '../pages/checkoutPage.page'

const test = fixtures.extend <{
    homePage : HomePage
    signuporloginPage: SignupORLoginPage
    contactusPage: ContactUsPage
    productsPage: ProductsPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
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
    },
    cartPage: async({page}: {page: Page}, use)=> {
        await use(new CartPage(page))
    },
    checkoutPage: async({page}: {page: Page}, use) => {
        await use(new CheckoutPage(page))
    }
})
export default test;