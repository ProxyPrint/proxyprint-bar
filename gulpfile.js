var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var javascript = fs.readFileSync('javascript.assets').toString().split("\n");
for (i in javascript) {
  var aux = javascript[i].trim();
  if (aux != "") {
    javascript[i] = aux;
  }
}
var stylesheets = ['src/css/**/*.css'];

gulp.task('build-css', function() {
  return gulp.src(stylesheets)
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('build-js', function() {
  return gulp.src(javascript)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
});

gulp.task('build', ['build-js', 'build-css']);

gulp.task('default', ['build-js', 'build-css']);
