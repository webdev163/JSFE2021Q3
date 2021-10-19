module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
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
    // Vanilla JS
    // ------------------------------------------
    // Possible Errors
    // https://eslint.org/docs/rules/#possible-errors
    // ---------------------------------------------
    'no-console': 'error',
    'no-template-curly-in-string': 'error',
    // Best Practices
    // https://eslint.org/docs/rules/#best-practices
    'accessor-pairs': 'error',
    'curly': 'error',
    'eqeqeq': ['error', 'always'],
    'no-alert': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'radix': 'error',
    // Strict Mode
    // https://eslint.org/docs/rules/#strict-mode
    'strict': ['error', 'global'],
    // Variables
    // https://eslint.org/docs/rules/#variables
    'no-shadow': ['error', { 'hoist': 'all' }],
    'no-use-before-define': ['error', { 'functions': false }],
    // Stylistic Issues
    // https://eslint.org/docs/rules/#stylistic-issues
    // ---------------------------------------------
    'camelcase': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'functions': 'always-multiline',
    }],
    'eol-last': 'error',
    'indent': ['error', 2, {
      SwitchCase: 1,
    }],
    'lines-between-class-members': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    'no-nested-ternary': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'quotes': ['error', 'single'],
    'semi': 'error',
    'semi-style': 'error',
    // ECMAScript 6
    // https://eslint.org/docs/rules/#ecmascript-6
    // ---------------------------------------------
    'arrow-body-style': ['error', 'as-needed'],
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'arrow-parens': ['error', 'always'],
    // parens are optional but recommended.
    // ESLint doesn't support a *consistent*
    // setting so 'always' is used.
    'constructor-super': 'error', // eslint:recommended
    'generator-star-spacing': ['error', 'after'],
    'no-new-symbol': 'error', // eslint:recommended
    'no-this-before-super': 'error', // eslint:recommended
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'rest-spread-spacing': 'error',
    'yield-star-spacing': ['error', 'after'],
    'object-shorthand': ['error', 'always', { 'avoidQuotes': true }],
    //react
    'react/react-in-jsx-scope': 'off',
  },
};
