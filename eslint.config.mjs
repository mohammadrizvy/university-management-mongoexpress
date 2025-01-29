import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      // 'no-console': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
);
