import { test, expect } from '@playwright/test';

test.describe('Customization Flow', () => {
    test('Can add a custom dress to cart', async ({ page }) => {
        // Nav to products
        await page.goto('/en/products');

        // Custom filter
        await page.getByText('Custom', { exact: true }).click();

        // Wait for at least 1 product
        const firstProduct = page.locator('a:has-text("View Details")').first();
        await expect(firstProduct).toBeVisible();
        await firstProduct.click();

        // Ensure we are on details page
        await expect(page).toHaveURL(/.*\/products\/.*/);

        // Assume custom dress customization options exist
        await expect(page.getByText('Size').first()).toBeVisible();

        // Switch to Custom Measurements
        // Wait for options
        const customButton = page.getByText('Custom Measurements');
        if (await customButton.isVisible()) {
            await customButton.click();
        }

        // Look for Chest input
        const chestInput = page.getByText('Chest (cm)').locator('..').locator('input');
        await expect(chestInput).toBeVisible();

        // Note: Due to mock content variance, we keep tests simple and robust
        await page.getByRole('button', { name: 'Add to Cart' }).click();

        // Check cart
        await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
    });
});
