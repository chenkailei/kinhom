const gulp = require("gulp");
const connect = require("gulp-connect");
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
 


const srclist = {
    "sass" : {
        "src" : "./*.scss",
        "dest" : "./style/"
    }
}

gulp.task('minify-css', () => {
    return gulp.src(srclist.sass.scr)
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(gulp.dest(srclist.css.dest));
  });

  gulp.task('sass', function () {
    return gulp.src(srclist.sass.src)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(srclist.sass.dest))
      .pipe(connect.reload())
  });


gulp.task("watch",() =>{
    gulp.watch("./*.scss",["sass"])
})

// gulp.task("bulid",["compress","minify-css"])

gulp.task("default",["watch"]);