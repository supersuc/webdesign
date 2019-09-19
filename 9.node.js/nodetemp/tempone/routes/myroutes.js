"use strict";
let user = {
    login:function (req,res,next) {
        // post请求
        let username = req.body.username;
        let password = req.body.password;
        console.log(req.body);

        if (username == "suchao" && password =="123"){
            res.send("登录成功");
            // res.redirect("index.html");
        } else {
            res.send("登录失败");
            // res.redirect("login.html");
        }
    }
};
// 1.引入模块
// const mysql = require("mysql");
// const mysqlconfig = require("./config.js");
// const config = require("./dbconfig.js");
// const db = config.sqlpool();

// let user = {
//   login:function (req,res) {
//       let username = req.body.username;
//       let password = req.body.password;
//       console.log(username);
//       console.log(password);
//
//       //连接池
//       let sql = "select * from user where uname = ? and upassword = ?";
//       let arr = [username,password];
//       function login(err,data){
//           console.log(err);
//                       console.log(data);
//
//                       if (data.length>0 && data != undefined){
//                           res.send("登录成功1");
//                       } else {
//                           res.send("登录失败1");
//                       }
//       }
//       db.connect(sql,arr,login);
//
//       // 连接封装函数
//       // mysqlconfig.connection("select * from user where uname = ? and upassword = ?",[username,password],function (err,data) {
//       //             console.log(err);
//       //             console.log(data);
//       //
//       //             if (data.length>0 && data != undefined){
//       //                 res.send("登录成功");
//       //             } else {
//       //                 res.send("登录失败");
//       //             }
//       //         });
//
//       // 2.创建链接到数据库的对象
//       // let myconnection = mysql.createConnection({
//       //     host:"localhost",
//       //     user:"root",
//       //     password:"123",
//       //     port:3306,
//       //     database:"test-data"
//       // });
//       // // 3.打开链接
//       // myconnection.connect();
//       // // 4.执行mysql命令,myconnection.query(sql,arr,callback(err,data));
//       // //?表示占位符，放置sql注入
//       // myconnection.query("select * from user where uname = ? and upassword = ?",[username,password],function (err,data) {
//       //     console.log(err);
//       //     console.log(data);
//       //
//       //     if (data.length>0 && data != undefined){
//       //         res.send("登录成功");
//       //     } else {
//       //         res.send("登录失败");
//       //     }
//       // });
//       //   // 5.关闭mysql链接
//       // myconnection.end();
//   },
//   register:function (req,res) {
//       let username = req.body.username;
//       let password = req.body.password;
//       console.log(username);
//       console.log(password);
//
//       //连接池
//       let sql = "insert into user (uname,upassword) values(?,?)";
//       let arr = [username,password];
//       function register(err,data){
//           console.log(err);
//                       console.log(data);
//                         if(username == "")username = null;
//                         if (password == "")password = null;
//                       if (err == null){
//                           //null表示注册成功，插入数据成功
//                           res.send("注册成功1");
//                       }else {
//                           res.send("注册失败1");
//                       }
//                   }
//       db.connect(sql,arr,register);
//
//       // 连接数据库
//       // mysqlconfig.connection("insert into user (uname,upassword) values(?,?)",[username,password],function (err,data) {
//       //             console.log(err);
//       //             console.log(data);
//       //               if(username == "")username = null;
//       //               if (password == "")password = null;
//       //             if (err == null){
//       //                 //null表示注册成功，插入数据成功
//       //                 res.send("注册成功");
//       //             }else {
//       //                 res.send("注册失败");
//       //             }
//       //         });
//
//       // 创建链接到数据库的对象
//   //     let myconnection = mysql.createConnection({
//   //         host:"localhost",
//   //         user:"root",
//   //         password:"123",
//   //         port:3306,
//   //         database:"test-data"
//   //     });
//   //     myconnection.connect();
//   //     let sql = "insert into user (uname,upassword) values(?,?)";
//   //     //令数据为空，则err不为null
//   //     if(username == "")username = null;
//   //     if (password == "")password = null;
//   //     let arrParam = [username,password];
//   //     myconnection.query(sql,arrParam,function (err,data) {
//   //         console.log(err);
//   //         console.log(data);
//   //         if (err == null){
//   //             //null表示注册成功，插入数据成功
//   //             res.send("注册成功");
//   //         }else {
//   //             res.send("注册失败");
//   //         }
//   //     });
//   //     myconnection.end();
//
//   }
// };
module.exports = user;
// module.exports.sqlpool = function每一个module.exports都赋值，容易乱；