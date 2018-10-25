/* global __dirname, module, require */

const webpack = require('webpack');

module.exports = {
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
  ],
    
  entry: './src/index.jsx',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['jsx', '.js']
  }
};
