import { test, expect } from '../fixtures/loginFixture';
import { standardUser, invalidLogins } from '../../../testData/testUsers';

// I need to be logged out for these
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login tests', () => {
  test.beforeEach(async ({ poManager }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
  });

  test('login with standard user', async ({ page, poManager }) => {
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();

    await loginPage.login(standardUser.username, standardUser.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(homePage.title).toHaveText('Products');
  });

  for (const data of invalidLogins) {
    test('login fails with ' + data.name, async ({ page, poManager }) => {
      const loginPage = poManager.getLoginPage();

      await loginPage.login(data.username, data.password);

      await expect(loginPage.errorMessage).toHaveText(data.error);
      await expect(loginPage.usernameInput).toHaveClass(/input_error/);
      await expect(page).toHaveURL('/');
    });
  }

  test('close the error message', async ({ poManager }) => {
    const loginPage = poManager.getLoginPage();

    // empty login to get an error
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();

    await loginPage.errorCloseButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
  });
});
