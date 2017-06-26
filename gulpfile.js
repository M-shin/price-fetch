/* eslint no-process-env: 0 */
'use strict';

const gulp = require('gulp');

process.env.NODE_ENV = 'local';

require('godaddy-test-tools')(gulp, {
  es6: true,
  lint: {
    jscs: {
      fix: true
    },
    files: ['*.js', 'src/**/*.js']
  }
});
