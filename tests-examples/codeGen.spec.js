import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#form i').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('06:30 AM').first().click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().locator('#form i').nth(1).click();
  await page.locator('iframe[name="RTM20_IN1"]').contentFrame().getByText('07:00 AM').nth(1).click();
});