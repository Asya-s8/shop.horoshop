import { type Locator, type Page, expect } from '@playwright/test';
import BasePage from '../../base/base.page';

export class ElectronicsPage extends BasePage {
  readonly firstProductCard: Locator;
  readonly buyButton: Locator;
  readonly inCartButton: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.firstProductCard = page.locator('.catalogCard.j-catalog-card').first();
    this.buyButton = this.firstProductCard.locator('button.j-buy-button-add');
    this.inCartButton = this.firstProductCard.locator('button.j-buy-button-remove');
    this.checkoutLink = page
      .locator('.popup.__cart')
      .getByRole('link', { name: /Оформити замовлення/i });
  }

  async getFirstProductName(): Promise<string> {
    return (await this.firstProductCard.locator('.catalogCard-title a').innerText()).trim();
  }

  async hoverFirstProduct(): Promise<void> {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await this.firstProductCard.hover();
  }

  async buyFirstProduct(): Promise<void> {
    await this.buyButton.click();
  }

  async openFirstProduct(): Promise<void> {
    await this.firstProductCard.locator('.catalogCard-title a').click();
  }

  async expectInCartButton(): Promise<void> {
    await expect(this.inCartButton).toBeVisible();
    await expect(this.inCartButton).toHaveText('В кошику');
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutLink.waitFor({ state: 'visible' });
    await this.checkoutLink.click();
  }
}
