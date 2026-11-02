import { test, expect } from '../fixtures/loginFixture';

test.describe('Product page tests', () => {
  test.beforeEach(async ({ poManager }) => {
    const productPage = poManager.getProductPage();
    // 4 = backpack
    await productPage.goto(4);
  });

  test('product details are shown', async ({ poManager }) => {
    const productPage = poManager.getProductPage();

    await expect(productPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(productPage.productDescription).not.toBeEmpty();
    await expect(productPage.productPrice).toHaveText('$29.99');
  });

  test('add and remove product from the product page', async ({ poManager }) => {
    const productPage = poManager.getProductPage();
    const homePage = poManager.getHomePage();

    await productPage.addToCartButton.click();
    await expect(homePage.cartBadge).toHaveText('1');
    await expect(productPage.removeButton).toBeVisible();

    await productPage.removeButton.click();
    await expect(homePage.cartBadge).toBeHidden();
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('product added here shows Remove on the products page', async ({ poManager }) => {
    const productPage = poManager.getProductPage();
    const homePage = poManager.getHomePage();

    await productPage.addToCartButton.click();
    await productPage.backButton.click();

    await expect(homePage.getRemoveButton('Sauce Labs Backpack')).toBeVisible();
  });

  test('back button goes back to products page', async ({ page, poManager }) => {
    const productPage = poManager.getProductPage();

    await productPage.backButton.click();

    await expect(page).toHaveURL('/inventory.html');
  });
});
