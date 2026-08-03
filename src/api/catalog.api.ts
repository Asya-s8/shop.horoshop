import type { CatalogResponse } from '../dto/catalog.dto';
import { getPageSession } from './session';

export class CatalogApi {
  async getElectronics(): Promise<CatalogResponse> {
    const page = await getPageSession('/electronics/');

    return {
      status: page.status,
      data: page.html,
    };
  }
}
