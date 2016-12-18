var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var connect = require('gulp-connect');

gulp.task('copyMain', function() {
    gulp.src('src/index.html').pipe(gulp.dest('release'));
    gulp.src('src/fonts/**/*').pipe(gulp.dest('release/fonts'));
    gulp.src('src/images/**/*').pipe(gulp.dest('release/images'));
    gulp.src('src/css/**/*').pipe(gulp.dest('release/css'));
    gulp.src('src/js/**/*').pipe(gulp.dest('release/js'));
    gulp.src('src/pages/**/*').pipe(gulp.dest('release/pages'));
});

//gulp.task('minifyJS', function() {
//    gulp.src('src/js/**/*.js').pipe(concat('romcharm.js')).pipe(minify()).pipe(gulp.dest('release/js'))
//});

gulp.task('connect', function() {
   connect.server({root:'src', port:8081});
});

gulp.task('reload', function() {
    gulp.src('src/**/*').pipe(connect.reload());
})

gulp.task('watchDev', function() {
    gulp.watch('src/**/*', ['reload']);
});

gulp.task('watchRelease', function ()  {
    gulp.watch('release/**/*', ['']);
});


gulp.task('build', ['copyMain']);

gulp.task('devDeploy', ['connect', 'watchDev']);