module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        '.linthtmlrc.js',
        'babel.config.js',
        'gulpfile.js',
        'postcss.config.js',
        'webpack.config.js',
      ],
      env: { node: true },
    },
  ],

  rules: {
    
  },
};
