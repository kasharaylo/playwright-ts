import { Page } from "@playwright/test"

export class NavigationPage {
    readonly page: Page // The page object for navigation

    constructor(page: Page) { // Initialize the page object
        this.page = page // Assign the page to the class property
    }

    async formLayoutsPage() { // Method to navigate to the Form Layouts page
        await this.selectGroupMenuItem('Forms') // Ensure the Forms group is expanded
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() { // Method to navigate to the Datepicker page
        await this.selectGroupMenuItem('Forms') // Ensure the Datepicker group is expanded
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() { // Method to navigate to the Smart Table page
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() { // Method to navigate to the Toastr page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() { // Method to navigate to the Tooltip page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click() // Click to expand the group menu if it is not already expanded
        }
    }
}