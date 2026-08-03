import { test } from '@playwright/test';
import { CartPage } from '../../src/ui/pages/cart.page';
import { ElectronicsPage } from '../../src/ui/pages/electronics.page';
import { HomePage } from '../../src/ui/pages/home.page';

test.describe('Cart', () => {
  test('adds first electronics product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const electronicsPage = new ElectronicsPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.openElectronics();

    const productName = await electronicsPage.getFirstProductName();
    await electronicsPage.hoverFirstProduct();
    await electronicsPage.buyFirstProduct();

    await cartPage.waitForOpen();
    await cartPage.close();

    await cartPage.expectItemCount(1);
    await cartPage.open();
    await cartPage.expectProduct(productName);
  });
});
