const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  mode: 'production',

  module: {
    rules: [
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
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
              emitFile: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
              stripdeclarations: true,
              limit: 4000,
            },
          },
        ],
      },
    ],
  },

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',
  // We don't serve bundle.js for server, so we can use dynamic external imports
  externals: [webpackNodeExternals()],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};

module.exports = merge(baseConfig, config);
