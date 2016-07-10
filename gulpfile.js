var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    fork = require('child_process').fork,
    open = require('gulp-open'),
    serverHelper;

gulp.paths = {
    templates: {
        src: './templates/*.html',
        dest: './Scripts/'
    },
    styles: {
        src: './Styles/scss/*.scss',
        dest: './Styles/css/'
    },
    rootDir: __dirname
};

require('require-dir')('./gulp');

gulp.task('serve', function (msg) {
    serverHelper = fork('static-server.js');

    serverHelper.on('message', function (msg) {
        if (msg !== 'done') {
            return;
        }

        gulp.src('./Index.html')
            .pipe(open({
                uri: 'http://localhost:1080',
                app: 'chrome'
            }));
    });

    runSequence(['templateCache', 'styles', 'watch']);
});

gulp.task('run', function () {
    runSequence(['templateCache', 'styles', 'watch']);
});