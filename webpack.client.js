const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

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
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['css-loader', 'postcss-loader'],
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
