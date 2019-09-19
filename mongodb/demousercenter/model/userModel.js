/*
* 定义模型
* 封装模型
* */
var mongoose=require("mongoose");
require("../db/index.js");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email:String,
    nick_name:String,
    password:String
});
//通过schema创建model,model是数据库集合
var userModel= mongoose.model("stus",userSchema);

module.exports=userModel;