/*
* 定义student的模型
* */
var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var stuSchema = new Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        default: "female"
    },
    address:String
});

//通过schema创建model,model是数据库集合
var StuModel= mongoose.model("stus",stuSchema);


module.exports=StuModel;