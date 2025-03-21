import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';


test('create calendar project', async ({ page }) => {
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill(credentials.calendarProjectType);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('heading', { name: credentials.calendarProjectType }).click();
  const projectTitle = credentials.calendarProjectTitle;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitle);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).fill(credentials.creatorDept);
  const CreatorDpt = credentials.creatorDept;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator(`//span[contains(text(), '${CreatorDpt}')]`).click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#datePicker').click();

  //Calculating Present date.
  const today = new Date();
  const dayToday = today.getDate();
  const datePlus3 = new Date(today);
  datePlus3.setDate(today.getDate() + 3);
  const dayPlus3 = datePlus3.getDate();

// Select Date
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayToday.toString(), exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayPlus3.toString() }).first().click();


//Add Notes
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Notes').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).fill(credentials.projectNotes);

//Recipients
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Recipients').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Organization Level').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^keyboard_arrow_down$/ }).nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('option', { name: credentials.executionLevelStore }).locator('div').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^keyboard_arrow_down$/ }).nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('mat-form-field').filter({ hasText: 'keyboard_arrow_downStart' }).locator('#input-unq-').fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mat-radio-inner-circle').first().click();


//Distribution
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Units').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Specific stores').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('link', { name: ' Enter Stores' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).fill(credentials.specificStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Apply').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Mock Run' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//a[@class='modal-close']").click();

//Launch
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Launch' }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Yes', { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();


//Post Launch Edit

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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitle).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('a').filter({ hasText: 'Actions' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('menuitem', { name: 'Edit' }).click();


//Post Launch edit
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  const projectTitleEdit = credentials.calendarProjectTitleEdit;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitleEdit);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mat-slide-toggle-thumb').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('label').filter({ hasText: 'Medium' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();



//Post Recipient
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Recipients').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//input[@id='input-unq-'])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//input[@id='input-unq-'])[1]").fill(credentials.organizationLevel);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-unq-option-2- div').filter({ hasText: credentials.organizationLevel }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//input[@id='input-unq-'])[2]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//input[@id='input-unq-'])[2]").fill(credentials.assignToCorp);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-unq-option-2- div').filter({ hasText: credentials.assignToCorp }).click();

//Distribution

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Units').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Specific units').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('link', { name: ' Enter Units' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Unit ID' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Unit ID' }).fill(credentials.corpStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Apply').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Mock Run' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//a[@class='modal-close']").click();

//Submit || Apply Change
  await page.waitForTimeout(1000);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//div[contains(text(),'Final')])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//button[@id = 'miniFormApplyActionBtn']").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();


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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitleEdit).click();
  await page.waitForTimeout(5000);
});

