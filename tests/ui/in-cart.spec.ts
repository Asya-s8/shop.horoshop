import { test } from '@playwright/test';
import { CartPage } from '../../src/ui/pages/cart.page';
import { ElectronicsPage } from '../../src/ui/pages/electronics.page';
import { HomePage } from '../../src/ui/pages/home.page';
import { ProductPage } from '../../src/ui/pages/product.page';

test.describe('Product in cart state', () => {
  test('shows In cart button on catalog card and product page', async ({ page }) => {
    const homePage = new HomePage(page);
    const electronicsPage = new ElectronicsPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.openElectronics();

    await electronicsPage.hoverFirstProduct();
    await electronicsPage.buyFirstProduct();

    await cartPage.waitForOpen();
    await cartPage.close();

    await electronicsPage.hoverFirstProduct();
    await electronicsPage.expectInCartButton();

    await electronicsPage.openFirstProduct();
    await productPage.expectInCartButton();
  });
});
