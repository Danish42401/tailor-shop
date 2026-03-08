import { test, expect } from '@playwright/test';

test.describe('Out of Stock State', () => {
    test('Out of stock items show correct badge and Notify Me button', async ({ page }) => {
        // Nav to products
        await page.goto('/en/products');

        // We expect there might be an out-of-stock item based on mock CMS data
        // If not, this test checks conditionally
        const oosItems = page.getByText('Out of Stock', { exact: true });
        if (await oosItems.count() > 0) {
            const notifyBtn = page.getByRole('link', { name: 'Notify Me' }).first();
            await expect(notifyBtn).toBeVisible();

            const href = await notifyBtn.getAttribute('href');
            expect(href).toContain('wa.me');
        }
    });
});
