import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('Finalise').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
});