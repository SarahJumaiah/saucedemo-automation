import { test, expect } from '../fixtures/loginFixture';

test.describe('Cart tests', () => {
  test.beforeEach(async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.goto();
    await homePage.addToCart('Sauce Labs Backpack');
    await homePage.addToCart('Sauce Labs Bolt T-Shirt');
    await homePage.openCart();
  });

  test('cart shows the added products', async ({ poManager }) => {
    const cartPage = poManager.getCartPage();

    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
    await expect(cartPage.itemPrices).toHaveText(['$29.99', '$15.99']);
    await expect(cartPage.itemQuantities).toHaveText(['1', '1']);
  });

  test('remove a product from the cart', async ({ poManager }) => {
    const cartPage = poManager.getCartPage();
    const homePage = poManager.getHomePage();

    await cartPage.removeItem('Sauce Labs Backpack');

    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bolt T-Shirt']);
    await expect(homePage.cartBadge).toHaveText('1');
  });

  test('cart is still there after reload', async ({ page, poManager }) => {
    const cartPage = poManager.getCartPage();

    await page.reload();

    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('continue shopping goes back to products page', async ({ page, poManager }) => {
    const cartPage = poManager.getCartPage();
    const homePage = poManager.getHomePage();

    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL('/inventory.html');
    await expect(homePage.cartBadge).toHaveText('2');
  });

  test('checkout button opens checkout page', async ({ page, poManager }) => {
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();

    await cartPage.checkoutButton.click();

    await expect(page).toHaveURL('/checkout-step-one.html');
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
  });
});

test('empty cart has no products', async ({ poManager }) => {
  const cartPage = poManager.getCartPage();
  const homePage = poManager.getHomePage();

  await cartPage.goto();

  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(homePage.cartBadge).toBeHidden();
});
