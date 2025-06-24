import { Page } from "@playwright/test"

export class NavigationPage {
    readonly page: Page // The page object for navigation

    constructor(page: Page) { // Initialize the page object
        this.page = page // Assign the page to the class property
    }

    async formLayoutsPage() { // Method to navigate to the Form Layouts page
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }
}