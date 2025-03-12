import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';

test('create collaboration project', async ({ page }) => {
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#cdk-accordion-child-2').getByRole('textbox', { name: 'Editor editing area: main.' }).fill(credentials.projectNotes);

   //Calculating Present date.
      const today = new Date();
      const dayToday = today.getDate();
      const datePlus3 = new Date(today);
      datePlus3.setDate(today.getDate() + 3);
      const dayPlus3 = datePlus3.getDate();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#datePicker').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayToday.toString(), exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('cell', { name: dayPlus3.toString() }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Add', exact: true }).click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Execution', { exact: true }).first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('figure').filter({ hasText: 'High' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#input-unq-').fill(credentials.assignTo);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(credentials.assignTo, { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#exec').getByRole('textbox').click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//td[contains(@class, 'active') and contains(@class, 'available') and contains(@class, 'end-date') and contains(@class, 'start-date') and contains(@class, 'today') and contains(@class, 'ng-star-inserted')]").click();


//Add Distribution
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Distribution', { exact: true }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Specific stores').click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('link', { name: ' Enter Stores' }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('.mt-2 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Enter Comma Separated Store' }).fill(credentials.specificStore);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByTitle('Apply').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#specificStoreSaveBtn').click();


//Submit Project
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Finalise').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click({delay: 1000});
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click({ delay: 1000 });


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


//Approver Login
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.Approverusername);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.Approverpassword);
  await page.getByRole('button', { name: 'Login' }).click();


//Approval Inbox
  await page.locator('#menu-RTM20 i').click();
  await page.getByRole('button', { name: 'Approval', exact: true }).click();
  await page.getByLabel('Approval', { exact: true }).getByRole('link', { name: 'Inbox' }).click();

//Filter for Appover
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator("//i[@class='icon icon-filter' and not(@id)]").click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('textbox', { name: 'Title' }).fill(projectTitle);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator('#applyId').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByText(projectTitle).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator('a').filter({ hasText: 'Actions' }).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('menuitem', { name: 'Approve and Launch' }).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(5000);



//login as Creator
  await page.goto(credentials.knldev01);
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.username);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#menu-RTM20').click();
  await page.getByRole('link', { name: 'Inbox' }).click();
  await page.waitForTimeout(5000);

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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Editor editing area: main.' }).fill(credentials.projectNotesEdit);

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



////Submit || Apply Change
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//div[contains(text(),'Final')])[1]").click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("//button[@id = 'miniFormApplyActionBtn']").click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").fill(credentials.postComment);
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").click();
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").fill(credentials.postComment);
//  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();

//Submit Project
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Finalise').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[1]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator("(//textarea[contains(@id, 'mat-input')])[2]").fill(credentials.postComment);
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click({ delay: 1000 });

//Approver Login
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.Approverusername);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.Approverpassword);
  await page.getByRole('button', { name: 'Login' }).click();


//Approval Inbox
  await page.locator('#menu-RTM20 i').click();
  await page.getByRole('button', { name: 'Approval', exact: true }).click();
  await page.getByLabel('Approval', { exact: true }).getByRole('link', { name: 'Inbox' }).click();

//Filter for Appover
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator("//i[@class='icon icon-filter' and not(@id)]").click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('textbox', { name: 'Title' }).fill(projectTitleEdit);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator('#applyId').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByTitle('Refresh').locator('i').click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByText(projectTitleEdit).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().locator('a').filter({ hasText: 'Actions' }).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('menuitem', { name: 'Approve and Launch' }).click();
  await page.locator('iframe[name="RTM20_AIN1"]').contentFrame().getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(5000);


//login as Creator
  await page.goto(credentials.knldev01);
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill(credentials.username);
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#menu-RTM20').click();
  await page.getByRole('link', { name: 'Inbox' }).click();
  await page.waitForTimeout(5000);

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