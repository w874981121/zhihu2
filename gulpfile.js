var gulp = require('gulp');

var connect = require('gulp-connect');

gulp.tack('webserver', function () {

    connect.server({

        livereload: true,

        port: 8088

    });

});

gulp.tack('default', ['webserver']);