var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var order = require('gulp-order');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace-task');

var devConfig = require('./src/config/devConfig.json');
var releaseConfig = require('./src/config/releaseConfig.json');

gulp.task('clean', function() {
   gulp.src('build', {read:false}).pipe(clean());
   gulp.src('inter', {read:false}).pipe(clean());
});

gulp.task('copyMain', function() {
    gulp.src('src/index.html').pipe(gulp.dest('build'));
    gulp.src('src/fonts/**/*').pipe(gulp.dest('build/fonts'));
    gulp.src('src/images/**/*').pipe(gulp.dest('build/images'));
    gulp.src('src/css/**/*').pipe(gulp.dest('build/css'));
    gulp.src('src/pages/**/*').pipe(gulp.dest('build/pages'));
    gulp.src('src/customlibs/**/*').pipe(gulp.dest('build/customlibs'));
});

gulp.task('replaceDev', function() {
    gulp.src('src/js/controllers/**/*').pipe(gulp.dest('inter/js/controllers/'));
    gulp.src('src/js/*.js').pipe(gulp.dest('inter/js/'));

    gulp.src('src/js/config/app-config.js')
        .pipe(replace({
            patterns : [
                {
                    match : 'apiUrl',
                    replacement : devConfig.apiUrl
                }
            ]
        }))
        .pipe(gulp.dest('inter/js/config/app-config.js'));
});

gulp.task('replaceRelease', function() {
    gulp.src('src/js/controllers/**/*').pipe(gulp.dest('inter/js/controllers/'));
    gulp.src('src/js/*.js').pipe(gulp.dest('inter/js/'));

    gulp.src('src/js/config/app-config.js')
        .pipe(replace({
            patterns : [
                {
                    match : 'apiUrl',
                    replacement : releaseConfig.apiUrl
                }
            ]
        }))
        .pipe(gulp.dest('inter/js/config/app-config.js'));
});

gulp.task('minifyJS', function() {
    gulp.src('inter/js/**/*.js')
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

gulp.task('reload', function() {
    gulp.src('src/**/*').pipe(connect.reload());
});

gulp.task('reloadBuild', function() {
    gulp.src('build/**/*').pipe(connect.reload());
});

gulp.task('watchDev', function() {
    gulp.watch('src/**/*', ['reload']);
});

gulp.task('watchBuild', function ()  {
    gulp.watch('build/**/*', ['reloadBuild']);
});


gulp.task('deployDev', ['connect', 'watchDev']);

gulp.task('buildRelease', ['copyMain' , 'replaceRelease', 'minifyJS']);
gulp.task('buildDev', ['copyMain' , 'replaceDev', 'minifyJS']);

gulp.task('deployBuild', ['connectBuild', 'watchBuild'])