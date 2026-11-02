import { chromium } from '@playwright/test';
import { LoginPage } from '../../ui/pages/loginPage';
import { standardUser } from '../../../testData/testUsers';

// login once and save it so the tests start logged in
async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL: process.env.BASE_URL || 'https://www.saucedemo.com' });

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
