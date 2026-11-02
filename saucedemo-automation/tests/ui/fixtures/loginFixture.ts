import { test as base } from '@playwright/test';
import { POManager } from '../pages/poManager';

// gives me poManager in every test
export const test = base.extend<{ poManager: POManager }>({
  poManager: async ({ page }, use) => {
    const poManager = new POManager(page);
    await use(poManager);
  },
});

export { expect } from '@playwright/test';
