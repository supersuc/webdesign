/*
* document和集合中的文档一一对应，document是model的实例
*   通过model查询document
* */

//创建一个document

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

var stu = new StuModel({
    name:"China",
    age:70,
    gender: "male",
    address: "中国"
});

/*
* document的方法
* model#save({options},{fn});
* */
// stu.save(function () {
//     console.log("保存成功");
// });
// console.log(stu);

StuModel.findOne({},function (err,doc) {
    if (!err){
        //1.
        // doc.update({$set:{age:100}},function (err) {
        //     if (!err){
        //         console.log("修改成功");
        //     }
        // });
        //2.
        // doc.age=99;
        // doc.save();
    //删除操作
        // doc.remove(function (err) {
        //     if (!err){
        //         console.log("删除成功");
        //     }
        // });

        //直接获取文档中的指定属性值get(name)
        // console.log(doc.get(name));
        // console.log(doc.name);
        //设置属性
        // doc.set("name","xxx");//不会改变数据库中的值，因为没有save连接
        // doc.name="xxx";

        //JSON对象
        var json=JSON.stringify(doc);
        console.log(json);
        //toObject()
        // doc=doc.toObject();
        // delete doc.address;
        // console.log(doc._id);
    }
});

/*
* update(update,{options},callback);
* */