/*
* 定义一个模块连接monogodb数据库
* 封装方法
* */

var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/custom', {useNewUrlParser: true});
mongoose.connection.once("open",function () {
    console.log("数据库连接成功")
});