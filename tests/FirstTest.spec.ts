import {test} from '@playwright/test'

//Hooks
test.beforeEach(async({page}) => {
    await page.goto('/')
})


//Test Construction
test('the first test', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('the second test', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

//Combining your tests in test suits .describe
test.describe('test suit one', () => {
    test('the first test', async ({page}) => {
            await page.getByText('Forms').click()
            await page.getByText('Form Layouts').click()
        })
})

test.describe('test suit two', () => {
    test.beforeEach(async({page}) => {
            await page.getByText('Forms').click()
        })
        
        test('the first test', async ({page}) => {
            await page.getByText('Form Layouts').click()
        })

        test('the first test2', async ({page}) => {
            await page.getByText('Datepicker').click()
        })
})