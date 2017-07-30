var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

//Uglify
gulp.task("js", function() {
  return gulp.src("./working_files/scripts/script.js")
    .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['env'] }))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/scripts"));
});

gulp.task("js-watch", ["js"] ,function(done) {
  browserSync.reload();
  done();
})

//SCSS Compiler
gulp.task("sass", function() {
  return gulp.src("./working_files/scss/style.scss")
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: "false" }))
      .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"));
});

gulp.task("sass-watch", ["sass"], function(done) {
  browserSync.reload();
  done();
})

//HTML watch
gulp.task("html-watch", function() {
  browserSync.reload();
  done();
})

//Default
gulp.task("default", ["js", "sass"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch("./working_files/scripts/script.js", ["js-watch"]);
  gulp.watch("./working_files/scss/style.scss", ["sass-watch"]);
  gulp.watch("index.html", ["html-watch"]);
});
