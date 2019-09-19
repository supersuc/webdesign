"use strict";
let user = {
    login:function (req,res,next) {
        // res.send("登录成功了！");
        // get请求
        // let username = req.query.uname;
        // let password = req.query.password;

        // post请求
        let username = req.body.uname;
        let password = req.body.password;
        console.log(req.body);

        if (username == "suchao" && password =="123"){
            // res.send("登录成功");
            res.redirect("index.html");
        } else {
            // res.send("登录失败");
            res.redirect("login.html");
        }
    },
    register:function (req,res) {

    }
};

module.exports = user;