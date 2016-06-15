var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//aux function to convert a file to an array of strings
function fileToArray(file){
  var array = fs.readFileSync(file).toString().split("\n");
  for (i in array) {
    var aux = array[i].trim();
    if (aux != ""){
      array[i] = aux;
    }
  }
  return array;
}

//get our list of javascript assets from javascript.assets
var javascript = fileToArray('javascript.assets');

//get our list of css assets from css.assets
var stylesheets =  fileToArray('css.assets');

//build css by concatenating all assets into one file and cleaning it (app.css)
gulp.task('build-css', function() {
  return gulp.src(stylesheets)
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

//build javascript by concatenating and minificating all assets into one file (app.js)
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
