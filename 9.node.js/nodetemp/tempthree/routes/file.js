"use strict";
const fs = require("fs");
const mysqlpool = require("./dbconfig.js");
const db = mysqlpool.sqlpool();
let file = {
    uploadFile:function (req,res) {
        console.log(req.files.myfile);
        // 1.在bodyParser()中添加参数
        // 2.设置临时文件
        let tempFile = req.files.myfile.path;
        // 3.设置目标文件
        let targetFile = "./public/upload/"+req.files.myfile.name;
         // 4. 从临时文件夹移动到目标文件夹
        // fs.rename(oldpath,newpath,callback);
        fs.rename(tempFile,targetFile,function (err,data) {
            if (err){
                throw err;
            } else {
                let imgUrl = "upload/"+req.files.myfile.name;
                let sql = "insert into user (uimgurl) values (?)";
                let arr = [imgUrl];
                console.log(arr);
                console.log(sql);
                db.connect(sql,arr,function (err,data) {
                    console.log(data);
                   if (!err){
                       res.send("文件上传成功");
                   }
                });
            }

        });
    },
    uploadPhoto:function (req,res) {
        //异步上传原理，利用nodejs stream(流),把文件变成二进制文件，流来进行传输
        //readStream(),writeStream()，类似于断点续传的原理
        console.log(req.files.myPhoto);
        //1.临时文件
        // let tempFile = req.files.myPhoto.path;表单对象的path
        let tempFile = req.files.myPhoto.ws.path;//写文件流中的path
       // 2.目标文件
        let targetFile = "./public/upload/"+req.files.myPhoto.name;
        // 3 使用fs模块的createReadStream(path)读取临时文件，使用
        //pipe()来连接createWriteStream(targetPath);实现文件的上传
        fs.createReadStream(tempFile).pipe(fs.createWriteStream(targetFile));
        // 4 删除临时文件
        fs.unlink(tempFile, (err) => {
            if (err) {
                throw err;
            }
            console.log('文件已删除');
        });

        res.send("upload/"+req.files.myPhoto.name);
    }

};
module.exports = file;