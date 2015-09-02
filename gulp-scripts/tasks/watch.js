'use strict';

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('watch',[
    'sass:watch',
    'scripts:watch',
    'html:watch',
    'icon-fonts:watch'
  ]);
}
