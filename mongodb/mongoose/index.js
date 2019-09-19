require("./tools/conn_mongo.js");
var student=require("./models/student.js");
student.find({},function (err,docs) {
    if(!err){
        console.log(docs);
    }
});


