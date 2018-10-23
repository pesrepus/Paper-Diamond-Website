// --------------------------------------------------------------------
// Define Plugins
// --------------------------------------------------------------------

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(
{
   // needed to load non-gulp-plugins
   pattern: '*',
});

// --------------------------------------------------------------------
// Task: clean
// delete production folder
// --------------------------------------------------------------------

gulp.task('clean', function()
{
   return $.del.sync('dist');
});

// --------------------------------------------------------------------
// Task: sass
// compile scss-files into one css-file
// --------------------------------------------------------------------

var sassPaths = [
   'bower_components/foundation-sites/scss',
   'scss/sections'
];

gulp.task('sass', function()
{
   return gulp.src('scss/app.scss')
      .pipe($.sass({includePaths: sassPaths}).on('error', $.sass.logError))
      .pipe($.autoprefixer())
      .pipe(gulp.dest('css'));
});

// --------------------------------------------------------------------
// Task: mincss
// minify the css-file generated with sass
// --------------------------------------------------------------------

gulp.task('mincss', ['sass'], function()
{
   return gulp.src('css/*.css')
      .pipe($.csso())
      .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------
// Task: concat
// take all js-files and generate a singel one out of them
// --------------------------------------------------------------------

// order of files -> order in final js
var jsFiles = [
   'bower_components/jquery/dist/jquery.js',
   'bower_components/what-input/dist/what-input.js',
   'bower_components/foundation-sites/dist/js/foundation.js',
   'js/jquery.easing.1.3.js',
   'plugins/remodal/remodal.js',
   'plugins/scrollreveal/scrollreveal.js',
   'js/app.js'
];

gulp.task('concat', function()
{
   return gulp.src(jsFiles)
      .pipe($.concat('all.js'))
      .pipe(gulp.dest('js'));
});

// --------------------------------------------------------------------
// Task: minjs
// minify the js-file generated with concat
// --------------------------------------------------------------------

gulp.task('minjs', ['concat'], function()
{
   return gulp.src('js/all.js')
      .pipe($.uglify())
      .pipe(gulp.dest('dist/js'));
});

// --------------------------------------------------------------------
// Task: copy
// copy specific files to the 'dist'-folder
// --------------------------------------------------------------------

gulp.task('copy', function()
{
   var cphtml = gulp.src('*.html')
      .pipe(gulp.dest('dist'));

   var cphtaccess = gulp.src('.htaccess')
      .pipe(gulp.dest('dist'));

   var cpfonts = gulp.src('fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

   var cpimgs = gulp.src('img/**/*')
      .pipe(gulp.dest('dist/img'));

   var cpplugins = gulp.src('plugins/**/*')
      .pipe(gulp.dest('dist/plugins'));

   var cpfavicon = gulp.src('favicon/**/*')
      .pipe(gulp.dest('dist'));

   return $.mergeStream(cphtml, cphtaccess, cpfonts, cpimgs, cpplugins, cpfavicon);
});

// --------------------------------------------------------------------
// Task: build
// delete 'dist'-folder and make a new one with optimized files
// --------------------------------------------------------------------

gulp.task('build', function(callback)
{
   $.runSequence('clean', ['mincss', 'minjs'], 'copy', callback);
});

// --------------------------------------------------------------------
// default Task
// watch for file changes and override generated files
// --------------------------------------------------------------------

gulp.task('default', ['sass', 'concat'], function()
{
   gulp.watch(['scss/**/*.scss'], ['sass']);
   gulp.watch(['js/**/*.js'], ['concat']);
});
