/** @type {import('prettier').Config} */
const prettierConfig = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 120,
  proseWrap: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

export default prettierConfig;
