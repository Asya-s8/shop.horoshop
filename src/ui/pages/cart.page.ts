import { type Locator, type Page, expect } from '@playwright/test';
import BasePage from '../../base/base.page';

export class CartPage extends BasePage {
  readonly popup: Locator;
  readonly closeButton: Locator;
  readonly quantity: Locator;
  readonly basketIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.popup = page.locator('.popup.__cart');
    this.closeButton = this.popup.getByRole('button', { name: 'Закрити' });
    this.quantity = page.locator('.j-basket-quantity').first();
    this.basketIcon = page.locator('.j-basket-icon, .basket__icon').first();
  }

  async waitForOpen(): Promise<void> {
    await this.popup.waitFor({ state: 'visible' });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.popup.waitFor({ state: 'hidden' });
  }

  async open(): Promise<void> {
    await this.basketIcon.click();
    await this.waitForOpen();
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.quantity).toHaveText(String(count));
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.popup.getByText(name, { exact: true })).toBeVisible();
  }
}
