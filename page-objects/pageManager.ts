import { Page } from "@playwright/test"
import { NavigationPage } from '../page-objects/navigationPage' // Import the NavigationPage class
import { FormLayoutsPage } from '../page-objects/formLayoutsPage' // Import the FormLayoutsPage class
import { DatePickerPage } from '../page-objects/datePickerPage' // Import the DatePickerPage class

export class PageManager {
    private readonly page: Page // The page object for the current page
    private readonly navigationPage: NavigationPage // Instance of NavigationPage for navigation methods
    private readonly formLayoutsPage: FormLayoutsPage // Instance of FormLayoutsPage for form-related methods
    private readonly datePickerPage: DatePickerPage // Instance of DatePickerPage for date picker methods

    constructor(page: Page) { // Initialize the page object
        this.page = page // Assign the page to the class property
        this.navigationPage = new NavigationPage(this.page) // Create an instance of NavigationPage
        this.formLayoutsPage = new FormLayoutsPage(this.page) // Create an instance of FormLayoutsPage
        this.datePickerPage = new DatePickerPage(this.page) // Create an instance of Date
    }

    navigateTo(){
        return this.navigationPage // Return the NavigationPage instance for navigation methods
    }
    onFormLayoutsPage() {
        return this.formLayoutsPage // Return the FormLayoutsPage instance for form-related methods
    }
    onDatePickerPage() {
        return this.datePickerPage // Return the DatePickerPage instance for date picker methods
    }
}