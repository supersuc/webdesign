/*
* 定义模型
* 封装模型
* */
var mongoose=require("mongoose");
require("../db/index.js");
var Schema = mongoose.Schema;
var schema = new Schema({
    code:String,
    province: String,
    city:String,
    country:String,
    name:String,
    level:Number
});
//通过schema创建model,model是数据库集合
var cityModel= mongoose.model("cities",schema);

module.exports=cityModel;