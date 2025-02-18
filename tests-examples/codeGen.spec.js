import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knldev01.reflexisinc.co.in/kernel/views/authenticate/W/REFLEXIS.view');
});