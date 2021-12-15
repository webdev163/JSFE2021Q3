const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const dotenv = require('dotenv');

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [
      './js/index.ts',
      './scss/style.scss',
    ],
  },
  output: {
    filename: isProd ? './js/[name].[contenthash].js' : './js/[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  context: path.resolve(__dirname, 'src'),
  devtool: isProd ? false : 'inline-source-map',
  optimization: {
    minimize: isProd,
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
      },
    },
  },

  resolve: {
    extensions: ['.js', '.mjs', '.json', '.ts', '.d.ts'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        use: [...cssLoaders()],
      },
      {
        test: /\.s[ac]ss$/,
        use: [...cssLoaders(),
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
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset',
        generator: {
          filename: isDev ? 'assets/img/[name][ext][query]' : 'assets/img/[contenthash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4096,
          },
        },
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: isDev ? 'assets/media/[name][ext][query]' : 'assets/media/[contenthash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: isDev ? 'assets/fonts/[name][ext][query]' : 'assets/fonts/[contenthash][ext][query]',
        },
      },
      {
        test: /(?<!\.inline)\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /icons/,
        type: 'asset',
        generator: {
          filename: isDev ? 'assets/img/[name][ext][query]' : 'assets/img/[contenthash][ext][query]',
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4096,
          },
        },
      },
      {
        test: /(?<!\.inline)\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: /icons/,
        type: 'asset/resource',
        generator: {
          filename: isDev ? 'assets/icons/[name][ext][query]' :  'assets/icons/[contenthash][ext][query]',
        },
      },
      {
        test: /\.(inline.svg)$/,
        type: 'asset/source',
      },
    ],
  },

  plugins: [
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
    new CircularDependencyPlugin({
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
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
    // new ForkTsCheckerWebpackPlugin({
    //   logger: {
    //     infrastructure: 'silent',
    //     issues: 'webpack-infrastructure',
    //     devServer: true,
    //   },
    //   typescript: {
    //     configFile: '../tsconfig.json',
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //     mode: 'write-references',
    //   },
    // }),
  ],
};

if (!isDev) {
  module.exports.module.rules.push(
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: ImageMinimizerPlugin.loader,
          options: {
            filter: (source, sourcePath) => /icons/.test(sourcePath) ? 0 : 1,
            minimizerOptions: {
              plugins: [
                ['mozjpeg', { quality: 75, progressive: true }],
                ['pngquant', { quality: [0.5, 0.6], speed: 3 }],
                ['svgo'],
              ],
            },
          },
        },
      ],
    },
  );
}

function cssLoaders() {
  return [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        url: false,
        modules: {
          auto: /\.module\.\w+$/,
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    ...isProd ? ['postcss-loader'] : [],
  ]
}
