'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var iconfont = require('gulp-iconfont');
var iconfontCSS = require('gulp-iconfont-css');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function(gulp) {

  // error catching to prevent gulp from crashing
  var onError = function(error) {
    //If you want details of the error in the console
    console.log(error);
    this.emit('end');
  }

  // compile icons to icon-fonts
  gulp.task('icon-fonts', function(){
    return gulp.src(['./public/images/icons/*.svg'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(iconfontCSS({
      fontName: 'icons',
      targetPath: '../../scss/components/icon/_icon-fonts.scss',
      fontPath: '../fonts/icon-fonts/'
    }))
    .pipe(iconfont({
      fontName: 'icons', // required
      appendCodepoints: true, // recommended option
      normalize: true
    }))
    .on('codepoints', function(codepoints, options) {
      // CSS templating, e.g.
      console.log(codepoints, options);
    })
    .pipe(gulp.dest('./public/fonts/icon-fonts/'))
    .pipe(browserSync.reload({stream: true}));
  });

  gulp.task('icon-fonts:watch', function() {
    return gulp.watch(['./public/images/icons/**/*.svg'], ['icon-fonts']);
  });
};