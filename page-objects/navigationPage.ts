import { Locator, Page } from "@playwright/test"

export class NavigationPage {
    readonly page: Page // The page object for navigation
    readonly formLayoutsMenuItem: Locator // Locator for the Form Layouts menu item
    readonly datepickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) { // Initialize the page object
        this.page = page // Assign the page to the class property
        this.formLayoutsMenuItem = page.getByText('Form Layouts') // Locator for Form Layouts menu item
        this.datepickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() { // Method to navigate to the Form Layouts page
        await this.selectGroupMenuItem('Forms') // Ensure the Forms group is expanded
        await this.formLayoutsMenuItem.click()
    }

    async datepickerPage() { // Method to navigate to the Datepicker page
        await this.selectGroupMenuItem('Forms') // Ensure the Datepicker group is expanded
        await this.datepickerMenuItem.click()
    }

    async smartTablePage() { // Method to navigate to the Smart Table page
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() { // Method to navigate to the Toastr page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.toastrMenuItem.click()
    }

    async tooltipPage() { // Method to navigate to the Tooltip page
        await this.selectGroupMenuItem('Modal & Overlays') // Ensure the Modal & Overlays group is expanded
        await this.toastrMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click() // Click to expand the group menu if it is not already expanded
        }
    }
}