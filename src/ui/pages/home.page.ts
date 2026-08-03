import { type Locator, type Page } from '@playwright/test';
import BasePage from '../../base/base.page';
import { UrlProvider } from '../../proveders/url.provider';

export class HomePage extends BasePage {
  readonly electronicsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.electronicsLink = page
      .locator('a.products-menu__title-link', { hasText: 'Електроніка' })
      .first();
  }

  async open(): Promise<void> {
    await super.open(UrlProvider.home());
  }

  async openElectronics(): Promise<void> {
    await this.electronicsLink.click();
  }
}
