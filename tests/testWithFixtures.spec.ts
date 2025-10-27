import { test } from '../test-options'
import { faker } from '@faker-js/faker'

// Using the fixture to navigate to the Form Layouts page
test('parametrized methods', async({pageManager}) => {
    const fullRandomName = faker.person.fullName() // Generate a full random name using faker
    const randomEmail = `${fullRandomName.replace(' ', '')}${faker.number.int(1000)}@test.com` // Generate a random email using faker

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2') // Submit the form with credentials and select an option
    await pageManager.onFormLayoutsPage().submitInlineFormWithEmailAndCheckbox(fullRandomName, randomEmail, false)
})