const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [
      './js/index.js',
      './scss/style.scss',
    ],
  },
  output: {
    filename: () => {
      if (isProd) {
        return './js/[name].[contenthash].js';
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
    usedExports: true,
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
      usedExports: true,
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules|libs)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
        // commons: {
        //     name: 'commons',
        //     chunks: 'initial',
        //     minChunks: 2,
        // },
      },
    },
  },

  performance: {
    assetFilter: (assetFilename) => {
      assetFilename.endsWith('.js');
    },
  },

  resolve: {
    extensions: ['.js', '.ts', '.d.ts'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?[tj]sx?$/,
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
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false,
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
              ...isProd ? ['postcss-loader'] : [],
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: path.resolve(__dirname, 'src/scss/core/*.scss'),
                },
              },
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
              ...isProd ? ['postcss-loader'] : [],
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: path.resolve(__dirname, 'src/scss/core/*.scss'),
                },
              },
              'import-glob-loader',
            ],
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[hash][ext][query]',
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
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        if (isProd) {
          return pathData.chunk.name === 'main' ? './css/style.[contenthash].css' : './css/[name].[contenthash].css';
        } else {
          return pathData.chunk.name === 'main' ? './css/style.css' : './css/[name].css';
        }
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'views/index.html',
      minify: isDev ? false : {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      logger: {
        infrastructure: 'silent',
        issues: 'webpack-infrastructure',
        devServer: true,
      },
      typescript: {
        configFile: '../tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ],
};
