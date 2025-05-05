import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) // overwrite default timeouts
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()
    //const text = await successButton.textContent()

    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")

    // await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) //rewtite timeout
})

test('alternative weits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //_____ wait for element
    //await page.waitForSelector('.bg-success')

    //_____ wait for particular responce
    //await page.waitForResponse('https://uitestingplayground.com/ajaxdata')

    //_____ wait for network calls to be completed ("NOT RECOMMENDED")
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")
})

test('temiouts', async({page}) => {
    const successButton = page.locator('.bg-success')
    //test.setTimeout(10000)
    //test.slow()
    //playng with timeouts in configs
    //await successButton.click() //30 sec default wait
    await successButton.click({timeout: 16000})
})