import { type Locator, type Page, expect } from '@playwright/test';
import BasePage from '../../base/base.page';
import type { CheckoutData } from '../../dto/checkout.dto';

export class OrderSuccessPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Ваше замовлення отримано');
  }

  async expectOrderReceived(): Promise<void> {
    await expect(this.title.first()).toBeVisible();
  }

  async expectCustomerData(data: CheckoutData): Promise<void> {
    await expect(this.page.getByText(data.name, { exact: true })).toBeVisible();
    await expect(this.page.getByText(data.email, { exact: true })).toBeVisible();
    await expect(this.page.getByText(`м. ${data.city}`, { exact: true })).toBeVisible();
    await expect(this.page.getByText(formatUaPhone(data.phone), { exact: true })).toBeVisible();
  }
}

function formatUaPhone(digits: string): string {
  const d = digits.replace(/\D/g, '');
  return `+38 (0${d.slice(0, 2)}) ${d.slice(2, 5)}-${d.slice(5, 7)}-${d.slice(7, 9)}`;
}
