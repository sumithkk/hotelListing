const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  module: {
    rules: [
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     ExtractCssChunks.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         // localIdentName: '[hash:base64:5]',
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
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
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: false,
      }),
    ],
  },
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractCssChunks({
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

module.exports = merge(baseConfig, config);
