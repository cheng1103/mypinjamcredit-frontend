import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/en');

    // Check title
    await expect(page).toHaveTitle(/MyPinjam Credit/);

    // Check logo is visible
    const logo = page.locator('img[alt*="MyPinjam"]');
    await expect(logo).toBeVisible();

    // Check navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/en');

    // Click on About link
    await page.click('text=About');
    await expect(page).toHaveURL(/\/about/);

    // Go back to home
    await page.click('text=Home');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('should switch language', async ({ page }) => {
    await page.goto('/en');

    // Find and click language switcher
    const languageSwitcher = page.locator('[aria-label*="language"]').or(page.locator('text=/EN|MS/i'));
    if (await languageSwitcher.count() > 0) {
      await languageSwitcher.first().click();
      // Wait for navigation
      await page.waitForURL(/\/(en|ms)/);
    }
  });

  test('should display statistics', async ({ page }) => {
    await page.goto('/en');

    // Check for statistics section
    const stats = page.locator('text=/5000\+|100M\+|4\.9/');
    await expect(stats.first()).toBeVisible();
  });

  test('mobile menu should work', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Look for hamburger menu button
    const menuButton = page.locator('button[aria-label*="menu"]').or(page.locator('[aria-label="Toggle menu"]'));

    if (await menuButton.count() > 0) {
      await menuButton.click();

      // Check if menu is visible
      const mobileMenu = page.locator('nav').or(page.locator('[role="navigation"]'));
      await expect(mobileMenu.first()).toBeVisible();
    }
  });
});
