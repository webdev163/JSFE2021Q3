const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      './js/index.js',
      './scss/style.scss',
    ],
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  context: path.resolve(__dirname, 'src'),
  devtool: isProd ? false : 'inline-source-map',
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin({
      terserOptions: {
        toplevel: true,
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
    // splitChunks: {
    //   chunks: 'all',
    //   usedExports: true,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/](node_modules|libs)[\\/]/,
    //       name: 'vendor',
    //       enforce: true,
    //     },
    //   },
    // },
  },


  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?(c|(?<=s)a)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  url: false,
                },
              },
              'postcss-loader',
              'sass-loader',
              'import-glob-loader',
            ],
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => pathData.chunk.name === 'main' ? './css/style.css' : './css/[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    }),
  ],
};

if (!isDev) {
  module.exports.entry.main.splice(0, 1);
  module.exports.plugins.splice(1, 1);
}
