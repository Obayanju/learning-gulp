const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");

// this task is just a function
gulp.task("styles", function() {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        browsers: ["last 2 version"]
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("lint", () => {
  return (
    gulp
      .src("js/*.js")
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

gulp.task("default", function() {
  gulp.watch("sass/**/*.scss", gulp.series("styles"));
  gulp.watch("js/*.js", gulp.series("lint"));
  browserSync.init({ server: "./" });
});

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log("default task function");
//   cb();
// }

// exports.default = defaultTask;
