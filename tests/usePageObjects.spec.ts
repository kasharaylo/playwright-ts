import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager' // Import the PageManager class

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to the page', async({page}) => {
    const pm = new PageManager(page) // Create an instance of PageManager with the current page
    await pm.navigateTo().formLayoutsPage() // Call the method to navigate to the Form Layouts page
    await pm.navigateTo().datepickerPage() // Call the method to navigate to the Datepicker page
    await pm.navigateTo().smartTablePage() // Call the method to navigate to the Smart Table page
    await pm.navigateTo().toastrPage() // Call the method to navigate to the Toastr page
    await pm.navigateTo().tooltipPage() // Call the method to navigate to the Tooltip page
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page) // Create an instance of PageManager with the current page
    await pm.navigateTo().formLayoutsPage() // Navigate to the Form Layouts page
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "123456", 'Option 2') // Submit the form with credentials and select an option
    await pm.onFormLayoutsPage().submitInlineFormWithEmailAndCheckbox('John Smith', 'test@test.com', false)
    await pm.navigateTo().datepickerPage() // Navigate to the Datepicker page
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10) // Select a date from the datepicker 5 days from today
    await pm.onDatePickerPage().selectDatePickerWithRange(5, 10) // Select a date range from the datepicker, from 5 to 10 days from today
})