import { test, expect } from '../fixtures/loginFixture';

test.describe('Products page tests', () => {
  test.beforeEach(async ({ poManager }) => {
    const homePage = poManager.getHomePage();
    await homePage.goto();
  });

  test('all 6 products are shown', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await expect(homePage.title).toHaveText('Products');
    await expect(homePage.inventoryItems).toHaveCount(6);
  });

  test('products are sorted A to Z by default', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await expect(homePage.itemNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
  });

  test('sort products Z to A', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.sortBy('za');

    await expect(homePage.itemNames).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);
  });

  test('sort products by price low to high', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.sortBy('lohi');

    await expect(homePage.itemPrices).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
  });

  test('sort products by price high to low', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.sortBy('hilo');

    await expect(homePage.itemPrices).toHaveText(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);
  });

  test('add and remove products from the cart', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.addToCart('Sauce Labs Backpack');
    await homePage.addToCart('Sauce Labs Bike Light');
    await expect(homePage.cartBadge).toHaveText('2');
    await expect(homePage.getRemoveButton('Sauce Labs Backpack')).toBeVisible();

    await homePage.removeFromCart('Sauce Labs Backpack');
    await expect(homePage.cartBadge).toHaveText('1');

    await homePage.removeFromCart('Sauce Labs Bike Light');
    await expect(homePage.cartBadge).toBeHidden();
  });

  test('click on a product name opens the product page', async ({ page, poManager }) => {
    const homePage = poManager.getHomePage();
    const productPage = poManager.getProductPage();

    await homePage.openProduct('Sauce Labs Fleece Jacket');

    await expect(page).toHaveURL(/inventory-item.html\?id=5/);
    // wait for the page to switch first
    await expect(productPage.backButton).toBeVisible();
    await expect(productPage.productName).toHaveText('Sauce Labs Fleece Jacket');
  });

  test('click on cart icon opens the cart', async ({ page, poManager }) => {
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();

    await homePage.openCart();

    await expect(page).toHaveURL('/cart.html');
    await expect(cartPage.title).toHaveText('Your Cart');
  });

  test('reset app state empties the cart', async ({ poManager }) => {
    const homePage = poManager.getHomePage();

    await homePage.addToCart('Sauce Labs Backpack');
    await homePage.addToCart('Sauce Labs Onesie');
    await expect(homePage.cartBadge).toHaveText('2');

    await homePage.resetAppState();

    await expect(homePage.cartBadge).toBeHidden();
  });

  test('logout', async ({ page, poManager }) => {
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();

    await homePage.logout();

    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('cannot open products page after logout', async ({ page, poManager }) => {
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();

    await homePage.logout();
    await homePage.goto();

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    );
  });
});
