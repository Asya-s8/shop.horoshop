import { test, expect } from '@playwright/test';
import { CatalogApi } from '../../src/api/catalog.api';

test.describe('GET /electronics/', () => {
  const catalogApi = new CatalogApi();

  test('returns electronics catalog with product cards', async () => {
    const response = await catalogApi.getElectronics();

    expect(response.status).toBe(200);
    expect(response.data).toContain('Електроніка');
    expect(response.data).toContain('catalogCard');
    expect(response.data).toContain('j-catalog-card');
    expect(response.data).toContain('catalogCard-title');
  });
});
