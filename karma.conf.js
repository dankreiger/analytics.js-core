/* eslint-env node */
'use strict';

// 10 minutes
var TEST_TIMEOUT = 10 * 60 * 1000;

module.exports = function(config) {
  require('ts-node').register({
    compilerOptions: {
      module: 'commonjs'
    }
  });
  config.set({
    files: [
      { pattern: 'test/support/*.html', included: false },
      'test/support/global.ts', // NOTE: This must run before all tests
      'test/**/*.test.ts'
    ],
    browsers: ['ChromeHeadless'],

    singleRun: true,

    frameworks: ['browserify', 'mocha', 'karma-typescript'],

    reporters: ['spec'],

    preprocessors: {
      'test/**/*.js': 'browserify',
      'test/**/*.ts': 'karma-typescript'
    },

    browserNoActivityTimeout: TEST_TIMEOUT,

    client: {
      mocha: {
        grep: process.env.GREP,
        timeout: TEST_TIMEOUT
      }
    },

    browserify: {
      debug: true
    },

    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs',
        target: 'ES5'
      },
      include: ['test'],
      exclude: ['node_modules', 'lib', 'test-e2e']
    }
  });
};
