/* global __dirname, module, require */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    }),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/main.css'
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
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          camelCase: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          modules: true,
          sourceMap: true
        }
      }, {
        loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.(jpg|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'images/'
        }
      }, {
        loader: 'image-webpack-loader'
      }]
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
