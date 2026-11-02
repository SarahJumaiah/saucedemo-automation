import { Page, Locator } from '@playwright/test';

export class CartPage {
  page: Page;
  title: Locator;
  cartItems: Locator;
  itemNames: Locator;
  itemPrices: Locator;
  itemQuantities: Locator;
  continueShoppingButton: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    // same 404 fix as homePage
    await this.page.goto('/?/cart.html');
  }

  async removeItem(productName: string) {
    const buttonId = 'remove-' + productName.toLowerCase().replaceAll(' ', '-');
    await this.page.locator(`[data-test="${buttonId}"]`).click();
  }
}
