const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clean', function () {
    return del(['dist', '.publish']);
});

gulp.task('deploy', function () {
    return gulp.src('./example/**/*')
        .pipe(ghPages());
});

gulp.task('build:js', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build:js', 'build:css']);