import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

// Minimal flat config: include JS recommended config, then add a TypeScript
// file matcher section that sets parser, enables the @typescript-eslint plugin
// and a small ruleset. Avoid using 'extends' anywhere so flat mode stays happy.
export default [
  js.configs.recommended,
  // Global ignores and basic TypeScript settings
  {
    ignores: ['dist/**', 'public/*.js', 'node_modules/**'],
  },
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      env: { browser: true, es2020: true },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Jest tests
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', 'src/**/__tests__/**'],
    languageOptions: {
      env: { jest: true, es2021: true },
    },
    rules: {},
  },
  // Service worker / public scripts should run in browser env
  {
    files: ['public/**/*.js', 'dist/**/*.js'],
    languageOptions: {
      env: { browser: true },
    },
    rules: {},
  },
  // Node config and script files
  {
    files: ['**/*.cjs', 'scripts/**', 'vite.config.*', 'postcss.config.*'],
    languageOptions: {
      env: { node: true },
    },
    rules: {},
  },
]
