//引入express框架
const express = require("express");
//通过express同名方法创建一个http服务器
const app = express();
//配置服务器
app.configure(
    function () {
        //生成服务器日志信息
        app.use(express.logger("dev"));
        //express.static()设置静态资源的目录，__dirname,表示项目根目录
        app.use(express.static(__dirname+"/public"));
        app.use(express.favicon(__dirname+"/public/image/1.jpg"));
        //加载错误中间件，把错误信息输出到控制台
        app.use(express.errorHandler());
    });



app.set("port",8080);
// app.listen(8080,function () {
//     console.log("server is running")
// });
app.listen(app.get("port"),function () {
    console.log("server is running")
});
