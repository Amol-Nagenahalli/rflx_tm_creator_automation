import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';


test('create plan', async ({ page }) => {
    test.slow();

  await page.goto(credentials.knldev01);
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.username);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

// Verify the create New is visible
  await page.locator('#menu-RTM20').click();
  await page.getByRole('link', { name: 'Inbox' }).click();
  const frame = await page.frame({ name: 'RTM20_IN1' });
  const createNewButton = frame.locator('a').filter({ hasText: 'Create New' });
  await expect(createNewButton).toBeVisible();

  // Proceed with project creation steps

  await page.locator('#more-menu i').click();
  await page.locator('#more-menu-PLN i').click();
  await page.getByRole('link', { name: 'Inbox' }).click();

  await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('a').filter({ hasText: 'Create New' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill('');
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill(credentials.planProjectType);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('heading', { name: credentials.planProjectType }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Plan Name' }).fill(credentials.planProjectTitle);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('keyboard_arrow_downCreator').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).fill(credentials.creatorDept);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText(credentials.creatorDept).click();

  await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('app-date-range-input').locator("(//i[@class='icon icon-calendar icon-color-primary fs-20 ng-untouched ng-valid ng-dirty'])[1]").first().click();

  //Calculating Present date.
  const today = new Date();
  const dayToday = today.getDate();
  const datePlus3 = new Date(today);
  datePlus3.setDate(today.getDate() + 3);
  const dayPlus3 = datePlus3.getDate();

// Select Date
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('cell', { name: dayToday.toString(), exact: true }).first().click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('cell', { name: dayPlus3.toString() }).first().click();


// Visibility

  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Visible To Store').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Visible To Store').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('app-date-range-input').locator("(//i[@class='icon icon-calendar icon-color-primary fs-20 ng-untouched ng-valid ng-dirty'])[2]").first().click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('cell', { name: dayToday.toString() }).click();


//Planning Department and Category

  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('High').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Plan Category *' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Plan Category *' }).fill(credentials.planCategory);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText(credentials.planCategory).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('keyboard_arrow_downPlanning').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Planning Department *' }).fill(credentials.planningDept);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('option', { name: credentials.planningDept, exact: true }).locator('div').first().click();


//Add Notes
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Notes').first().click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotes);


//Resources
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Resource', { exact: true }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: ' New Resource' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Resource Type *' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Resource Type *' }).fill(credentials.resourceType);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText(credentials.resourceType, { exact: true }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Resource Department *' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('combobox', { name: 'Resource Department *' }).fill(credentials.resourceDepartment);
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('option', { name: credentials.resourceDepartment, exact: true }).locator('div').first().click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Fixed No.').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('#mat-input-6').click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('#mat-input-6').fill('2');
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Effort', { exact: true }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).click();
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).fill('20');
  await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();

//Add Distribution
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Distribution', { exact: true }).click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Specific stores').click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('link', { name: ' Enter Stores' }).click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).fill(credentials.specificStore);
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByTitle('Apply').click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();

 //Launch
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByText('Finalise').first().click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: 'Launch' }).click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().locator('#mat-radio-12').getByText('Yes').click();
    await page.locator('iframe[name="PLN_IN"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();

});