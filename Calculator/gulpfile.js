var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

//Uglify
gulp.task("js-compress", function() {
  return gulp.src("./working_files/scripts/script.js")
    .pipe(uglify())
    .pipe(gulp.dest("./public/scripts"));
});

gulp.task("js-compress-watch", ["js-compress"] ,function(done) {
  browserSync.reload();
  done();
})

//SCSS Compiler
gulp.task("sass", function() {
  return gulp.src("./working_files/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("./public/css"))
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
gulp.task("default", ["js-compress", "sass"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch("./working_files/scripts/script.js", ["js-compress-watch"]);
  gulp.watch("./working_files/scss/style.scss", ["sass-watch"]);
  gulp.watch("index.html", ["html-watch"]);
});
