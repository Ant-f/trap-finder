/* global __dirname, module, require */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common(), {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname
    })
  ]
});