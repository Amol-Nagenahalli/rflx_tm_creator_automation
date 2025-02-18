import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';

test('create collaboration project', async ({ page }) => {
    test.slow();

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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Filter By Keyword' }).fill(credentials.collaborationProjectType);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('heading', { name: credentials.collaborationProjectType }).click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  const projectTitle = credentials.collaborationProjectTitle;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitle);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Creator Department *' }).fill(credentials.creatorDept);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-unq-option-2-projDepartmentId div').filter({ hasText: credentials.creatorDept }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('combobox', { name: 'Schedule Type *' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-unq-option-2- div').filter({ hasText: 'Same for all Units' }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('figure').filter({ hasText: 'High' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();

//Task Store
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Task', { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: ' New Task' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).fill(credentials.collaboTaskStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').fill(credentials.executionLevelStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.executionLevelStore, { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-taskAssignedTo').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-taskAssignedTo').fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).fill('10');

//Add Notes
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^Task Notes$/ }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('//label[@id="taskDescriptionId"]').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#cdk-accordion-child-2').getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotes);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Execution', { exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('figure').filter({ hasText: 'High' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#exec').getByRole('textbox').click();

 //Calculating Present date.
    const today = new Date();
    const dayToday = today.getDate();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayToday.toString(), exact: true }).click();


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
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-18').click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-18').fill(credentials.projectLaunchComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();


//Post Launch Edit
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


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//span[text() = 'Track Edits']").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  const projectTitleEdit = credentials.collaborationProjectTitleEdit;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(projectTitleEdit);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('label').filter({ hasText: 'Medium' }).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();

//Post Notes
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Notes').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill(credentials.projectNotesEdit);

/////
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Task', { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: ' New Task' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Task Name' }).fill(credentials.collaboTaskStore1);

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^keyboard_arrow_down$/ }).nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-unq-option-2- div').filter({ hasText: credentials.executionLevelStore }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('div').filter({ hasText: /^keyboard_arrow_down$/ }).nth(1).click();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-taskAssignedTo').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-taskAssignedTo').fill(credentials.assignTo);
  const storeManagerText = credentials.assignTo;
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator(`//span[contains(text(), '${storeManagerText}')]`).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('spinbutton', { name: 'HH' }).fill('10');
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();



//Submit || Apply Change
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//div[contains(text(),'Final')])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//button[@id = 'miniFormApplyActionBtn']").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();


//Filter
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: projectTitleEdit }).click();
  await page.waitForTimeout(5000);

});