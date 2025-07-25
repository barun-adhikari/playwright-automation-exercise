#  Playwright Automation Exercise

Automated end-to-end tests for the [Automation Exercise](https://www.automationexercise.com/) website using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/).
This project follows the Page Object Model (POM) to structure tests in a scalable and maintainable way.

```
playwright-automation-exercise/
│
├── pages/                # Page classes representing web pages
│   ├── basePage.page.ts
│   ├── homePage.page.ts
│   └── productPage.page.ts
│
├── pageObjects/          # Locators and reusable selectors for pages
│   ├── homePage.objects.ts
│   └── productsPage.objects.ts
│
├── tests/                # Test files
│   └── testCases.test.ts
│
├── data/                 # Test data
│   └── users.json
│
├── fixtures/             # Test fixtures and setup
│   └── fixture.ts
│
├── utils/                # Utility functions (e.g., waits)
│   └── wait.ts
│
├── init.sh               # Shell script to set up the project
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Prerequisites
   Node.js (v16 or later)
   
   npm
   
   Git
   
   Playwright and its dependencies
   
 ## Installation
Clone the repository and install dependencies:
 ```
 git clone https://github.com/barun-adhikari/playwright-automation-exercise.git
 cd playwright-automation-exercise
 ```
 ## Install dependencies
 ```
 npm install
 ```
 ## Install Playwright browsers
 ``` 
 npx playwright install
 ```

## Running Tests From Terminal

To execute all the tests (default headless mode):
```
npm test
```
To run tests with UI (headed mode):
```
npx playwright test --headed
```
To open the Playwright Test Report:
```
npx playwright show-report
```

## Project Structure & Approach

 - Follows the Page Object Model (POM) to separate test logic, locators, and test cases.

 - pages/ contains interaction logic for each page.

 - pageObjects/ contains all reusable selectors.

 - tests/ holds the actual test scenarios.

 - fixtures/ is used to define setup steps like navigation or authentication.

 - utils/ holds utility functions (e.g., waits, retries).

## Configuration

- **playwright.config.ts**: Contains Playwright configuration settings.
- **tsconfig.json**: TypeScript configuration file.
