var gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    open = require('gulp-open'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    port=process.env.port || 3031;
gulp.task('browserify',function () {
    var bundler=browserify({
    	entries      : ['./src/js/components/main.jsx'],
    	transform    : [reactify],
    	extensions   : ['.jsx'],
    	debug        : true,
    	cache:{},packageCache:{},fullPaths: true
    });
    return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
});
// launch browser in a port
gulp.task('open',function () {
  var options={
    url: 'http://localhost:'+port,
  };
  gulp.src('./index.html')
      .pipe(open('',options));
});

// live reload server

gulp.task('connect',function () {
  connect.server({
    // root: './',
    port: port,
    livereload: true
  });
});

// live reload js

gulp.task('js',function () {
  gulp.src('./dist/js/*.js')
      .pipe(connect.reload());
});

// live reload html
gulp.task('html',function () {
  gulp.src('index.html')
      .pipe(connect.reload());
});
// watch files for live reload

gulp.task('watch',function () {
  gulp.watch('dist/js/*.js',['js']);
  gulp.watch('index.html',['html']);
  gulp.watch('src/js/**/*.jsx',['browserify']);
});
gulp.task('default',['browserify']);
gulp.task('serve',['browserify','connect','open','watch']);
