'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var source = require('vinyl-source-stream');
var browserify = require('gulp-browatchify');
var reactify = require('reactify');
var browserSync = require('browser-sync');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toScripts = [
  './public/js/**/*.js'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function(gulp) {
  
  gulp.task('scripts', function () {
    gulp.src('./public/js/main.js')
      .pipe(browserify({
        debug: !process.env.production,
        transforms: [reactify]
      }))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js'))
      .pipe(browserSync.stream());;
  });

  gulp.task('scripts:watch', function () {
    gulp.watch('./public/js/**/*.js', ['scripts']);
  });

}