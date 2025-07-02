import { Page } from "@playwright/test"

export class HelperBase {
    readonly page: Page // The page object for the current page

    constructor(page: Page) { // Initialize the page object
        this.page = page // Assign the page to the class property
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000) // Wait for the specified number of seconds
    }
}