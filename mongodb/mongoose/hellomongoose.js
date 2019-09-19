/*
* 1.安装插件
* npm i mongoose --save
* 2.引入mongoose
* const mongoose = require('mongoose');
* 3.连接数据库
*mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
*
* 4.断开数据库连接（一般不用）
* mongoose.disconnect();
*
*
*
* 监听mongodb数据库的连接状态
* -在mongodb对象中，有一个connection，表示数据库的状态
* 可以监听对象的状态，可以来监听数据库的连接与断开
*
* 监听连接状态
* mongoose.connection.once("open",function(){});
* 监听断开状态
* mongoose.connection.once("open",function(){});
*
* */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/suchao', {useNewUrlParser: true});
mongoose.connection.once("open",function () {
    console.log("数据库连接成功")
});

mongoose.connection.once("close",function () {
    console.log("数据库连接断开")
});

// 断开数据库连接/*
// Schema
//Model
// Document
// */
mongoose.disconnect();