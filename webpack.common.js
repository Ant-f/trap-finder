/* global __dirname, module, require */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (cssLoaderOptions) {
  const combinedCssLoaderOptions = merge(cssLoaderOptions, {
    camelCase: true,
    modules: true
  });

  return {
    entry: './src/index.jsx',

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: combinedCssLoaderOptions
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
              options: {
                sourceMap: combinedCssLoaderOptions.sourceMap
              }
            }
          ]
        },
        {
          test: /\.(jpg|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                outputPath: 'images/'
              }
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
        }
      ]
    },

    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
      publicPath: '/dist/'
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'stylesheets/main.css'
      })
    ],

    resolve: {
      extensions: ['jsx', '.js']
    }
  };
};
