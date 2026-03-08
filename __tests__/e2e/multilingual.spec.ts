import { test, expect } from '@playwright/test';

test.describe('Multilingual', () => {
    test('Switching to Arabic changes dir to RTL and updates URL', async ({ page }) => {
        await page.goto('/en');

        // Make sure we are LTR
        let docDir = await page.locator('html').getAttribute('dir');
        if (!docDir) {
            docDir = await page.locator('div[lang="en"]').getAttribute('dir');
        }
        expect(docDir === 'ltr' || docDir === null).toBeTruthy();

        // Click language switcher
        await page.getByRole('link', { name: 'عربي' }).click();

        // Verify URL changed
        await expect(page).toHaveURL(/\/ar/);

        // Verify RTL
        docDir = await page.locator('html').getAttribute('dir');
        if (!docDir) {
            docDir = await page.locator('div[lang="ar"]').getAttribute('dir');
        }
        expect(docDir).toBe('rtl');
    });
});
