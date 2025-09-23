import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  // Base JS recommended rules
  js.configs.recommended,
  // TypeScript recommended rules from @typescript-eslint
  tsConfigs.recommended,
  // TypeScript-specific overrides (applies to ts/tsx files)
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: globals.browser,
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
]
