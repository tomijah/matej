var gulp = require('gulp'),
typescript = require('gulp-typescript'),
webserver = require('gulp-webserver'),
sass = require('gulp-sass');

gulp.task('typescript', function () {
    return gulp.src(['app/**/*.ts', 'typings/browser.d.ts'])
        .pipe(typescript({
            module: 'amd'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['typescript', 'sass'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true
    }));
});