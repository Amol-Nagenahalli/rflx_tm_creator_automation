import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';


test('create program project', async ({ page }) => {
    test.slow();
    test.setTimeout()

  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('a').filter({ hasText: 'Create New' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill(credentials.projectTypeName);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('heading', { name: credentials.projectTypeName }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(credentials.projectTitle);
  const projectTitle = await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).inputValue();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).fill(credentials.creatorDept);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.creatorDept).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Assign To *' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Assign To *' }).fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mat-radio-outer-circle').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('figure').filter({ hasText: 'High' }).getByRole('img').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByLabel('Tag selection').locator('div').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Project Tag' }).fill(credentials.tags);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Project Tag' }).press('Enter');
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotes);

//Add Attachments
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Attachments').first().click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Drag & Drop').click();
//  const target = source.setInputFiles('C:\\PlaywrightAutomation\\PlayWright\\Attachments\\ProjectAttachment.png');
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('input[type="file"]').setInputFiles(target);


//Add Task
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Task').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: ' New Task' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^Task Name \*$/ }).nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).fill(credentials.taskTitle);

//Task Notes
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^Task Notes$/ }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('//label[@id="taskDescriptionId"]').click();
   await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#cdk-accordion-child-2').getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotes);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#taskAddBtn').click();

//Add Distribution
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Distribution', { exact: true }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Specific stores').click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('link', { name: ' Enter Stores' }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mt-2 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).fill(credentials.specificStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Apply').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#specificStoreSaveBtn').click();

//Launch Project
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Launch' }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Yes', { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-17').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-17').fill(credentials.projectLaunchComment);
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


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mat-slide-toggle-thumb-container').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(credentials.projectTitleEdit);
  const projectTitleEdit = await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).inputValue();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('label').filter({ hasText: 'Medium' }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Project Tag' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Project Tag' }).fill(credentials.tags2);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Project Tag' }).press('Enter');
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();

//Post Notes
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Notes').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotesEdit);

//Delete Task
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Task', { exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#task_0').getByTitle('Delete').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('label').filter({ hasText: 'Yes' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();

//Add Task
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Task').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: ' New Task' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^Task Name \*$/ }).nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).fill(credentials.taskTitle1);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#taskAddBtn').click();


//Submit || Apply Change
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Finalise').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Apply Changes' }).click();
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