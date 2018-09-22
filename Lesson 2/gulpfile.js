const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");
const jasmineBrowser = require("gulp-jasmine-browser");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

gulp.task("copy-html", () => {
  return gulp.src("index.html").pipe(gulp.dest("dist"));
});
gulp.task("copy-images", () => {
  return gulp.src("img/*").pipe(gulp.dest("dist/img"));
});
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
    .pipe(gulp.dest("dist/css"))
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

gulp.task("tests", () => {
  return gulp
    .src("tests/spec/extraSpec.js")
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 3001 }));
});

// concatenate javascript files
gulp.task("scripts", () => {
  return gulp
    .src("js/**/*.js")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist/js"));
});

// minify JS - only on production
gulp.task("scripts-dist", () => {
  return gulp
    .src("js/**/*.js")
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});

// done is the callback passed to signify asyn completion
gulp.task("dist", done => {
  gulp.parallel("copy-html", "copy-images", "styles", "lint", "scripts-dist")(
    done
  );
});

gulp.task("default", function() {
  gulp.watch("sass/**/*.scss", gulp.series("styles"));
  gulp.watch("js/*.js", gulp.series("lint"));
  gulp.watch("index.html", gulp.series("copy-html"));
  browserSync.init({ server: "dist" });
});

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log("default task function");
//   cb();
// }

// exports.default = defaultTask;
