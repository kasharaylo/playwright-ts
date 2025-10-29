import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager' // Import the PageManager class
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('/')
})

test('Navigate to the page @smoke @regression', async({page}) => {
    const pm = new PageManager(page) // Create an instance of PageManager with the current page
    await pm.navigateTo().formLayoutsPage() // Call the method to navigate to the Form Layouts page
    await pm.navigateTo().datepickerPage() // Call the method to navigate to the Datepicker page
    await pm.navigateTo().smartTablePage() // Call the method to navigate to the Smart Table page
    await pm.navigateTo().toastrPage() // Call the method to navigate to the Toastr page
    await pm.navigateTo().tooltipPage() // Call the method to navigate to the Tooltip page
})

test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page) // Create an instance of PageManager with the current page
    const fullRandomName = faker.person.fullName() // Generate a full random name using faker
    const randomEmail = `${fullRandomName.replace(' ', '')}${faker.number.int(1000)}@test.com` // Generate a random email using faker

    await pm.navigateTo().formLayoutsPage() // Navigate to the Form Layouts page
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2') // Submit the form with credentials and select an option
    await page.screenshot({path: `screenshots/formlayout.png`})
    const buffer = await page.screenshot() // Capture a screenshot of the current page
    //console.log(buffer.toString('base64')) // Log the screenshot buffer as a base64 string
    await pm.onFormLayoutsPage().submitInlineFormWithEmailAndCheckbox(fullRandomName, randomEmail, false)
    await page.locator('nb-card:has-text("Inline form")').screenshot({path: `screenshots/inlineform.png`})
    
    // await pm.navigateTo().datepickerPage() // Navigate to the Datepicker page
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10) // Select a date from the datepicker 5 days from today
    // await pm.onDatePickerPage().selectDatePickerWithRange(5, 10) // Select a date range from the datepicker, from 5 to 10 days from today
})

test.only('Testing with argos CI', async({page}) => {
    const pm = new PageManager(page) // Create an instance of PageManager with the current page
    await pm.navigateTo().formLayoutsPage() // Call the method to navigate to the Form Layouts page
    await pm.navigateTo().datepickerPage() // Call the method to navigate to the Datepicker page
})