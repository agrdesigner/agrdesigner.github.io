const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const inlinesvg = require('postcss-inline-svg');

let destPath = path.join(__dirname, 'build');

gulp.task('compile-css', () => {
 return gulp
   .src(['stylesheets/agrdesigner.scss'])
   .pipe(sourcemaps.init({largeFile: true}))
   .pipe(sass().on('error', sass.logError))
   .pipe(concat('agrdesigner.min.css'))
   .pipe(postcss([autoprefixer(), inlinesvg()]))
   .pipe(clean())
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest(path.join(destPath, 'assets', 'css')));
});

gulp.task('minify-javascript', () => {
 return gulp
   .src([
     'scripts/agrdesigner.js',
     'scripts/components/**/*.js',
     'scripts/helpers/**/*.js'
   ])
   .pipe(concat('agrdesigner.min.js'))
   .pipe(
     uglify({
       mangle: false
     }).on('error', e => console.log(e))
   )
   .pipe(gulp.dest(path.join(destPath, 'assets', 'js')));
});

gulp.task('build', gulp.parallel('compile-css', 'minify-javascript'));

gulp.task('watch', () => {
 gulp.watch(['stylesheets/**'], gulp.parallel('compile-css'));
 gulp.watch(['scripts/**/*.js'], gulp.parallel('minify-javascript'));
});

gulp.task('default', gulp.series('build', 'watch'));
