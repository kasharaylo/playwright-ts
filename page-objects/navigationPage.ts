import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{ // NavigationPage class extends HelperBase to provide navigation methods

    constructor(page: Page) { // Initialize the page object
        super(page) // Call the constructor of HelperBase
    }

    async formLayoutsPage() { // Method to navigate to the Form Layouts page
        await this.selectGroupMenuItem('Forms') // Ensure the Forms group is expanded
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() { // Method to navigate to the Datepicker page
        await this.selectGroupMenuItem('Forms') // Ensure the Datepicker group is expanded
        await this.page.getByText('Datepicker').click() // Click the Datepicker menu item
    }

    async smartTablePage() { // Method to navigate to the Smart Table page
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click() // Click the Smart Table menu item
    }

    async toastrPage() { // Method to navigate to the Toastr page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.page.getByText('Toastr').click() // Click the Toastr menu item
    }

    async tooltipPage() { // Method to navigate to the Tooltip page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.page.getByText('Tooltip').click() // Click the Tooltip menu item
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click() // Click to expand the group menu if it is not already expanded
        }
    }
}