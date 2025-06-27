import {Page, expect, Locator} from '@playwright/test';

export class BasePage {
    page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    async pause(){
        await this.page.pause()
    }

    async isPageVisible() {
        await this.page.waitForLoadState("domcontentloaded")
    }

    async isTextVisible(text: string) {
        await expect(this.page.getByText(text)).toBeVisible()
    }

    async click(selector: string) {
        await this.page.click(selector)
    } 

    async clickByText(text: string) {
        await this.page.getByText(`${text}`).click()
    }

    async waitAndFill(locator: string,text: string) {
        await this.page.locator(locator).fill(text)
    }

    async waitAndClickButton(name: string): Promise<Locator> {
		try {
			// Wait until the loader is hidden (e.g., after a page or action load)
			await this.page.locator('.loader-container').waitFor({ state: 'hidden' });

			// Find the last button with the given name and exact match
			const button = this.page.getByRole('button', { name, exact: true }).last();
			
			// Ensure the button is visible and enabled before clicking
			await expect(button).toBeVisible();
			await expect(button).toBeEnabled();
			
			// Click the button and return its locator
			await button.click();
			return button;
		} catch (error) {
			// Log an error if clicking the button fails
			console.error(`Failed to click button: ${name}`, error);
			throw error;
		}
	}

    async step(description: string, action: () => Promise<void>): Promise<void> {
        console.log(`Test's Step:- ${description}`)
        await action()
    }

} 

export default BasePage;