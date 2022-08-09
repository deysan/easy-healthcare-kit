import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import del from 'del';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-dart-sass';
import squoosh from 'gulp-libsquoosh';
import terser from 'gulp-terser';

// Clean

const clean = () => {
  return del('build');
};

// Copy

const copy = () => {
  return gulp
    .src(['src/fonts/*.{woff2,woff}', 'src/*.ico'], {
      base: 'src'
    })
    .pipe(gulp.dest('build'));
};

// Styles

export const styles = () => {
  return gulp
    .src('src/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: ['node_modules']
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// Scripts

const scripts = () => {
  return gulp.src('src/js/*.js').pipe(terser()).pipe(gulp.dest('build/js'));
};

// Images

const images = () => {
  return gulp
    .src('src/img/**/*.{jpg,png,svg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

// Html

const html = () => {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch('src/sass/**/*.scss', gulp.series(styles));
  gulp.watch('src/js/script.js', gulp.series(scripts, reload));
  gulp.watch('src/*.html', gulp.series(html, reload));
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    open: true,
    ui: false
  });
  watcher();
  done();
};

// Build

export const build = gulp.series(clean, copy, styles, scripts, images, html);

// Export

export default gulp.series(build, server);
