//引入gulp及gulp插件

const gulp = require("gulp");
const del = require("del");


gulp.task("gulpHtml",function () {
    // 构建一个文件到目标目录下面
    return gulp.src("./src/public/index.html")
    //pipe()管道，可以连接执行gulps输出的指令
        .pipe(gulp.dest("./dist/public"));
});
gulp.task("gulpJs",function () {
    // 构建多个文件到目标目录
    return gulp.src("./src/public/js/*.js")
        .pipe(gulp.dest("./dist/public/js/"));
});
//构建指定的文件到目标目录
gulp.task("gulpMulImg",function () {
    return gulp.src("./src/public/images/*.{png,jpg,gif}")
        .pipe(gulp.dest("./dist/public/images/"));
});
//构建指定的文件名称到目标目录
gulp.task("gulpMulFile",function () {
    return gulp.src("./src/public/js/[a,b].js")
        .pipe(gulp.dest("./dist/public/js"));
});
//排除
gulp.task("gulpLimit",function () {
    return gulp.src(["./src/public/js/*.js","!./src/public/js/a.js"])
        .pipe(gulp.dest("./dist/public/js"));
});
//构建多个目录下的文件(**表示多个目录，*表示多个文件)
gulp.task("mulDirJsFile",function () {
    return gulp.src("./src/public/**/*.js")
        .pipe(gulp.dest("./dist/public/"));
});

/*
* 1.指定文件
* 2.*：任意文件
* 3.**：多个目录
* 4.{}：表示多种文件扩展名
* 5.[]:表示多文件
* 6.!:在[]中，排除指定文件
 */

//安装del插件 npm install del --save-dev
// const del =require("del");
gulp.task("delJs",function (done) {
    del("./dist/public/js/*.js");
    done();
});
//删除文件的范围，在新建的时候有目录影响
// gulp.task("newGulpJs",function () {
//     del("./dist/public/js/*.js");
//     return gulp.src("./src/public/js/*.js")
//         .pipe(gulp.dest("./dist/public/js/"));
// });
//注入函数的优先性(也可以多个任务，先后顺序)
gulp.task("newGulpJs",gulp.series(["delJs"],function () {
        return gulp.src("./src/public/js/*.js")
            .pipe(gulp.dest("./dist/public/js/"));
}));

//当执行gulp时，默认执行的是default任务
// gulp.task("default",gulp.series(["gulpHtml","gulpJs","gulpMulImg"],function (done) {
//     console.log(111);
//     done();
// }));

gulp.task("delAll",function (done) {
    del("./dist/public/");
    done();
});
gulp.task("defaultWatch",function () {
    gulp.watch("./src/public/js/*.js",gulp.series(["delJs","gulpJs"]));
    gulp.watch("./src/public/*.html",gulp.series(["gulpHtml"]));
});