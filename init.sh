#!/bin/bash

echo "🚀 Initializing Playwright + TypeScript project (Chromium-only, headless)..."

# Init Node.js project
npm init -y

# Install dependencies
npm install -D @playwright/test typescript ts-node

echo ""
echo "Which browser do you want to install"
echo "1: Lighter Version (Chromium only)"
echo "2: All Version (Chromium, Firefox, Webkit)"
read -p "Select option [1 or 2]: " browser_choice

if ["$browser_choice" == "1"]; then
# Install only Chromium browser
	echo "Installing Chromium only ..."
	npx playwright insall chromium
elif [ "$browser_choice" == "2" ]; then
# Installing all the browsers
	echo "Installing Full Version ..."
	npx playwright install
else
	echo "Invalid option."
	exit 1
fi



# Create tsconfig.json
cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "noEmit": true,
    "types": ["node", "playwright"]
  },
  "include": ["tests", "pages", "utils", "data", "playwright.config.ts"]
}
EOF

# Create playwright.config.ts with Chromium-only, headless config
cat > playwright.config.ts <<EOF
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ]
});
EOF

# Create folder structure
mkdir -p tests pages utils data

# Sample test
cat > tests/example.spec.ts <<EOF
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Example.com should have correct title', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.expectTitle();
});
EOF

# Sample Page Object
cat > pages/HomePage.ts <<EOF
import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://example.com');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle('Example Domain');
  }
}
EOF

# Sample utils file
cat > utils/wait.ts <<EOF
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
EOF

# Sample data file
cat > data/users.json <<EOF
[
  {
    "username": "testuser",
    "password": "password123"
  }
]
EOF

# .gitignore
cat > .gitignore <<EOF
node_modules/
playwright-report/
test-results/
*.log
.env
EOF

echo "Setup complete! Run the tests with: npx playwright test"
