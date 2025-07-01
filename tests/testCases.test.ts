import test from '../fixtures/fixture'

test.describe("Test Case's",()=>{
  test("Test Case 1: Register User", async ({ homePage, signuporloginPage }) => {
    await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
      await homePage.goto();
    });

    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });

    await signuporloginPage.step("Enter name and email address, then verify account creation", async () => {
      await signuporloginPage.signUp();
      await signuporloginPage.fillSignUp();
      await signuporloginPage.accountCreatedMessage();
    });

    await homePage.step("Verify username is displayed on the homepage and initiate account deletion", async () => {
      await homePage.isUserNameVisible();
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  });
  test("Test Case 2: Login User with correct email and password", async({homePage, signuporloginPage})=> {
    await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
      await homePage.goto();
      await homePage.goToSignORLogin();
    });
    await signuporloginPage.step("Loggin in with the correct creds.", async()=>{
      // here we are passing an email and password that we is a valid account that we created manually.
      await signuporloginPage.logIn("validuser123@xyz.com", "validUser123", "Valid User");
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  });
  test("Test Case 3: Login User with incorrect email and password", async ({ homePage, signuporloginPage }) => {
    await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
      await homePage.goto();
    });
    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });
    await signuporloginPage.step("passing incorrect creds.", async()=>{
      await signuporloginPage.logIn("incorrectemail@xyz.com", "wrongpassword", 'incorrect')
    });
  });
  test("Test Case 4: Logout User", async ({homePage, signuporloginPage}) => {
    await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
      await homePage.goto();
    });
    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });
    await signuporloginPage.step("Loggin in with the correct creds.", async()=>{
      await signuporloginPage.logIn("validuser123@xyz.com", "Admin@123", "Valid User");
    });
    await homePage.step("Logging Out.", async()=>{
      await homePage.logoutAccount()
    }); 
    await homePage.step("Verifying the navigation to homepage", async()=> {
      await homePage.verifylogout()
    })

  })
})