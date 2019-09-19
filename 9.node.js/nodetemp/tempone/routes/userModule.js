"use strict";
const mysqlpool = require("./dbconfig.js");
const db = mysqlpool.sqlpool();

// module.exports.loginGet = function () {
//         let login = {
//             myLogin:function (req,res,next) {
//                 // 1.获取前台请求的数据
//                 let username = req.query.username;
//                 let password = req.query.password;
//                 let sql="select *from user where uname = ? and upassword = ?";
//                 let arr = [username,password];
//                 db.connect(sql,arr,function (err,data) {
//                     console.log(err);
//                     console.log(data);
//                     if (data.length>0 && data != undefined){
//                         // res.send(1+"");
//                         res.send("ok");//在ajax使用，必须返回一个字符串类型的值。
//                     }
//                 });
//             }
//         };
//         return login;
// };

module.exports.mysearch = function () {
    let usersearch = {
        search:function (req,res) {
            let name = req.body.username;
            let sex = req.body.sex;
            //"SELECT * FROM `user` WHERE 1=1 and uname='苏超' and sex='男'";
            let sql ="SELECT * FROM `user` WHERE 1=1";
            let arr = [];
            if (name != "" && name != undefined){
                sql += " and uname = ?";
            //     //模糊查询
            //     sql += " and uname like ?";
            //     //去掉两端空格
            //     name = name.trim();
            //     name = "%"+name+"%";
                arr.push(name);
            }
            if (sex !="" && sex != undefined){
                sql += " and sex= ?";
                arr.push(sex);
            }
            console.log(arr);
            console.log(sql);
            db.connect(sql,arr,function(err,data){
                console.log(err);
                console.log(data);
                if (data.length >0 && data != undefined){
                    res.send(data);
                } else {
                    res.send("fail");
                }
            });
        }
    };
    return usersearch;
};