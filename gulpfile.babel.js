const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const minifyCss = require('gulp-clean-css');
const mode = require('gulp-mode')();
const angularTemplateCache = require('gulp-angular-templatecache');
const gulpif = require('gulp-if');
const minifyHtml = require('gulp-minify-html');

const server = require('browser-sync').create();

const configuration = {
  paths: {
    src: {
      js: [
        'node_modules/sweetalert2/dist/sweetalert2.all.js',
        'node_modules/jquery/dist/jquery.slim.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-flash-alert/dist/angular-flash.js',
        'env.js',
        'angularTemplateCache.js',
        'app.js',
        'services/*.js',
        'app.states.js',
        'app.config.js',
        'views/**/*.js',
        'misc/*.js',
        'app.run.js'
      ],
      scss: ['_variables.scss', 'common.scss', 'index.scss', 'views/**/*.scss'],
      css: ['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/font-awesome/css/font-awesome.css'],
      htmlTemplates: ['views/**/*.html'],
      staticFiles:[
        '**/*.{png,jpeg,jpg,svg}',
        '**/*.{eot,svg,ttf,woff,woff2,otf}',
        '!node_modules/**/*',
        '!docs/**/*',
        'node_modules/font-awesome/**/*.{eot,svg,ttf,woff,woff2,otf}',
        'favicon.ico',
      ],
    },
  }
}

function bundleCss() {
  return gulp.src([...configuration.paths.src.scss, ...configuration.paths.src.css])
    .pipe(gulpif(/[.]scss$/, sass().on('error', sass.logError)))
    .pipe(mode.production(minifyCss()))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('docs/css'));
}

function bundleJs() {
  return gulp
    .src(configuration.paths.src.js)
    .pipe(plumber({
      errorHandler: notify.onError({
        message: 'Error'
      })
    }))
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    .pipe(mode.production(sourcemaps.init()))
    .pipe(mode.production(uglify({ output: { comments: false }})))
    .pipe(mode.production(sourcemaps.write('.')))
    .pipe(gulp.dest('docs'))
}

function createAngularTemplateCache() {
  return gulp.src(configuration.paths.src.htmlTemplates, { base: __dirname })
    .pipe(minifyHtml())
    .pipe(angularTemplateCache('angularTemplateCache.js', { standalone: true }))
    .pipe(gulp.dest('.'));
}

function copyFiles() {
  return gulp.src(configuration.paths.src.staticFiles)
    .pipe(gulp.dest('docs'))
}

function minifyIndex() {
  return gulp.src('index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('docs'));
}

function reload() {
  server.reload();
}

function watch(){
  gulp.watch('index.html');
  gulp.watch(configuration.paths.src.htmlTemplates, createAngularTemplateCache);
  gulp.watch(configuration.paths.src.js, gulp.series(bundleJs));
  gulp.watch(configuration.paths.src.scss, bundleCss);
  reload();
}

function serve(){
  server.init({
    server: "docs",
    middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    },
    cors: true
  });

  watch();
}


exports.build = gulp.parallel(gulp.series(createAngularTemplateCache, bundleJs), minifyIndex, bundleCss, copyFiles);
exports.dev = gulp.series(exports.build, serve);
exports.default = exports.build;