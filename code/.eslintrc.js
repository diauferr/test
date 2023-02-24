const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.json')
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
  rules: {
    'array-callback-return': 'warn',
    'arrow-body-style': [2, 'as-needed'],
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    eqeqeq: 'warn',
    'global-require': 'off',
    'guard-for-in': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-cycle': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/no-webpack-loader-syntax': 0,
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'max-classes-per-file': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        comments: 80,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        tabWidth: 2
      }
    ],
    'new-cap': 'off',
    'newline-per-chained-call': 0,
    'no-await-in-loop': 'warn',
    'no-bitwise': 'off',
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'warn',
    'no-return-assign': 'warn',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'warn',
    'prefer-template': 2,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      },
      {
        usePrettierrc: true
      }
    ],
    radix: 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-closing-tag-location': 0,
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-no-bind': 'off',
    'react/jsx-no-target-blank': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-vars': 2,
    'react/no-array-index-key': 'off',
    'react/no-did-update-set-state': 'warn',
    'react/no-unused-state': 'warn',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'require-yield': 0,
    '@typescript-eslint/no-shadow': 'off'
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: '16'
    }
  }
};
