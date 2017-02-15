const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');

const paths = {
  javascripts: [
    'static/javascripts/*.js',
    '!static/javascripts/*.min.js'
  ],
  stylesheets: [
    'static/stylesheets/*.css',
    '!static/stylesheets/*.min.css'
  ]
};
const buildDirectory = 'static';


gulp.task('buildcss', _ => {
  return gulp.src(paths.stylesheets, { base: 'static' })
  .pipe(cleancss())
  .pipe(rename(path => path.extname = '.min.css'))
  .pipe(gulp.dest(buildDirectory));
});


gulp.task('buildjs', _ => {
  return gulp.src(paths.javascripts, { base: 'static' })
    .pipe(uglify())
    .pipe(rename(path => path.extname = '.min.js'))
    .pipe(gulp.dest(buildDirectory));
});


gulp.task('default', ['buildcss', 'buildjs']);
