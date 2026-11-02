import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  page: Page;
  title: Locator;
  cancelButton: Locator;

  // step 1
  firstNameInput: Locator;
  lastNameInput: Locator;
  postalCodeInput: Locator;
  continueButton: Locator;
  errorMessage: Locator;

  // step 2
  overviewItems: Locator;
  paymentInfo: Locator;
  shippingInfo: Locator;
  subtotalLabel: Locator;
  taxLabel: Locator;
  totalLabel: Locator;
  finishButton: Locator;

  // step 3
  completeHeader: Locator;
  backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.overviewItems = page.locator('[data-test="inventory-item"]');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickBackHome() {
    // firefox sometimes ignores the first click here, so I retry until the url changes
    await expect(async () => {
      if (await this.backHomeButton.isVisible()) {
        await this.backHomeButton.click({ timeout: 1000 });
      }
      await expect(this.page).not.toHaveURL('/checkout-complete.html', { timeout: 1000 });
    }).toPass();
  }
}
