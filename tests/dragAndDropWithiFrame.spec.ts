import {test, expect} from '@playwright/test';

test('drag and drop within an iframe', async ({page}) => {
    // Navigate to the page with the iframe
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    // Wait for the iframe to load and get its content frame
    const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', { hasText: "High Tatras 2" }).dragTo(frame.locator('#trash'))

    // More precise control
    await frame.locator('li', { hasText: "High Tatras 4" }).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2" , "High Tatras 4"])
})