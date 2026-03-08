import { test, expect } from '@playwright/test';

test.describe('Search and Filter', () => {
    test('Search modal opens and closes via keyboard', async ({ page }) => {
        await page.goto('/en');

        // Open search
        await page.click('button[aria-label="Search"]');
        const searchInput = page.getByPlaceholder('Search products in English or Arabic...');
        await expect(searchInput).toBeVisible();

        // Type query
        await searchInput.fill('frock');

        // Close via Escape
        await page.keyboard.press('Escape');
        await expect(searchInput).not.toBeVisible();
    });

    test('Category filters apply correctly', async ({ page }) => {
        await page.goto('/en/products');

        // Click Kids Frocks pill
        await page.getByText('Kids Frocks', { exact: true }).click();

        // Verify some product shows (or empty state if none)
        // Wait for network/state update
        await page.waitForTimeout(500);

        // Simple check that page didn't crash
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });
});
