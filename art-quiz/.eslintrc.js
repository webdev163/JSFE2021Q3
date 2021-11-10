module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  // parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '.tsx'],
  //     parser: '@typescript-eslint/parser',
  //     extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  //     plugins: ['@typescript-eslint', 'prettier'],
  //     parserOptions: {
  //       sourceType: 'module',
  //       warnOnUnsupportedTypeScriptVersion: true,
  //     },
  //   },
  //   {
  //     files: [
  //       '.eslintrc.js',
  //       'babel.config.js',
  //       'gulpfile.js',
  //       'postcss.config.js',
  //       'webpack.config.js',
  //     ],
  //     env: { node: true },
  //   },
  // ],

  rules: {},
};
