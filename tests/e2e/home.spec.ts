import { test, expect } from '@playwright/test';

test.describe('fab.tf homepage', () => {
  test('loads and shows repositories', async ({ page }) => {
    // Access via the static export basePath
    await page.goto('http://localhost:3000/fab.tf/');
    // ensure the section title exists
    await expect(page.locator('h2', { hasText: /Mes dépôts publics GitHub/i })).toBeVisible();
    // ensure at least one repo item is rendered
    const items = page.locator('section > ul > li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });
});
