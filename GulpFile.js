/**
 * Module Dependencies
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var iconfontCSS = require('gulp-iconfont-css');
var fileinclude = require('gulp-file-include');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var jeditor = require("gulp-json-editor");
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var deployDir = 'dist';

/**
 * Gulp Tasks
 */

gulp.task('default', ['browser-sync', 'compile'], function() {
    gulp.watch(['public/images/icons/*.svg'], ['icon-fonts']);
    gulp.watch(['public/scss/**/*.*'], ['sass']);
    gulp.watch(['public/js/**/*.*'], ['js']);
    gulp.watch(['public/views/partials/*.*'], ['fileinclude']);
});

//compile html partial to single page
gulp.task('fileinclude', function() {
  gulp.src(['public/views/partials/index.html'])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('public/'))
    .pipe(reload({
      stream:true
    }));
});

// compile everything
gulp.task('compile', ['sass', 'js', 'icon-fonts', 'fileinclude']);

// Reload all Browser windows
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// set some bluemix variables
gulp.task('set-env', function() {
  env({
    file: '.env.js',
    vars: {
      //NODE_DEBUG: 'request', //debug HTTP requests
      NODE_ENV: 'production'
    }
  });
});

// browser-sync start server
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true
    });
});

// initiate nodemon
gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
    .on('start', function() {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart', function() {
        setTimeout(function() {
            reload({
                stream: false
            });
        }, 1000);
    });
});

// compile sass to main.css
gulp.task('sass', function() {
  return gulp.src(['public/scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(reload({
      stream:true
    }));
});

// compile js to main.js
gulp.task('js', function() {
  return gulp.src([
    // 'public/js/*.js'
    'public/scss/patterns/components/tab-panels/tab-panels.js',
    'public/js/demo.js'
  ])
  .pipe(concat('dist.js'))
  .pipe(gulp.dest('public/minjs/'))
  .pipe(reload({stream:true}));
});

// compile icons to icon-fonts
gulp.task('icon-fonts', function(){
  gulp.src(['public/images/icons/*.svg'])
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(iconfontCSS({
    fontName: 'icons',
    targetPath: '../../scss/patterns/core/sass/fonts/_icon-fonts.scss',
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
  .pipe(reload({stream:true}));
});

// export to github
gulp.task('publish', ['clear-publish'], function(cb) {
  var files = [
  // files to ignore when creating dist
  '!./node_modules', '!./GulpFile.js', '!./package.json',
  '!./README_FOR_EXTERNAL_DEV.md', 'README.md', '!.env.js',
  // files to add to the dist folder
  './*', './.gitignore', '.cfignore'];

  // important app config files
  gulp.src(files).pipe(gulp.dest(deployDir));
  // css
  gulp.src(['public/css/style.css'])
    .pipe(minifyCSS())
    .pipe(gulp.dest(deployDir + '/public/css'));
  // js
  gulp.src(['public/minjs/dist.js'])
    .pipe(uglify())
    .pipe(gulp.dest(deployDir + '/public/minjs'));
  // images
  gulp.src(['public/images/**/**.*'])
    .pipe(gulp.dest(deployDir + '/public/images'));
  // fonts / icon-fonts
  gulp.src(['public/fonts/**/**.*'])
    .pipe(gulp.dest(deployDir + '/public/fonts'));
  // data
  gulp.src(['public/data/**/**.*'])
    .pipe(gulp.dest(deployDir + '/public/data'));
  // html
  gulp.src(['public/*.html'])
    .pipe(gulp.dest(deployDir + '/public/'));
  // node js scripts
  gulp.src(['config/*.*'])
    .pipe(gulp.dest(deployDir + '/config/'));
  // package.json
  gulp.src(['./package.json'])
    .pipe(jeditor(function(json) {
      delete json['devDependencies'];
      return json;
    }))
    .pipe(gulp.dest(deployDir));
  // readme
  gulp.src(['./README_FOR_EXTERNAL_DEV.md'])
    .pipe(rename('README.md'))
    .pipe(gulp.dest(deployDir));
});

// deletes exported directory
gulp.task('clear-publish', function() {
  return gulp.src(deployDir)
    .pipe(clean());
});

// error catching to prevent gulp from crashing
var onError = function(error) {
  //If you want details of the error in the console
  console.log(error);
  this.emit('end');
}