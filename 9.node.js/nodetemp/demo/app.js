// 1.引入express框架模板
const express = require("express");
const myuser = require("./routes/userModule.js");
// 2.创建一个http服务器，使用express对象的同名方法来创建服务器
const app = express();
// 配置日志信息,写在最前面
app.use(express.logger("dev"));

//添加获取POST数据请求的中间件
app.use(express.bodyParser());
//把非POST请求转换成post请求（put,delete）
app.use(express.methodOverride());

// 中间件
// app.use(function (req,res,next) {
//     console.log("中间件执行");
//     // 执行需求
//     next();
//     // 表示去执行下一个中间件，如果没有加next()，则用户的请求被强制终止；
// });
app.use(app.router);
// 3.配置服务器
app.use(express.static(__dirname+"/public"));
// app.use(app.router);
// 网页收藏小图标
app.use(express.favicon(__dirname+"/public/img/html5.png"));
//加载错误中间件,把错误信息输出到控制台
app.use(express.errorHandler());
// 找不到文件时，定义404
app.use(function (req,res,next) {
    // res.status(404).send("sorry");
    res.status("404").redirect("404.html");
});

// 4.设置端口
app.set("port",8002);
// 5.监听响应
app.listen(app.get("port"),function () {
    console.log("server is running,port 8002.")
});


app.get("/about.html",function (req,res,next) {
    res.redirect("index.html");
    // next();
// app.router配置在静态文件之后，不管next函数存在与否，都会执行about.html(因为静态文件传进去了)
// app.router配置在静态文件之前，不管next函数存在与否，都会执行index.html（因为地址没有传进去）
});
// 不能写括号，login不能带括号，因为是回调函数
// app.get("/login.do",myuser.login);

// 拦截post请求
app.post("/login.do",myuser.login);