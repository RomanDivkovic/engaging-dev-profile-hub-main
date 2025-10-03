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
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        process: 'readonly',
      },
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
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          args: 'none',
        },
      ],
    },
  },
  // Jest tests
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', 'src/**/__tests__/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    rules: {},
  },
  // Service worker / public scripts should run in browser env
  {
    files: ['public/**/*.js', 'dist/**/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {},
  },
  // Node config and script files
  {
    files: ['**/*.cjs', 'scripts/**', 'vite.config.*', 'postcss.config.*'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {},
  },
]
