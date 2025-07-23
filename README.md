#  Playwright Automation Exercise

Automated end-to-end tests for the Automation Exercise website using Playwright and TypeScript.
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
    Bash (for init.sh script) (If you want to setpu the project files and the folders like this for new project)
    Playwright and its dependencies
