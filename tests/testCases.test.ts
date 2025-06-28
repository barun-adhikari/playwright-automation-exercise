import test from '../fixtures/fixture'

test.describe("Test Case's",()=>{
test("Test Case 1: Register User", async ({ homePage, signuporloginpage }) => {
  await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
    await homePage.goto();
  });

  await homePage.step("Click on 'Signup / Login' button", async () => {
    await homePage.goToSignORLogin();
  });

  await signuporloginpage.step("Enter name and email address, then verify account creation", async () => {
    await signuporloginpage.signUp();
    await signuporloginpage.fillSignUp();
    await signuporloginpage.accountCreatedMessage();
  });

  await homePage.step("Verify username is displayed on the homepage and initiate account deletion", async () => {
    await homePage.isUserNameVisible();
    await homePage.goToDeleteAccount();
  });

  await signuporloginpage.step("Confirm account deletion", async () => {
    await signuporloginpage.accountDelete();
  });
});


});