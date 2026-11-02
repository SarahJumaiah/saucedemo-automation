import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'allure-report/', 'allure-results/'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
