/**
 * Module Dependencies
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var iconfontCSS = require('gulp-iconfont-css');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var server = require('gulp-develop-server');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var reload = browserSync.reload;

/**
 * Gulp Tasks
 */

gulp.task('default', ['browser-sync', 'compile'], function() {
    gulp.watch(['public/images/icons/*.svg'], ['icon-fonts']);
    gulp.watch(['public/scss/**/*.*'], ['sass']);
    gulp.watch(['public/js/**/*.*'], ['js:watch']);
    gulp.watch(['public/index.html'], ['bs-reload']);
    // gulp.watch(['app.js'], ['server:restart']);
});

// compile everything
gulp.task('compile', ['sass', 'js', 'icon-fonts']);

// Reload all Browser windows
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// browser-sync start server
gulp.task('browser-sync', ['server:start'], function() {
// gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'localhost:3000', // local node app address
        port: 5000, // use *different* port than above
        notify: true
    });
});

// run server
gulp.task('server:start', function() {
  server.listen({ path: './app.js' });
});

// restart server
gulp.task('server:restart', function() {
  server.restart();
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
// gulp.task('js', function() {
//   return browserify('./public/js/main.js')
//     .transform([reactify])
//     .bundle()
//     .on('error', onError)
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(gulp.dest('./public/js/'));
// });

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./public/js/main.js', {
    basedir: __dirname,
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: watch
  });
  if (watch) {
    bundler = watchify(bundler)
  }

  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', onError);
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./public/js'));
  }

  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('js', function() {
  return scripts(false);
});

gulp.task('js:watch', function() {
  return scripts(true);
});

// compile icons to icon-fonts
gulp.task('icon-fonts', function(){
  gulp.src(['public/images/icons/*.svg'])
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
  .pipe(reload({stream:true}));
});

// error catching to prevent gulp from crashing
var onError = function(error) {
  //If you want details of the error in the console
  console.log(error);
  this.emit('end');
}