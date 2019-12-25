var gulp = require('gulp');

var connect = require('gulp-connect');

gulp.task('webserver', function () {
    connect.server({
        host:"0.0.0.0",
        livereload: true,
        directoryListing: true,
        open: true,
        port: 80

    });
});

gulp.task('default', gulp.series(gulp.parallel('webserver')));