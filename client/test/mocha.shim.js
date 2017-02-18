var jsdom = require('jsdom')

var document = jsdom.jsdom('<!doctype html><html><head><title>Mocha Testing Page</title></head><body></body></html>');

var window = document.defaultView;

global.document = document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
global.Node = window.Node;

require('core-js');
require('reflect-metadata');
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

var fs = require('fs');

require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.scss'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

global.window = window;
