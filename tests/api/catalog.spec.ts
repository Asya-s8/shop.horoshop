import { test, expect } from '@playwright/test';
import { CatalogApi } from '../../src/api/catalog.api';

test.describe('API / catalog', () => {
  test('GET /electronics/ returns 200', async () => {
    const catalogApi = new CatalogApi();

    const response = await catalogApi.getElectronics();

    expect(response.status).toBe(200);
  });
});
