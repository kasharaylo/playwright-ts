import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage' // Import the NavigationPage class

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to the page', async({page}) => {
    const navigateTo = new NavigationPage(page) // Create an instance of NavigationPage with the current page
    await navigateTo.formLayoutsPage() // Call the method to navigate to the Form Layouts page
    await navigateTo.datepickerPage() // Call the method to navigate to the Datepicker page
    await navigateTo.smartTablePage() // Call the method to navigate to the Smart Table page
    await navigateTo.toastrPage() // Call the method to navigate to the Toastr page
    await navigateTo.tooltipPage() // Call the method to navigate to the Tooltip page
})