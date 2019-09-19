"use strict";
const mysqlpool = require("./dbconfig.js");
const db = mysqlpool.sqlpool();
module.exports.myAdd = function () {
        let userAdd = {
            add:function (req,res) {
                let username = req.body.username;
                let password = req.body.password;
                let sex = req.body.sex;
                console.log(username);
                console.log(password);
                console.log(sex);

                db.connect("insert into user (uname,upassword,sex) values(?,?,?)",[username,password,sex],function (err,data) {
                    console.log(err);
                    console.log(data);
                    if(username == "")username = null;
                    if (password == "")password = null;
                    if (sex == "")sex = null;
                    if (err == null){
                        //null，插入数据成功
                        res.send(data);
                    }else {
                        res.send("添加失败");
                    }
                })
            }
        };
        return userAdd;
}