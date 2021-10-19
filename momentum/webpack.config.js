const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    filename: () => {
      if (isProd) {
        return './js/[name].[fullhash].js';
      } else {
        return './js/[name].js';
      }
    },
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  context: path.resolve(__dirname, 'src'),
  devtool: isProd ? false : 'inline-source-map',
  optimization: {
    minimize: isProd,
    // runtimeChunk: 'single',
    minimizer: [new TerserPlugin({
      terserOptions: {
        toplevel: true,
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules|libs)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },

  performance: {
    assetFilter: (assetFilename) => {
      assetFilename.endsWith('.js');
    },
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: isDev ? './js/[name].json' : './js/[name].[hash].json',
        },
      },
      {
        test: /\.s?(c|(?<=s)a)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        if (isDev) {
          return pathData.chunk.name === 'main' ? './css/style.css' : './css/[name].css';
        } else {
          return pathData.chunk.name === 'main' ? './css/style.[fullhash].css' : './css/[name].[fullhash].css';
        }
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'views/index.html',
    }),
  ],
};

if (!isDev) {
  module.exports.entry.main.splice(0, 1);
  module.exports.plugins.splice(0, 1);
}
