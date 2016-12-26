var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var order = require('gulp-order');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('cleanRelease', function() {
   gulp.src('release', {read:false}).pipe(clean());
});

gulp.task('copyMain', function() {
    gulp.src('src/index.html').pipe(gulp.dest('release'));
    gulp.src('src/fonts/**/*').pipe(gulp.dest('release/fonts'));
    gulp.src('src/images/**/*').pipe(gulp.dest('release/images'));
    gulp.src('src/css/**/*').pipe(gulp.dest('release/css'));
    gulp.src('src/pages/**/*').pipe(gulp.dest('release/pages'));
    gulp.src('src/customlibs/**/*').pipe(gulp.dest('release/customlibs'));
});

gulp.task('minifyJS', function() {
    gulp.src('src/js/**/*.js')
        .pipe(order([
            "controllers/**/*.js",
            "main.js"
        ]))
        .pipe(concat('romcharm.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('release/js'))
});

gulp.task('connect', function() {
   connect.server({root:'src', port:8081});
});

gulp.task('connectRelease', function() {
    connect.server({root:'release', port:8081});
});

gulp.task('reload', function() {
    gulp.src('src/**/*').pipe(connect.reload());
});

gulp.task('reloadRelease', function() {
    gulp.src('release/**/*').pipe(connect.reload());
});

gulp.task('watchDev', function() {
    gulp.watch('src/**/*', ['reload']);
});

gulp.task('watchRelease', function ()  {
    gulp.watch('release/**/*', ['reloadRelease']);
});


gulp.task('build', ['copyMain']);

gulp.task('devDeploy', ['connect', 'watchDev']);

gulp.task('releaseBuild', ['copyMain' , 'minifyJS']);

gulp.task('releaseDeploy', ['copyMain' , 'minifyJS','connectRelease', 'watchRelease'])