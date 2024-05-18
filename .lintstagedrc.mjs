export default {
  '*.{json,html,md}': ['prettier --write'],
  '*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix'],
};
