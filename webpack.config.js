/* global module, __dirname */

module.exports = {
  devServer: {
    compress: true,
    port: 8080
  },

  mode: 'development',
    
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
