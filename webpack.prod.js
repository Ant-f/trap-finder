/* global __dirname, module, require */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const options = {
  cssLoaderOptions: {},
  imageLoaderPublicPath: '/trap-finder/dist'
};

module.exports = merge(common(options), {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname
    })
  ]
});