var gulp = require("gulp");
var gutil = require("gulp-util");
var babel = require("gulp-babel");
gulp.task('default',['js'],function(){
    console.log('gulp启动成功');//测试gulp是否启动
})
var uglify = require('gulp-uglify');
gulp.task('js',function(){
    gulp.src('src/*.js')
    //.pipe(babel({
    //            presets: ['es2015'] // es5检查机制 babel导致this变成void 0
    //}))
    .pipe(uglify())
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('distmin'))
    
});
