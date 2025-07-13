import {Page, expect, Locator} from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

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

    async checkUrl(endpoint: string) {
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(endpoint);
    }

    async isTextVisible(text: string) {
        const regex = new RegExp(text, 'i');
        const element = this.page.getByText(regex);
        await expect(element, `Expected text "${text}" to be visible`).toBeVisible();
    }

    async click(selector: string) {
        await this.page.click(selector)
    }

    async hover(selector: string){
        await this.page.hover(selector)
    }
    
    async clickByRole(
        role: Parameters<Page['getByRole']>[0],
        name: string | RegExp,
        strict: boolean
    ) {
        await this.page.getByRole(role, { name, exact: strict }).click();
    }

    async clickByText(text: string) {
        await this.page.getByText(`${text}`).click()
    }

    async waitAndFill(locator: string,text: string) {
        await this.page.locator(locator).fill(text)
    }


    async selectRandomFromDropdown(locator: string) {
        await this.page.locator(locator).click();
        const options = this.page.locator(`${locator} option`);
        const count = await options.count()

        const validOptions: {value: string; index: number}[]=[]

        for(let i= 0; i< count; i++) {
            const value = await options.nth(i).getAttribute('value');
            if(value){
                validOptions.push({value, index:i})
            }
        }

        if(validOptions.length === 0){
            throw new Error('There are no elements in the dropdown')
        }

        const random = validOptions[Math.floor(Math.random() * validOptions.length)];
        await this.page.selectOption(locator, { value: random.value });
    }

    async waitAndClickButton(name: string): Promise<Locator> {
		try {
			// Wait until the loader is hidden (e.g., after a page or action load)
			await this.page.locator('.loader-container').waitFor({ state: 'hidden' });

			// Find the last button with the given name and exact match
			const button = this.page.getByRole('button', { name, exact: true });
			
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

    async saveToJson(data: any, filename: string, space: number =2) {
        try{
            const dir = path.dirname(filename);
            if((!fs.existsSync(dir))){
                fs.mkdirSync(dir, {recursive: true})
            }

            const jsonData = JSON.stringify(data, null, space)
            fs.writeFileSync(filename, jsonData, {encoding: 'utf-8'});
            console.log(`Data successfully saved on: ${filename}`)
        } catch(e) {
            console.log(`Error while saving the data: ${e}`)
        }
    }

    async getJsonData<T = any>(filePath: string): Promise<T> {
        try {
            const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
            return JSON.parse(data);
        } catch (error) {
            console.error(`Failed to read or parse JSON from ${filePath}:`, error);
            throw error;
        }
    }
} 

export default BasePage;