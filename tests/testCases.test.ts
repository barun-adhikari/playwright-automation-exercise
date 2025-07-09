import test from '../fixtures/fixture'

test.describe("Test Case's",()=>{
  test.beforeEach(async ({homePage})=> {
    await homePage.step("Launch browser, navigate to URL, and verify the home page is visible", async () => {
      await homePage.goto();
    });
  });
  test("Test Case 1: Register User", async ({ homePage, signuporloginPage }) => {
    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });

    await signuporloginPage.step("Enter name and email address, then verify account creation", async () => {
      await signuporloginPage.signUp("testuser121312@xyz.com", "test User", "valid");
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
    await homePage.step("LNavigate to Signin / login Page", async () => {
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
    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });
    await signuporloginPage.step("passing incorrect creds.", async()=>{
      await signuporloginPage.logIn("incorrectemail@xyz.com", "wrongpassword", 'invalid')
    });
  });
  test("Test Case 4: Logout User", async ({homePage, signuporloginPage}) => {
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
    });
  });
  test("Test Case 5: Register User with existing email", async({homePage, signuporloginPage}) => {
    await homePage.step("Click on 'Signup / Login' button", async () => {
      await homePage.goToSignORLogin();
    });
    await signuporloginPage.step("Enter already used name and email address", async () => {
      await signuporloginPage.signUp("validuser123@xyz.com", "Valid User", "invalid");
    });
  })
  test("Test Case 6: Contact Us Form", async({homePage, contactusPage}) => {
    await homePage.step("Click on Contact Us", async ()=> {
      await homePage.goToContactus()
    })
    await contactusPage.step("Fill the Contact Form", async ()=> {
      await contactusPage.verifyMessage();
      await contactusPage.fillupContactForm();
      await contactusPage.confirm()
    })
  })
  test("Test Case 7: Verify Test Cases Page", async({homePage}) => {
    await homePage.step("Click on Test Cases Page", async ()=> {
      await homePage.goToTestCase();
    })
  })
  test("Test Case 8: Verify All Products and product detail page", async({homePage, productsPage}) => {
    await homePage.step("Navigation to Products Page", async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step("Checking the Products Page", async()=>{
      await productsPage.verifyProductList()
    })
    await productsPage.step("Checking the details for the 1st product", async()=> {
      await productsPage.checkFirstProduct()
    })
  });
  test("Test Case 9: Search Product", async({homePage, productsPage}) => {
    await homePage.step("Navigation to Products Page", async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step("Searching for the product and verifying it", async()=> {
      const searchFor: string = "top"
      await productsPage.searchProduct(searchFor)
      await productsPage.verifyProductList(searchFor)
    });
  });
  test("Test Case 10: Verify Subscription in home page", async({homePage}) => {
    await homePage.step('Subscribing by email.', async()=>{
      await homePage.subscribe()
    });
  });
  test("Test Case 11: Verify Subscription in Cart page", async({homePage}) => {
    await homePage.step('Subscribing by email from cart page', async()=> {
      await homePage.goToCart();
      await homePage.subscribe(); // using the same code from home page in the cart
    });
  });
  test("Test Case 12: Add Products in Cart", async({homePage, productsPage}) => {
    await homePage.step('Navigation to the products page', async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step('Adding products to cart', async() => {
      await productsPage.addToCart(2);
    })
  })
})