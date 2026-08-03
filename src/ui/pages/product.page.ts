import { type Locator, type Page, expect } from '@playwright/test';
import BasePage from '../../base/base.page';

export class ProductPage extends BasePage {
  readonly inCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inCartButton = page.locator('button.j-buy-button-remove').first();
  }

  async expectInCartButton(): Promise<void> {
    await expect(this.inCartButton).toBeVisible();
    await expect(this.inCartButton).toHaveText('В кошику');
  }
}
