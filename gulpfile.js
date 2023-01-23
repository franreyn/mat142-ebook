const gulp = require("gulp");

// Default
gulp.task("default", async () => {
  return console.log("Hello human");
});

// compile html
gulp.task("html", async () => {
  return gulp.src("src/**/*.html")
  .pipe(gulp.dest("dist/"));
});


// compile css
gulp.task("css", async () => {
  return gulp.src("src/_utils/styles.css")
  .pipe(gulp.dest("dist/_utils"));
});

// compile js
gulp.task("js", async () => {
  return gulp.src("src/_utils/scripts.js")
  .pipe(gulp.dest("dist/_utils"));
});

gulp.task("build", gulp.series("html", "css", "js"));