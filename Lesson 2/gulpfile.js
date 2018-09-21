const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

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
    .pipe(gulp.dest("./css"));
});

gulp.watch("sass/**/*.scss", gulp.series("styles"));

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log("default task function");
//   cb();
// }

// exports.default = defaultTask;
