import { type Page } from '@playwright/test';
import BasePage from '../../base/base.page';
import { UrlProvider } from '../../proveders/url.provider';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await super.open(UrlProvider.home());
  }
}
