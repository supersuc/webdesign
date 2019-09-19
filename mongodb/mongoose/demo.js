 const mongoose = require("mongoose");
 mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true});
 mongoose.connection.once("open",function () {
    console.log("数据库连接成功");
});

//Schema创建对象
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
 var StuModel= mongoose.model("student",stuSchema);
 //向数据库中插入一个文档
 // StuModel.create(doc,function () {});
 StuModel.create({
     name:"babytt",
     age:23,
     address: "China"
 },function (err) {
     if (!err){
         console.log("插入成功");
     }
 });