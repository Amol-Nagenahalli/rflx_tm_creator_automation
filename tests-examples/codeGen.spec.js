import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.getByRole('button', { name: 'Simple Sanity Repeating : TASK-RELEASE 20458 SA SA6 Simple Sanity Repeating :' }).click();
  await page.getByLabel('SASA6Simple Sanity Repeating : TASK-RELEASE 20458Due by03/11/2025 23:59').getByText('Take Action').click();
  await page.getByText('Update Status').click();
  await page.getByText('Complete', { exact: true }).click();
  await page.getByRole('button', { name: 'Take Action' }).click();
});