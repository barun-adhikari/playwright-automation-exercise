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
      await homePage.isUserNameVisible("test User");
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  });
  test("Test Case 2: Login User with correct email and password", async({homePage, signuporloginPage})=> {
    await homePage.step("Navigate to Signin / login Page", async () => {
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
      await productsPage.checkProduct(0);          // Here we are selecting the 1st product that is placed on the 0 index.
    })
    await productsPage.step("Checking product details", async()=> {
      await productsPage.checkProductDetails(1)
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
  test("Test Case 12: Add Products in Cart", async({homePage, productsPage, cartPage}) => {
    await homePage.step('Navigation to the products page', async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step('Adding products to cart', async() => {
      await productsPage.addToCart(2);
    });
    await homePage.step('Navigation to cart.', async()=> {
      await homePage.goToCart();
    });
    await cartPage.step('Check the added products.', async()=> {
      await cartPage.checkAddedCart()
    })
  });
  test("Test Case 13: Verify Product quantity in Cart", async({homePage, productsPage, cartPage}) => {
    await homePage.step('Navigation to the products page', async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step("Checking the details for the 1st product", async()=> {
      await productsPage.checkProduct(0);
    })
    await productsPage.step("Checking product details", async()=> {
      await productsPage.checkProductDetails(1, 4)
    });
    await cartPage.step('Check the added products.', async()=> {
      await cartPage.checkAddedCart()
    })
  })
  test("Test Case 14: Place Order: Register while Checkout", async({productsPage, homePage, cartPage, signuporloginPage, checkoutPage})=> {
    await productsPage.step('Adding products and Checking out the products', async()=> {
      await productsPage.addToCart(2)
      await homePage.goToCart();
      await cartPage.checkAddedCart();
      await cartPage.checkout();
    });
    let addressInfo: any;   // this is a bad practice going make a type for the address info in future.
    await signuporloginPage.step("Enter name and email address, then verify account creation", async () => {
      await signuporloginPage.signUp("testuser121312@xyz.com", "test User", "valid");
      addressInfo = await signuporloginPage.fillSignUp(); // capture filled data      
      await signuporloginPage.accountCreatedMessage();
      await homePage.isUserNameVisible("test User");
    });
    await productsPage.step('Checking out the previous products.', async()=> {
      await homePage.goToCart();
      await cartPage.checkout({ afterLogin: true });
    });
    await checkoutPage.step("Verify delivery and billing address details & place order", async () => {
      // await checkoutPage.verifyAddressDetails(addressInfo);
      await checkoutPage.descriptionAndPlaceOrder();
    });
    await checkoutPage.step("Enter payment details and confirm order", async () => {
      await checkoutPage.enterPaymentDetailsAndSubmit({
        name: "Test User",
        cardNumber: "4111111111111111",
        cvc: "123",
        expiryMonth: "07",
        expiryYear: "2027"
      });
    });

    await checkoutPage.step("Verify order success message", async () => {
      await checkoutPage.verifyOrderSuccessMessage();
    });

    await homePage.step("Initiate account deletion", async () => {
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  })
  test("Test Case 15: Place Order: Register before Checkout", async ({ productsPage, homePage, cartPage, signuporloginPage, checkoutPage }) => {
    let addressInfo: any; // Still needs a proper type

    await homePage.step("Navigate to Signup/Login and Register User", async () => {
      await homePage.goToSignORLogin();
      await signuporloginPage.signUp("testuser151515@xyz.com", "test User", "valid");
      addressInfo = await signuporloginPage.fillSignUp(); // Capture filled data
      await signuporloginPage.accountCreatedMessage();
      await homePage.isUserNameVisible("test User");
    });

    await productsPage.step("Add products to cart", async () => {
      await productsPage.addToCart(2);
      await homePage.goToCart();
      await cartPage.checkAddedCart();
      await cartPage.checkout({ afterLogin: true }); // Already logged in at this point
    });

    await checkoutPage.step("Verify delivery and billing address details & place order", async () => {
      // Optionally: await checkoutPage.verifyAddressDetails(addressInfo);
      await checkoutPage.descriptionAndPlaceOrder();
    });

    await checkoutPage.step("Enter payment details and confirm order", async () => {
      await checkoutPage.enterPaymentDetailsAndSubmit({
        name: "Test User",
        cardNumber: "4111111111111111",
        cvc: "123",
        expiryMonth: "07",
        expiryYear: "2027"
      });
    });

    await checkoutPage.step("Verify order success message", async () => {
      await checkoutPage.verifyOrderSuccessMessage();
    });

    await homePage.step("Initiate account deletion", async () => {
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  });
  test("Test Case 16: Place Order: Login before Checkout", async ({ productsPage, homePage, cartPage, signuporloginPage, checkoutPage }) => {

    await homePage.step("Navigate to Signup/Login and Login User", async () => {
      await homePage.goToSignORLogin();
      await signuporloginPage.logIn("validuser123@xyz.com", "Admin@123", "Valid User");
      await homePage.isUserNameVisible("Valid User");
    });

    await productsPage.step("Add products to cart", async () => {
      await productsPage.addToCart(2);
      await homePage.goToCart();
      await cartPage.checkAddedCart();
      await cartPage.checkout({ afterLogin: true }); // Already logged in at this point
    });

    await checkoutPage.step("Verify delivery and billing address details & place order", async () => {
      // Optionally: await checkoutPage.verifyAddressDetails(addressInfo);
      await checkoutPage.descriptionAndPlaceOrder();
    });

    await checkoutPage.step("Enter payment details and confirm order", async () => {
      await checkoutPage.enterPaymentDetailsAndSubmit({
        name: "Test User",
        cardNumber: "4111111111111111",
        cvc: "123",
        expiryMonth: "07",
        expiryYear: "2027"
      });
    });

    await checkoutPage.step("Verify order success message", async () => {
      await checkoutPage.verifyOrderSuccessMessage();
    });

    await homePage.step("Initiate account deletion", async () => {
      await homePage.goToDeleteAccount();
    });

    await signuporloginPage.step("Confirm account deletion", async () => {
      await signuporloginPage.accountDeleteMessage();
    });
  });

  test('Test Case 17: Remove Products From Cart', async({ homePage, productsPage,cartPage}) => {
    await homePage.step('Navigation to the cart page', async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step('Adding and removing the product', async() => {
      await productsPage.addToCart(1);
      await homePage.goToCart();
    });
    await cartPage.step('Remove the added product', async()=> {
      await cartPage.removeProduct();
    })
  })
  test('Test Case 18: View Category Products', async({ homePage, productsPage}) => {
    await homePage.step('Check all the sub-category link', async()=> {
      await homePage.categoryList('Women', 'Tops');
    });
    await productsPage.step('Check the nav from the women category.', async()=> {
      await productsPage.checkNavFromCategory('Women', 'Tops')
    });
    await homePage.step('Check all the sub-category link from products page', async()=> {   // as the function from the homepage does the same using the same code
      await homePage.categoryList('Men', 'Tshirts');
    });
    await productsPage.step('Check the nav from the men category.', async()=> {
      await productsPage.checkNavFromCategory('Men', 'Tshirts')
    });
  });
  test('Test Case 19: View & Cart Brand Products', async({ homePage, productsPage}) => {
    await homePage.step('Navigation to products page.', async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step('Check Brand navigation', async()=> {
      await productsPage.checkBrand();
    })
  });
  test('Test Case 20: Search Products and Verify Cart After Login', async({homePage, productsPage, cartPage, signuporloginPage}) => {
    await homePage.step('Navigation to the products page', async()=> {
      await homePage.goToProducts();
    })
    await productsPage.step('Search and check the products', async()=> {
      await productsPage.searchProduct('jeans');
      await productsPage.verifyProductList('jeans');
      await productsPage.addToCart(3);
    })
    await homePage.step('Navaigation to cart page', async()=> {
      await homePage.goToCart();
    })
    await cartPage.step('Check the products on the cart page', async()=> {
      await cartPage.checkAddedCart();
      await cartPage.checkout();
    })
    await signuporloginPage.step('Logging in', async()=> {
      await signuporloginPage.logIn('validuser123@xyz.com', 'Admin@123', 'Valid User')
    })
    await homePage.step('Navaigation back to cart page', async()=> {
      await homePage.goToCart();
    })
    await cartPage.step('Check the products on the cart page is still visible', async()=> {
      await cartPage.checkAddedCart();
    })
  })
  test("Test Case 21: Add review on product", async({homePage, productsPage})=> {
    await homePage.step("Navigate to the product page", async()=> {
      await homePage.goToProducts();
    });
    await productsPage.step("Write and submit review", async()=> {
      await productsPage.checkProduct(0);
      await productsPage.submitReview();
    })
  })
  test('Test Case 22: Add to cart from Recommended items', async({homePage})=> {
    await homePage.step('Adding recommended item and checking cart', async()=> {
      await homePage.addRecommendedItemToCartAndVerify()
    })
  })
})