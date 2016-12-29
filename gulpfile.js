var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var order = require('gulp-order');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace-task');
var merge = require('merge-stream');

var devConfig = require('./src/config/devConfig.json');
var releaseConfig = require('./src/config/releaseConfig.json');

gulp.task('clean', function() {
   var cleanBuild = gulp.src('build', {read:false}).pipe(clean());
   var cleanInter = gulp.src('inter', {read:false}).pipe(clean());
    return merge(cleanBuild, cleanInter);
});

gulp.task('copyMain', ['clean'],function() {
    var indexCopy = gulp.src('src/index.html').pipe(gulp.dest('build'));
    var fontsCopy = gulp.src('src/fonts/**/*').pipe(gulp.dest('build/fonts'));
    var imagesCopy = gulp.src('src/images/**/*').pipe(gulp.dest('build/images'));
    var cssCopy = gulp.src('src/css/**/*').pipe(gulp.dest('build/css'));
    var pagesCopy = gulp.src('src/pages/**/*').pipe(gulp.dest('build/pages'));
    var customCopy = gulp.src('src/customlibs/**/*').pipe(gulp.dest('build/customlibs'));
    return merge(indexCopy, fontsCopy, imagesCopy, cssCopy, pagesCopy, customCopy);
});

gulp.task('replaceDev', ['copyMain'], function() {
    var tempCopy = gulp.src('src/js/controllers/**/*').pipe(gulp.dest('inter/js/controllers/'));
    var tempCopyTwo = gulp.src('src/js/*.js').pipe(gulp.dest('inter/js/'));

    var rename = gulp.src('src/js/config/app-config.js')
        .pipe(replace({
            patterns : [
                {
                    match : 'apiUrl',
                    replacement : devConfig.apiUrl
                }
            ]
        }))
        .pipe(gulp.dest('inter/js/config/app-config.js'));
    return merge(tempCopy, tempCopyTwo, rename);
});

gulp.task('replaceRelease', ['copyMain'] ,function() {
    var tempCopy = gulp.src('src/js/controllers/**/*').pipe(gulp.dest('inter/js/controllers/'));
    var tempCopyTwo = gulp.src('src/js/*.js').pipe(gulp.dest('inter/js/'));

    var rename = gulp.src('src/js/config/app-config.js')
        .pipe(replace({
            patterns : [
                {
                    match : 'apiUrl',
                    replacement : releaseConfig.apiUrl
                }
            ]
        }))
        .pipe(gulp.dest('inter/js/config/app-config.js'));

    return merge(tempCopy, tempCopyTwo, rename);
});

gulp.task('minifyJSRelease', ['replaceRelease'], function() {
    return gulp.src('inter/js/**/*.js')
        .pipe(order([
            "config/**/*.js",
            "controllers/**/*.js",
            "main.js"
        ]))
        .pipe(concat('romcharm.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('minifyJSDev', ['replaceDev'], function() {
    return gulp.src('inter/js/**/*.js')
        .pipe(order([
            "config/**/*.js",
            "controllers/**/*.js",
            "main.js"
        ]))
        .pipe(concat('romcharm.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('connect', function() {
   connect.server({root:'src', port:8081});
});

gulp.task('connectBuild', function() {
    connect.server({root:'build', port:8081});
});

gulp.task('reloadDev', ['minifyJSDev'],function() {
    gulp.src('src/**/*').pipe(connect.reload());
});

gulp.task('reloadBuild', ['minifyJSRelease'], function() {
    gulp.src('build/**/*').pipe(connect.reload());
});

gulp.task('watchDev', function() {
    gulp.watch('src/**/*', ['reloadDev']);
});

gulp.task('watchBuild', function ()  {
    gulp.watch('build/**/*', ['reloadBuild']);
});


gulp.task('deployDev', ['connectBuild', 'watchDev']);

gulp.task('buildDev', ['minifyJSDev']);
gulp.task('buildRelease', ['minifyJSRelease']);

gulp.task('deployBuild', ['connectBuild', 'watchBuild'])