/* global module, require */

const webpackConfig = require('./webpack.config.js');

// Karma configuration 
module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha' ],
    
    files: [
      // each file acts as entry point for the webpack configuration 
      { pattern: 'test/**/*.spec.js' }
    ],

    preprocessors: {
      '**/*.js': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
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
