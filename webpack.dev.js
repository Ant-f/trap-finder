/* global module, require */

const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

const options = {
  cssLoaderOptions: {
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    sourceMap: true
  },
  imageLoaderPublicPath: '/dist'
};

module.exports = merge(common(options), {
  devServer: {
    compress: true,
    port: 8080
  },

  mode: 'development',

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // inline sourcemap
      test: /\.js($|\?)/i // case-insensitive match for js files
    })
  ]
});
