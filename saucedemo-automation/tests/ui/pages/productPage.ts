import { Page, Locator } from '@playwright/test';

export class ProductPage {
  page: Page;
  productName: Locator;
  productDescription: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  removeButton: Locator;
  backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async goto(productId: number) {
    // same 404 fix as homePage
    await this.page.goto('/?/inventory-item.html&id=' + productId);
  }
}
