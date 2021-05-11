module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    parserOptions: {
      ecmaVersion: 6,
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/display-name': 'off',
      'react/no-children-prop': 'off'
    },
    ignorePatterns: [
      'node_modules',
      'coverage',
      'build',
      'dist',
      '.*',
      '*.config.{js,ts}',
    ],
  };
  