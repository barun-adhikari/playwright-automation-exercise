import test from '../fixtures/fixture'

test.describe("Test Case's",()=>{
  test("Test Case 1: Register User", async({homePage, signuporloginpage}) => {
    await homePage.step("Launch browser & Navigate to url & Verify that home page is visible successfully", async() => {
      await homePage.goto();
    })
    await homePage.step("Click on 'Signup / Login' button", async()=> {
      await homePage.goToSignORLogin()
    })
    await signuporloginpage.step("Enter name and email address", async()=> {
      await signuporloginpage.signUp()
    })
  })

});