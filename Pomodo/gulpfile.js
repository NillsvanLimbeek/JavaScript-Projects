var gulp = require("gulp");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var scss = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

//JavaScript Task
gulp.task("js", function() {
  return gulp.src("./working_files/scripts/script.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(babel({ presets: ["env"] }))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/scripts"));
});

//SCSS Task
gulp.task("scss", function() {
    return gulp.src("./working_files/scss/style.scss")
      .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
        .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./public/css"));
});

//JavaScript Watch
gulp.task("js-watch", ["js"], function(done) {
  browserSync.reload();
  done();
});

//SCSS Watch
gulp.task("scss-watch", ["scss"], function(done) {
  browserSync.reload();
  done();
});

//HTML Watch
gulp.task("html-watch", function(done) {
  browserSync.reload();
  done();
});

//Default Task
gulp.task("default", ["js", "scss"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })

  gulp.watch("./working_files/scripts/script.js", ["js-watch"]);
  gulp.watch("./working_files/scss/style.scss", ["scss-watch"]);
  gulp.watch("index.html", ["html-watch"]);
});
