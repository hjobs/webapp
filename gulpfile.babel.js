import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';
// import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import stripDebug from 'gulp-strip-debug';

const paths = {
  bundle: 'app.js',
  entry: 'src/Index.js',
  srcCss: 'src/**/*.scss',
  srcImg: 'resources/**',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  srcFontAwesome: 'src/styles/font-awesome/**/*',
  dist: 'build',
  distJs: 'build/js',
  distImg: 'build/resources',
  distDeploy: './build/**/*',
  distFontAwesome: 'build/styles/font-awesome'
};

const customOpts = {
  entries: [paths.entry],
  debug: true,
  cache: {},
  packageCache: {}
};

const opts = Object.assign({}, watchify.args, customOpts);

function swallowError(error) {
  // If you want details of the error in the
  // http://stackoverflow.com/questions/23971388/prevent-errors-from-breaking-crashing-gulp-watch
  console.log(error.toString());
  this.emit('end');
}

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './'
    },
    browser: 'google chrome'
  });
});

gulp.task('watchify', () => {
  const bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({ stream: true }));
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.entry, { debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(stripDebug())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
  .pipe(sass().on('error', sass.logError))
  .pipe(rename({ extname: '.css' }))
  .pipe(sourcemaps.init())
  .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist))
  .pipe(reload({ stream: true }));
});

gulp.task('fontAwesome', () => {
  gulp.src(paths.srcFontAwesome)
  .pipe(gulp.dest(paths.distFontAwesome));
});

gulp.task('htmlReplace', () => {
  gulp.src('index.html')
  .pipe(htmlReplace({
    css: './styles/main.css?version=20170419v1',
    // bootstrap: 'styles/bootstrap.css',
    js: './js/app.js?version=20170419v1',
    browserSync: '' }))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLint)
  .pipe(eslint())
  .pipe(eslint.format())
  .on('error', (error) => swallowError(error));
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcLint, ['lint']);
});

gulp.task('deploy', () => {
  gulp.src(paths.distDeploy)
    .pipe(ghPages());
});

gulp.task('watch', cb => {
  runSequence('clean', [
    'browserSync',
    'watchTask', 'watchify', 'styles', 'fontAwesome', 'lint', 'images'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'styles', 'fontAwesome', 'htmlReplace', 'images'], cb);
});
