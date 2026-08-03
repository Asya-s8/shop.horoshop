import { type Locator, type Page, expect } from '@playwright/test';
import BasePage from '../../base/base.page';
import type { CheckoutData } from '../../dto/checkout.dto';

export class CheckoutPage extends BasePage {
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly cityInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#checkout-name');
    this.phoneInput = page.locator('#checkout-phone');
    this.cityInput = page.locator('#checkout-city');
    this.emailInput = page.locator('#checkout-email');
    this.submitButton = page.locator('button.j-submit', {
      hasText: 'Оформити замовлення',
    });
  }

  async fillCustomerData(data: CheckoutData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.fillPhone(data.phone);
    await this.selectCity(data.city);
    await this.emailInput.fill(data.email);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.click();
    await this.phoneInput.fill('');
    await this.phoneInput.pressSequentially(phone, { delay: 40 });
  }

  async selectCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
    await this.page
      .locator('.ui-menu-item', { hasText: `м. ${city}` })
      .first()
      .click();
  }

  async submitOrder(): Promise<void> {
    await expect(this.submitButton).not.toHaveClass(/__disabled/);
    await this.submitButton.click();
  }
}
