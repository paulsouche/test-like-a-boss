'use strict';
const tsconfig = require('./tsconfig.json');
tsconfig.compilerOptions.module = 'commonjs';
process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify(tsconfig.compilerOptions);
require('ts-node/register');

exports.config = (function () {
  return {
    allScriptsTimeout: 10000,

    capabilities: {
      browserName: 'chrome',
    },

    exclude: [],

    framework: 'jasmine2',

    jasmineNodeOpts: {
      showTiming: true,
      showColors: true,
      isVerbose: false,
      includeStackTrace: false,
      defaultTimeoutInterval: 400000,
    },

    onPrepare: function () {
      // add jasmine spec reporter
      let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
      // browser.ignoreSynchronization = true;
      browser.get(browser.params.baseUrl || 'http://localhost:3001/');
    },

    specs: [
      'src/**/*\.e2e-spec.ts',
    ],

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps
     * on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true,
  };
}());
