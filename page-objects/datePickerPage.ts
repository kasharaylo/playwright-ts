import { expect, Page } from "@playwright/test"
import { HelperBase } from "./helperBase" // Import the HelperBase class for common methods

export class DatePickerPage extends HelperBase { // DatePickerPage class extends HelperBase to provide date picker methods

    constructor(page: Page) {
        super(page) // Call the constructor of HelperBase
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker') // Locate the datepicker input field
        await calendarInputField.click() // Open the datepicker
        const dateAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday) // Select the date in the calendar

        await expect(calendarInputField).toHaveValue(dateAssert) // Assert that the input field has the expected date value
    }

    async selectDatePickerWithRange(startDay: number, endDay: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker') // Locate the range datepicker input field
        await calendarInputField.click() // Open the datepicker
        const dateAssertStart = await this.selectDateInTheCalendar(startDay) // Select the start date in the calendar
        const dateAssertEnd = await this.selectDateInTheCalendar(endDay) // Select the end date in the calendar
        const expectedRange = `${dateAssertStart} - ${dateAssertEnd}` // Combine the start and end dates for the expected range
        await expect(calendarInputField).toHaveValue(expectedRange) // Assert that the input field has the expected date range value
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date() // Get the current date
        date.setDate(date.getDate() + numberOfDaysFromToday) // Set the date to tomorrow
        const expctDate = date.getDate().toString() // Get the expected date as a string
        const exactMonthShort = date.toLocaleDateString('En-Us', {month: 'short'}) // Get the short month name
        const exactMonthLong = date.toLocaleDateString('En-Us', {month: 'long'}) // Get the long month name
        const exactYear = date.getFullYear() // Get the year
        const dateAssert = `${exactMonthShort} ${expctDate}, ${exactYear}` // Combine the short month, date, and year for the expected value
        
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // Get the current month and year from the calendar
        const exactMonthAndYear = ` ${exactMonthLong} ${exactYear} ` // Combine the long month and year
        while(!calendarMonthAndYear.includes(exactMonthAndYear)) { // Loop until the calendar shows the expected month and year
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() 
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expctDate, {exact:true}).click() // Click on the day cell in the datepicker
        return dateAssert // Return the expected date string
    }
}