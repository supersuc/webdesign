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
//有了model，就可以实现对数据的curd操作
/*
* 1.create创建文档
* Model.create(doc(s),callback(Fn))
* 2.find文档
* Model.find(conditions,{projection},options,callback);
* conditions:查询条件
* projection：投影,需要获取的字段
* -{name:1,_id:0}
* -"name -_id"
* options：查询选项
* callback：回调查询结果
* -findOne:返回的是一个具体的对象，不是数组
* -findById:更具ID找到数据，返回一个对象
* 3.修改
* Model.update(conditions,{projection},options,callback);
* Model.updateMany(conditions,{projection},options,callback);
* Model.updateOne(conditions,{projection},options,callback);
* Model.replaceOne(conditions,{projection},options,callback);
* conditions:查询条件
* doc:修改后的对象
* options：配置参数
* callback：回调查询结果
* 4.删除
* Model.remove(conditions,{callback});
* Model.deleteOne(conditions,{callback});
* Model.deleteMany(conditions,{callback});
* */

// StuModel.find({name:"suchao"},function (err,docs) {
//     if (!err){
//         console.log(docs[0].age);//返回的是一个数组
//     }
// });

// StuModel.find({},{name:1,_id:0} ,function (err,docs) {
//     if (!err){
//         console.log(docs);//返回的是一个数组
//     }
// });

// StuModel.find({},"name age -_id" ,function (err,docs) {
//     if (!err){
//         console.log(docs);//返回的是一个数组
//     }
// });

// StuModel.find({},"name age -_id",{skip:2,limit:1} ,function (err,docs) {
//     if (!err){
//         console.log(docs);//返回的是一个数组
//     }
// });

// StuModel.updateOne({name:"suchao"},{$set:{age:88}},function (err) {
//     if (!err){
//         console.log("修改成功")
//     }
// });

// StuModel.remove({name:"super"},function (err) {
//     if (!err){
//          console.log("删除成功")
//             }
// });
//统计数量
StuModel.countDocuments({name:"suchao"},function (err,count) {
    if (!err){
        console.log(count);
    }
});