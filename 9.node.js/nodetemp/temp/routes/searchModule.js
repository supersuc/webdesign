"use strict";
const mysqlpool = require("./dbconfig.js");
const db = mysqlpool.sqlpool();
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