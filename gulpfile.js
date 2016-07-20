var pkg = require('./package.json'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

//Directory Locations
var buildRoot = './public',
    resourceRoot = './src';


/**
 * CSS
 */
gulp.task('css', function () {
    gulp.src(resourceRoot + '/scss/main.scss')
        .pipe(sass())
        .pipe(minifycss({keepBreaks:true}))        
        .pipe(rename('style.css'))
        .pipe(gulp.dest(buildRoot + '/css'));
});


/**
 * JS
 */
gulp.task('js', function () {

    gulp.src(resourceRoot + '/js/main.js')
        .pipe(browserify({ debug: true }))
        .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(buildRoot + '/js/'));
});


/**
 * Defaults
 */
gulp.task('default', ['css', 'js']);

gulp.task('watch', function(){
    gulp.watch(resourceRoot + '/scss/**', ['css']);
    gulp.watch(resourceRoot + '/js/**', ['js']);
});
