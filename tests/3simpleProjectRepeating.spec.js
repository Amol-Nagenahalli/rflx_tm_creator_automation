import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';


test('create simple repeating project', async ({ page }) => {
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
  await page.waitForTimeout(5000);
  const createNewButton = frame.locator('a').filter({ hasText: 'Create New' });
  await expect(createNewButton).toBeVisible();

  // Proceed with project creation steps
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('a').filter({ hasText: 'Create New' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill(credentials.simpleRepeatingType);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('heading', { name: credentials.simpleRepeatingType }).click();

  const projectTitle = credentials.simpleRepeatingProjectTitle;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#projectTitleKey').fill(projectTitle);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#datePicker').click();


  //Calculating Present date.
    const today = new Date();
    const dayToday = today.getDate();
    const datePlus3 = new Date(today);
    datePlus3.setDate(today.getDate() + 10);
    const dayPlus3 = datePlus3.getDate();

//Select Date
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayToday.toString(), exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayPlus3.toString() }).first().click();

//Assign TO
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();

//Frequency
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Fiscal Daily').click();

//Add Distribution
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Specific stores').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('link', { name: ' Enter Stores' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).fill(credentials.specificStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Apply').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).fill(credentials.projectNotes);


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Launch' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('label').filter({ hasText: 'Yes' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();


  //Filter
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//i[@id = 'inbox-filter-icon']").click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitle);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#applyId').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);


  // store Login
    await page.goto(credentials.knldev01);
    await page.getByRole('textbox', { name: 'Enter username' }).click();
    await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.Storeusername);
    await page.getByRole('textbox', { name: 'Enter password' }).click();
    await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.Storepassword);
    await page.getByRole('button', { name: 'Login' }).click();


    await page.getByRole('button', { name: 'Projects' }).click();
    await page.getByText('Sort By').click();
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Projects' }).click();
    await page.waitForTimeout(5000);
    await page.locator(`//span[contains(text(),'${projectTitle}')]`).click();
    await page.locator("(//div[contains(text(),'Take Action')])[1]").click();
    await page.getByText('Update Status').click();
    await page.getByText('Complete', { exact: true }).click();
    await page.getByRole('button', { name: 'Take Action' }).click();


  //Post Launch Edit

  await page.goto(credentials.knldev01);
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.username);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  //Filter
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//i[@id = 'inbox-filter-icon']").click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitle);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#applyId').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitle).first().click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('a').filter({ hasText: 'Actions' }).click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('menuitem', { name: 'Edit' }).click();


    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#projectTitleKey').first().click();
    const projectTitleEdit = credentials.simpleRepeatingProjectTitleEdit;
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#projectTitleKey').fill(projectTitleEdit);
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mat-slide-toggle-thumb').first().click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Yes').click();
    await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();


//Filter 2
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//i[@id = 'inbox-filter-icon']").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitleEdit);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#applyId').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitleEdit).first().click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitleEdit).first().click();
  await page.waitForTimeout(5000);
 });