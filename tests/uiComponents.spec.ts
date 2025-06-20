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

test('Checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true}) // Force click to bypass any potential issues with visibility
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true}) // Uncheck the checkbox
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true}) // Check the checkbox

    // check all checkboxes
    const allboxes = page.getByRole('checkbox') // Get all checkboxes on the page
    for(const box of await allboxes.all()) { // Iterate through each checkbox
        await box.uncheck({force: true}) // Uncheck each checkbox
        expect(await box.isChecked()).toBeFalsy() // Assert that the checkbox is unchecked
    }
})

test('lists and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select') // Locate the dropdown menu in the header
    await dropDownMenu.click() // Open the dropdown menu

    page.getByRole('list') // Get the list of options in the dropdown UL Tag
    page.getByRole('listitem') // Get each list item in the dropdown LI Tag

    //const optionsList = page.getByRole('list').locator('nb-option') // Get the list of options in the dropdown
    const optionsList = page.locator('nb-option-list nb-option') // Get the list of options in the dropdown
    await expect(optionsList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) // Assert that the dropdown contains the expected options
    await optionsList.filter({hasText: 'Cosmic'}).click() // Click on the 'Cosmic' option

    const header = page.locator('nb-layout-header') // Locate the header
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)') // Assert that the header background color changes to Cosmic theme color

    const colors = {
        Light: 'rgb(255, 255, 255)',
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)',
        Corporate: 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click()
    for(const color in colors) {
        await optionsList.filter({hasText: color}).click() // Click on each option in the dropdown
        await expect(header).toHaveCSS('background-color', colors[color]) // Assert that the header background color changes accordingly
        if(color !== 'Corporate') {
            await dropDownMenu.click()  // Reopen the dropdown menu for the next iteration
        }
    }
})

test('Tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name: 'Top'}).hover() // Hover over the button to trigger the tooltip

    //page.getByRole('tooltip') // Get the tooltip element (if you have a specific tooltip role)
    const tooltip = await page.locator('nb-tooltip').textContent() // Locate the tooltip element
    await expect(tooltip).toEqual('This is a tooltip') // Assert that the tooltip is visible
})

test('Dialog boxes', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => { // accept the browser dialog boxes
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('Web Tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // get  the row by any text in the row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click() // Click the edit button in the row
    await page.locator('input-editor').getByPlaceholder('Age').clear() // Clear the Age input field
    await page.locator('input-editor').getByPlaceholder('Age').fill('35') // Fill the Age input field with a new value
    await page.locator('.nb-checkmark').click()

    // get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click() // Navigate to the second page
    const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')}) // Get the row with ID 11
    await targetRowById.locator('.nb-edit').click() // Click the edit button in the row

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com') // Fill the E-mail input field with a new value
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com') // Assert that the email has been updated

    // test filter of the table
    const ages = ["20", "30", "40", "200"]

    for(let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500) // Wait for the filter to apply
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent() // Get the value of the Age column
            
            if(age == "200") {
                const tableText = await page.getByRole('table').textContent()
                expect(tableText).toContain('No data found') // Assert that no data is found for age 200
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Datepicker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker') // Locate the datepicker input field
    await calendarInputField.click() // Open the datepicker

    let date = new Date() // Get the current date
    date.setDate(date.getDate() + 200) // Set the date to tomorrow
    const expctDate = date.getDate().toString() // Get the expected date as a string
    const exactMonthShort = date.toLocaleDateString('En-Us', {month: 'short'}) // Get the short month name
    const exactMonthLong = date.toLocaleDateString('En-Us', {month: 'long'}) // Get the long month name
    const exactYear = date.getFullYear() // Get the year

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // Get the current month and year from the calendar
    const exactMonthAndYear = ` ${exactMonthLong} ${exactYear} ` // Combine the long month and year
    while(!calendarMonthAndYear.includes(exactMonthAndYear)) { // Loop until the calendar shows the expected month and year
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() 
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expctDate, {exact:true}).click() // Click on the day cell in the datepicker
    await expect(calendarInputField).toHaveValue(`${exactMonthShort} ${expctDate}, ${exactYear}`) // Assert that the input field has the expected date value
})

test('Sliders by attributes' , async({page}) => {
    // update the attributes
    const tempAttribute = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempAttribute.evaluate((node) => {
        node.setAttribute('cx', '232.600') // Set the x-coordinate of the center of the circle
        node.setAttribute('cy', '232.600') // Set the y-coordinate of the center of the circle
    })
    await tempAttribute.click() // click over the temperature slider
})

test('Sliders by coordinates', async({page}) => {
    //simulate the mouse movement
    const temperatureSlider = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await temperatureSlider.scrollIntoViewIfNeeded() // Scroll the temperature slider into view

    const box = await temperatureSlider.boundingBox() // Get the bounding box of the temperature slider
    const x = box.x + box.width / 2 // Calculate the center coordinates of the slider
    const y = box.y + box.height / 2 // Calculate the center coordinates of the slider

    await page.mouse.move(x, y) // Move the mouse to the center of the slider
    await page.mouse.down() // Press down the mouse button
    await page.mouse.move(x + 100, y) // Move the mouse to the right
    await page.mouse.move(x + 100, y + 100 ) // Move the mouse down
    await page.mouse.up() // Release the mouse button

    await expect(temperatureSlider).toContainText('30') // Assert that the temperature slider displays the expected value of 30
})