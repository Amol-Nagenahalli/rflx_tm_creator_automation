import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Post Launch Edit Program Project Sanity : TASK-RELEASE 34484').click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('menuitem', { name: ' Copy' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('menuitem', { name: ' Copy' }).click();
});