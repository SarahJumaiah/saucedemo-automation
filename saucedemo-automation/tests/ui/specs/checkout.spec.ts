import { test, expect } from '../fixtures/loginFixture';

test.describe('Checkout tests', () => {
  test.beforeEach(async ({ poManager }) => {
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();

    // backpack 29.99 + bike light 9.99
    await homePage.goto();
    await homePage.addToCart('Sauce Labs Backpack');
    await homePage.addToCart('Sauce Labs Bike Light');
    await homePage.openCart();
    await cartPage.checkoutButton.click();
  });

  test('complete an order', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();
    const homePage = poManager.getHomePage();

    await checkoutPage.fillInformation('Test', 'User', '12345');
    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutPage.overviewItems).toHaveCount(2);
    await expect(checkoutPage.paymentInfo).toHaveText('SauceCard #31337');
    await expect(checkoutPage.shippingInfo).toHaveText('Free Pony Express Delivery!');
    // 39.98 + 8% tax = 43.18
    await expect(checkoutPage.subtotalLabel).toHaveText('Item total: $39.98');
    await expect(checkoutPage.taxLabel).toHaveText('Tax: $3.20');
    await expect(checkoutPage.totalLabel).toHaveText('Total: $43.18');

    await checkoutPage.finishButton.click();
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(homePage.cartBadge).toBeHidden();

    await checkoutPage.clickBackHome();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('first name is required', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();

    await checkoutPage.fillInformation('', 'User', '12345');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('last name is required', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();

    await checkoutPage.fillInformation('Test', '', '12345');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('postal code is required', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();

    await checkoutPage.fillInformation('Test', 'User', '');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('cancel on information page goes back to cart', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();
    const cartPage = poManager.getCartPage();

    await checkoutPage.cancelButton.click();

    await expect(page).toHaveURL('/cart.html');
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('cancel on overview page goes back to products and keeps the cart', async ({ page, poManager }) => {
    const checkoutPage = poManager.getCheckoutPage();
    const homePage = poManager.getHomePage();

    await checkoutPage.fillInformation('Test', 'User', '12345');
    await checkoutPage.continueButton.click();
    await checkoutPage.cancelButton.click();

    await expect(page).toHaveURL('/inventory.html');
    await expect(homePage.cartBadge).toHaveText('2');
  });
});
