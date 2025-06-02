import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('imput fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('email@email.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('email2@email.com', {delay: 200})

        // Generic Assertions
        const imputValue = await usingTheGridEmailInput.inputValue()
        await expect(imputValue).toEqual('email2@email.com')

        // Locator Assertions
        await expect(usingTheGridEmailInput).toHaveValue('email2@email.com')
    })

    test('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        //await usingTheGridForm.getByLabel('Option 1').check({force: true}) // Check the radio button
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true}) // Check the radio button by role
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        await expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })
})