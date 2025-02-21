import { test, expect } from '@playwright/test';
import credentials from '../DataFolder/data.js';


test('copy program project', async ({ page }) => {
    test.slow();
    test.setTimeout()

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

  const projectTitleEdit = credentials.projectTitleEditCopy;
//  const projectTitleEdit = "Post Launch Edit Program Project Sanity : TASK-RELEASE 34484";
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

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('a').filter({ hasText: 'Actions' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('menuitem', { name: 'Copy' }).click();


  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).fill(credentials.projectTitleCopy);
  const projectTitle = await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('textbox', { name: 'Project Name' }).inputValue();

  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Next' }).click();


//Launch Project
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Launch' }).click({ delay: 1000 });
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Yes', { exact: true }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-17').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#mat-input-17').fill(credentials.projectLaunchComment);
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
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText(projectTitle).click();
  await page.waitForTimeout(5000);


});


