var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    paths = gulp.paths;

gulp.task('watch', function () {
    livereload.listen({ start: true });

    gulp.watch([
        paths.styles.src
    ], ['styles']).on('change', changed);

    gulp.watch([
        paths.templates.src
    ], ['templateCache']).on('change', changed);

    function changed() {
        livereload.changed(paths.rootDir + '\\Index.html');
    }
});