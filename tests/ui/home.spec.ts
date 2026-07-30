import { test, expect } from '@playwright/test';
import { UrlProvider } from '../../src/proveders/url.provider';
import { HomePage } from '../../src/ui/pages/home.page';

test.describe('Home page', () => {
  test('opens shop home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await expect(page).toHaveURL(UrlProvider.home());
  });
});
