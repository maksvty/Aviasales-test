import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

const sass = gulpSass(dartSass);

const styles = () => {
    return gulp.src('src/sass/style.scss', { sourcemaps: true })
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('src/css', { sourcemaps: '.' }))
        .pipe(browser.stream());
}

const server = (done) => {
    browser.init({
        server: {
            baseDir: 'src'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

// Watcher
const watcher = () => {
    gulp.watch('src/sass/**/*.scss', gulp.series(styles));
    gulp.watch('src/js/*.js').on('change', browser.reload);
    gulp.watch('src/*.html').on('change', browser.reload);
}

export default gulp.series(
    styles, server, watcher
);