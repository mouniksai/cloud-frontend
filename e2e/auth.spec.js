const { test, expect } = require('@playwright/test');

test.describe('Authentication and Navigation Flow', () => {

    test('Homepage loads correctly', async ({ page }) => {
        // Navigate to the app root
        await page.goto('/');

        // Check for standard elements on the homepage
        await expect(page).toHaveTitle(/VoteGuard/i);
        await expect(page.locator('text=VoteGuard')).toBeVisible();
        await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
    });

    test('Login screen renders expected inputs', async ({ page }) => {
        await page.goto('/login');

        // Expect the login form to be present
        await expect(page.locator('input[type="text"], input[name="username"], input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: /sig[n\s]*in|log[n\s]*in/i })).toBeVisible();
    });
});
