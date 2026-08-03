import { test, expect } from '@playwright/test';
import { createCheckoutData } from '../../src/dto/checkout.factory';
import { CheckoutPage } from '../../src/ui/pages/checkout.page';
import { ElectronicsPage } from '../../src/ui/pages/electronics.page';
import { HomePage } from '../../src/ui/pages/home.page';
import { OrderSuccessPage } from '../../src/ui/pages/order-success.page';

test.describe('Checkout', () => {
  test('places an order for the first electronics product', async ({ page }) => {
    const homePage = new HomePage(page);
    const electronicsPage = new ElectronicsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderSuccessPage = new OrderSuccessPage(page);

    const customer = createCheckoutData();

    await homePage.open();
    await homePage.openElectronics();

    await electronicsPage.hoverFirstProduct();
    await electronicsPage.buyFirstProduct();
    await electronicsPage.goToCheckout();

    await checkoutPage.fillCustomerData(customer);
    await checkoutPage.submitOrder();

    await expect(page).toHaveURL(/\/checkout\/complete\//, { timeout: 15_000 });
    await orderSuccessPage.expectOrderReceived();
    await orderSuccessPage.expectCustomerData(customer);
  });
});
