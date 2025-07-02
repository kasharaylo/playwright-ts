import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage' // Import the NavigationPage class
import { FormLayoutsPage } from '../page-objects/formLayoutsPage' // Import the FormLayoutsPage class
import { DatePickerPage } from '../page-objects/datePickerPage' // Import the DatePickerPage class

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

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page) // Create an instance of NavigationPage with the current page
    const onFormLayoutsPage = new FormLayoutsPage(page) // Create an instance of FormLayoutsPage with the current page
    const onDatePickerPage = new DatePickerPage(page) // Create an instance of DatePickerPage with the current page

    await navigateTo.formLayoutsPage() // Navigate to the Form Layouts page
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "123456", 'Option 2') // Submit the form with credentials and select an option
    await onFormLayoutsPage.submitInlineFormWithEmailAndCheckbox('John Smith', 'test@test.com', false)

    await navigateTo.datepickerPage() // Navigate to the Datepicker page
    await onDatePickerPage.selectCommonDatePickerDateFromToday(10) // Select a date from the datepicker 5 days from today

    await onDatePickerPage.selectDatePickerWithRange(5, 10) // Select a date range from the datepicker, from 5 to 10 days from today
})