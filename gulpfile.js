"use strict";

const fractal = require("./fractal.js");
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");

// --------------------------------------------------------
// Configuration
// --------------------------------------------------------

const themeName = "wndrs";
const webroot = "web";

const paths = {
  // webroot: `${__dirname}/${webroot}`,
  // build: `${__dirname}/${webroot}/themes/custom/${themeName}/build`,
  theme: `${__dirname}`,
  docs: `${__dirname}/docs`,
  components: `${__dirname}/components`,
  modules: `${__dirname}/node_modules`,
  static: `${__dirname}/static`
};

const processors = [
  autoprefixer({
    browsers: [
      "last 2 version",
      "safari 9",
      "ie 11",
      "opera 12.1",
      "ios 9",
      "android 4"
    ]
  }),
  cssnano({
    options: {
      safe: true
    },
    autoprefixer: false,
    discardComments: {
      removeAll: true
    },
    colormin: true
  })
];

const sass_config = {
  includePaths: [
    `${paths.modules}`,
    `${paths.modules}/foundation-sites/scss/`,
    `${paths.components}`
  ]
};

const sass_custom_sources = [
  `${paths.theme}/**/*.scss`,
  `!${paths.theme}/sass/vendor/**/*`,
  `!${paths.theme}/sass/generated/**/*`,
  `!${paths.theme}/sass/templates/**/*`
];

// --------------------------------------------------------
// Styles
// --------------------------------------------------------

function theme_styles() {
  return gulp
    .src(`${paths.theme}/sass/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass(sass_config).on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(`${paths.static}/css`));
}

// --------------------------------------------------------
// Fractal Tasks
// --------------------------------------------------------

// Build static site
function build() {
  const builder = fractal.web.builder();

  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", err => logger.error(err.message));

  return builder.build().then(() => {
    logger.success("Fractal build completed!");
  });
}

// Serve dynamic site
function serve() {
  const server = fractal.web.server({
    sync: true
  });

  server.on("error", err => logger.error(err.message));

  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function copy_frontend_assets() {
  return gulp
    .src(`${paths.theme}/assets/**/*`)
    .pipe(gulp.dest(`${paths.static}/assets`));
}

// --------------------------------------------------------
// Watch
// --------------------------------------------------------

function watch() {
  serve();
  // gulp.watch(js_custom_sources, theme_scripts);
  gulp.watch(sass_custom_sources, theme_styles);
}

// --------------------------------------------------------
// Task sets
// --------------------------------------------------------

const compile = gulp.series(copy_frontend_assets, theme_styles);

gulp.task("start", gulp.series(compile, serve));
// gulp.task("static-styleguide", gulp.series(compile, build));
gulp.task("watch", gulp.series(compile, watch));
gulp.task("default", gulp.series(compile));
