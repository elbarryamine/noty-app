module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/www/bundle.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'prettier/prettier': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        curly: 'off',
        'no-console': 'warn',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
