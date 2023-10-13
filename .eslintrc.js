module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['simple-import-sort', '@typescript-eslint'],
  rules: {
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'import/newline-after-import': ['error'],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react$', '^[a-z]'], ['^@'], ['^\\.']]
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandLast: true,
        reservedFirst: ['key', 'ref']
      }
    ]
  }
};
