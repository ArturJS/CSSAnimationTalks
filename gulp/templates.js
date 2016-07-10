var gulp = require('gulp'),
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence = require('run-sequence'),
    paths = gulp.paths;

gulp.task('templateCache', function (done) {
    runSequence('cleanTemplates', 'buildTemplates', done);
});

gulp.task('cleanTemplates', function () {
    return del([paths.templates.dest + '/templates.js']);
});

gulp.task('buildTemplates', function () {
    return gulp.src(paths.templates.src)
            .pipe(templateCache({
                standalone: true
            }))
            .pipe(gulp.dest(paths.templates.dest));
});