import 'core-js';
import 'reflect-metadata';
import 'ts-helpers';
import 'zone.js/dist/zone';

import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { env } from './env';
import './main.scss';

if (env !== 'prod') {
  // Development
  Error.stackTraceLimit = Infinity;
  /* tslint:disable:no-var-requires */
  require('zone.js/dist/long-stack-trace-zone');
  /* tslint:enable:no-var-requires */
}

if (env === 'prod') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
