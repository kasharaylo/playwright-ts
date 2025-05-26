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
})