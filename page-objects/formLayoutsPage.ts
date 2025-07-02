import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page) { // Initialize the page object
        super(page) // Call the constructor of HelperBase
    }
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email) // Fill the email field
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password) // Fill the password
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true}) // Check the first radio option
        await usingTheGridForm.getByRole('button').click() // Click the Sign in button
    }

    /**
     * This method will out the Inline form with user details
     * @param name - should be first or last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */

    async submitInlineFormWithEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inLineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name) // Fill the email field
        await inLineForm.getByRole('textbox', {name: "Email"}).fill(email) // Fill the password
        if(rememberMe)
            await inLineForm.getByRole('checkbox').check({force: true})
        await inLineForm.getByRole('button').click()
    }
}