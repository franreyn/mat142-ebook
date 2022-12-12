const gulp = require("gulp");
const pug = require("gulp-pug");

// Default
gulp.task("default", async () => {
  return console.log("Hello human");
});

// Compile main theme pug files
gulp.task("pug", async () => {
  return gulp.src("src/**/*.html")
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest("dist/"));
});

gulp.task("css", async () => {
  return gulp.src("src/_utils/styles.css")
  .pipe(gulp.dest("dist/_utils"));
});

gulp.task("js", async () => {
  return gulp.src("src/_utils/scripts.js")
  .pipe(gulp.dest("dist/_utils"));
});