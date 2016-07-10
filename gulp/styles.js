var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    paths = gulp.paths;

gulp.task('styles', function (done) {
    runSequence('cleanStyles', 'buildStyles', done);
});

gulp.task('cleanStyles', function () {
    return del([paths.styles.dest + '/allStyles.css']);
});

gulp.task('buildStyles', function () {
    return gulp.src(paths.styles.src)
            .pipe(sass({
                sourceMap: true,
                errLogToConsole: true
            }).on('error', sass.logError))
            .pipe(autoprefixer("last 3 version", "safari 5", "ie 9"))
            .pipe(concat('allStyles.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(paths.styles.dest));
});
