import {test as fixtures, Page} from '@playwright/test'
import HomePage from '../pages/homePage.page'
import SignupORLoginPage from '../pages/signupORLoginPage.page'

const test = fixtures.extend <{
    homePage : HomePage
    signuporloginPage: SignupORLoginPage
}>({
    homePage: async({page}: {page: Page}, use) => {
        await use(new HomePage(page))
    },
    signuporloginPage: async({page}: {page: Page}, use) => {
        await use(new SignupORLoginPage(page))
    }
})
export default test;