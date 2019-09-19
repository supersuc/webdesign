const gulp = require("gulp")
    ,del = require("del")
    ,gulpConnect = require("gulp-connect")
    ,browserSync = require("browser-sync")
    ,concat = require("gulp-concat")
    ,rename = require("gulp-rename")
    ,cheerio = require("gulp-cheerio")
    ,uglify =require("gulp-uglify")
    ,cleancss =require("gulp-clean-css")
    ,imagemin =require("gulp-imagemin")
    ,less =require("gulp-less")
    ,autoprefixer =require("gulp-autoprefixer")
    ,fileinclude =require("gulp-file-include");
//html修改
gulp.task("gulpHtml",function () {
    return gulp.src("./src/public/*.html")
        .pipe(gulp.dest("./dist/public"))
        // .pipe(gulpConnect.reload());//gulp-connect创建服务器时使用的
        .pipe(browserSync.stream());//browser-sync创建服务器时使用方法，自动刷新
});
//css修改
gulp.task("gulpCss",function () {
    return gulp.src("./src/public/css/*.css")
        .pipe(gulp.dest("./dist/public/css/"))
        // .pipe(gulpConnect.reload());
        .pipe(browserSync.stream());
});
//js修改
gulp.task("gulpJs",function () {
    return gulp.src(["./src/public/js/*.js","./src/public/js/**/*.js"])
        .pipe(gulp.dest("./dist/public/js/"))
        // .pipe(gulpConnect.reload());
        .pipe(browserSync.stream());
});
//删除html文件
//版本更新的时候
gulp.task("delHtml",function () {
    del("./dist/public/*.html");
});
//监听文件改变
gulp.task("watchFile",function () {
    gulp.watch("./src/public/*.html",gulp.series("gulpHtml"));
    gulp.watch("./src/public/css/*.css",gulp.series("gulpCss"));
    gulp.watch("./src/public/js/*.js",gulp.series("gulpJs"));
});
//gulp-connect 搭建简单的静态资源服务器
// gulp.task("server",function () {
//     gulpConnect.server({
//         root:"./dist/public/",
//         livereload:true,
//         port:8181
//     });
// });

//browser-sync插件，实现自动刷新，多窗口刷新，包括移动端的手机浏览器
/*
*全局安装：npm install -g browser-sync
* 本地安装:npm install --save-dev browser-sync
* require()
* 创建任务，搭建服务器
* 调用init（）
* 对应的任务中加上管道.pipe(browserSync.stream());
*  * */
gulp.task("server",function () {
    browserSync.init({
        file:["./dist/public/css/*.css","./dist/public/js/*.js"],
        server:{
            baseDir:"./dist/public/"//服务器的目录
        }
    });
    //可以代替上面的管道自动刷新
    // gulp.watch(["./dist/public/*.html"]).on("change",browserSync.reload);
});

//default
gulp.task("default",gulp.series(gulp.parallel("server","watchFile")));

/*
*gulp插件
* gulp-concat:文件合并
* gulp-rename:重命名文件
* gulp-cheerio:改变文件link
* gulp-uglify:文件压缩，主要是js文件
* gulp-clean-css:压缩css文件
* gulp-imagemin:图片压缩
* gulp-file-include:静态页面可以使用页面模块
* gulp-less:编译less
* gulp-autoprefixer:css自动加前缀
* gulp-file-include:添加文件模块
*
* **/
//插件应用
gulp.task("concatJs",function () {
    return gulp.src("./src/public/js/*.js")
        .pipe(concat("all.js"))
        .pipe(rename("all-1.js"))
        .pipe(gulp.dest("./dist/public/js"));
});
gulp.task("cheerio",function () {
    //去掉指定资源中的连接
    return gulp.src("./dist/public/*.html")
        .pipe(cheerio(function ($) {
            //简化版的jq
            $("script").remove();
            $("body").append("<script src='js/all-1.js'>")
        }))
        .pipe(gulp.dest("./dist/public/"))
});
gulp.task("uglifyJs",function () {
    return gulp.src("./src/public/js/*.js")
        .pipe(concat("all-2.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"));
});
gulp.task("cleanCss",function () {
    return gulp.src("./src/public/css/*.css")
        .pipe(concat("all-3.css"))
        //兼容ie7+以上的版本
        //普通版本，高级用法(level)
        .pipe(cleancss({
            compatibilty:"ie",
            advanced:false,//是否开启高级优化(合并选择器)
            keepBreaks:true,//是否保留换行
            format:"keep-breaks",
            keepSpecialComments:"*"//保留所有特殊前缀，当autoprefixer生成时，可能删除部分前缀
        }))
        .pipe(gulp.dest("./dist/public/css"))
});
gulp.task("imagemin",function () {
    return gulp.src("./src/public/images/*.*")
        .pipe(imagemin(
            // {
        //     interlaced: true,//是否隔行扫描gif进行渲染
        //     progressive: true,//是否无损压缩jpg图片
        //     optimizationLevel: 5,//优化等级
        //     svgoPlugins: [{removeViewBox: true}]//在优化svg不移除它的viewbox属性
        //
        // }
        ))
        .pipe(gulp.dest("./dist/public/images/"))
});
gulp.task("less",function () {
    return gulp.src("./src/public/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/public/css/"))
});
gulp.task("autoprefixer",function () {
    return gulp.src("./src/public/less/*.less")
        .pipe(less())
        .pipe(autoprefixer(
            {
                browsers: ["last 20 versions"],//指定版本
                cascade:false,//是否美化属性
                remove:true //是否去掉多余的前缀
            }
        ))
        .pipe(gulp.dest("./dist/public/css/"))
});
gulp.task("fileinclude",function () {
    return gulp.src("./src/public/index.html")
        .pipe(fileinclude(
            {
                    prefix:"@@",
                    basepath:"@file"
                }
        ))
        .pipe(gulp.dest("./dist/public/"))
});

