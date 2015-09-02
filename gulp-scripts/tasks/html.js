'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var browserSync = require('browser-sync');

//////////////////////////////
// Internal Vars
//////////////////////////////


//////////////////////////////
// Export
//////////////////////////////
module.exports = function(gulp) {
  
  gulp.task('html', function () {
    return gulp.src('./public/index.html')
      .pipe(browserSync.stream());
  });

  gulp.task('html:watch', function () {
    return gulp.watch('./public/**/*.html', ['html']);
  });
}