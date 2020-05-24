const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',
  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve(__dirname, '../../src'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
            {
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /\.(jpg|svg|png|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[name].css',
      hot: true,
      //orderWarning: true, // Disable to remove warnings about conflicting order between imports
      //reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true,
    }),
    //   new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, config);
