import { APIRequestContext } from '@playwright/test';

export class SauceDemoEndpoints {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getHomePage() {
    return await this.request.get('/');
  }

  async getManifest() {
    return await this.request.get('/manifest.json');
  }

  async getPage(path: string) {
    return await this.request.get(path);
  }
}
