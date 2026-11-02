import { test, expect } from '@playwright/test';
import { SauceDemoEndpoints } from '../endpoints/sauceDemoEndpoints';

test.describe('SauceDemo API tests', () => {
  test('get home page', async ({ request }) => {
    const endpoints = new SauceDemoEndpoints(request);

    const response = await endpoints.getHomePage();

    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('Swag Labs');
  });

  test('get manifest.json', async ({ request }) => {
    const endpoints = new SauceDemoEndpoints(request);

    const response = await endpoints.getManifest();

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Swag Labs');
    expect(body.icons.length).toBe(4);
  });

  test('get icon', async ({ request }) => {
    const endpoints = new SauceDemoEndpoints(request);

    const response = await endpoints.getPage('/icon-192x192.png');

    expect(response.status()).toBe(200);
  });
});
