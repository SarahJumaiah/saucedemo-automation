import { Page, Locator } from '@playwright/test';

// products page after login
export class HomePage {
  page: Page;
  title: Locator;
  inventoryItems: Locator;
  itemNames: Locator;
  itemPrices: Locator;
  sortDropdown: Locator;
  cartLink: Locator;
  cartBadge: Locator;
  menuButton: Locator;
  logoutLink: Locator;
  resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async goto() {
    // /inventory.html gives a 404 + redirect that hangs firefox/webkit, so I go to /?/ directly
    await this.page.goto('/?/inventory.html');
  }

  // ids look like add-to-cart-sauce-labs-backpack
  async addToCart(productName: string) {
    const buttonId = 'add-to-cart-' + productName.toLowerCase().replaceAll(' ', '-');
    await this.page.locator(`[data-test="${buttonId}"]`).click();
  }

  getRemoveButton(productName: string) {
    const buttonId = 'remove-' + productName.toLowerCase().replaceAll(' ', '-');
    return this.page.locator(`[data-test="${buttonId}"]`);
  }

  async removeFromCart(productName: string) {
    await this.getRemoveButton(productName).click();
  }

  async openProduct(productName: string) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.menuButton.click();
    await this.resetAppStateLink.click();
  }
}
