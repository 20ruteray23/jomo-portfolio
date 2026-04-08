const { test, expect } = require('@playwright/test');

test.describe('Jomo Wambugu Portfolio Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Jomo Wambugu | Civil & Structural Engineer/);
  });

  test('should display the major sections', async ({ page }) => {
    const sections = ['navbar', 'hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('should show profile image in hero section', async ({ page }) => {
    const profileImg = page.locator('.hero-profile-img');
    await expect(profileImg).toBeVisible();
    await expect(profileImg).toHaveAttribute('alt', 'Jomo Wambugu');
  });

  test('should have a functional contact form', async ({ page }) => {
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();
    await expect(form.locator('input[name="name"]')).toBeVisible();
    await expect(form.locator('input[name="email"]')).toBeVisible();
    await expect(form.locator('textarea[name="message"]')).toBeVisible();
    await expect(form.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have social links and contact info', async ({ page }) => {
    const linkedin = page.locator('a[href*="linkedin.com"]');
    await expect(linkedin.first()).toBeVisible();
    
    const email = page.locator('a[href^="mailto:"]');
    await expect(email.first()).toBeVisible();
  });

  test('should have a working hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();
  });
});
