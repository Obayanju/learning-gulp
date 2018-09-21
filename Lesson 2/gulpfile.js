const gulp = require("gulp");
const sass = require("gulp-sass");

// this task is just a function
gulp.task("styles", function(done) {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("./css"));
});

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log("default task function");
//   cb();
// }

// exports.default = defaultTask;
