'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('browser-sync', ['server'], function () {
    browserSync.init({
      'proxy': 'localhost:3000', // local node app address
      'port': 5000, // use *different* port than above
      'notify': true
    })
  });
}
