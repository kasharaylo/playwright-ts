import { test as base } from '@playwright/test'
import { PageManager } from '../playwright-ts/page-objects/pageManager'

export type TestOptions = {
  globalsQaURL: string
  // Fixture to navigate to the Form Layouts page
  formLayoutsPage: string
  // Fixture to manage page objects
  pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', { option: true }],

    // Fixture to navigate to the Form Layouts page
    formLayoutsPage: async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    },

    // Fixture to manage page objects
    pageManager: async({page, formLayoutsPage}, use) => {
      const pm = new PageManager(page)
      await use(pm)
    }
})