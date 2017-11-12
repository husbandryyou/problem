var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var connect = require('gulp-connect');
gulp.task('httpserver', function () {
    connect.server({
        port: 8888,
        host: 'localhost',
        livereload: true
    });
});
gulp.task('refresh', function () {
    gulp.src('.').pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch('./index.html', ['refresh']);
});
gulp.task('webserver', function () {
    gulp.src('.').pipe(webserver({
        port: 9999,
        host: 'localhost',
        middleware: function (req, res, next) {
            var obj = url.parse(req.url);
            res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(obj.pathname);
            if (obj.pathname === '/') {
                res.end(fs.readFileSync('./index.html'));
            } else if (obj.pathname === '/getD') {
                res.end(fs.readFileSync('./data.json'));
            }
        }
    }));
});
gulp.task('default', ['httpserver', 'watch', 'webserver']);
