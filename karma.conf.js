/* global module, require */

const webpackConfig = require('./webpack.dev.js');

// Karma configuration 
module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    
    files: [
      // each file acts as entry point for the webpack configuration 
      { pattern: 'test/**/*.spec.js' }
    ],

    preprocessors: {
      '**/*.js': ['webpack']
    },

    webpack: {
      mode: webpackConfig.mode,
      module: {
        rules: [
          {
            test: /\.jsx?$/i,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test: /\.scss$/i,
            use: 'null-loader'
          },
          {
            test: /\.svg$/i,
            use: 'null-loader'
          }]
      },
      plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // See https://www.npmjs.com/package/karma-mocha
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
