"use strict";
// 1.引入短信模块
const AV = require("leanengine");
const mailer = require("nodemailer");

//2.配置短信模块
AV.init({
    appId:"LnmVDysyoPWrarki62cCn21V-gzGzoHsz",
    appKey:"LmN00FUzxjRco8zMAup85UGB"
    // appId:"5Rmtd8lvlBEcjP85dJxmws3H-gzGzoHsz",
    // appKey:"OvEMJjEsMQBXFHei4XixoMcX"
});
let sms = {
    // 发送短信
    sendMsg:function (req,res) {
        let phone = req.body.phone;
        console.log(phone);
//配置请求服务，调用AV.Cloud.requestSmsCode()
        AV.Cloud.requestSmsCode({
            // 短信配置信息
            mobilePhoneNumber: phone,
            name:"童国鑫",//服务类型
            op:"牛逼了，我是李明星",//进行什么操作
            ttl:10 //有效时间期限
        }).then(function (data) {
            console.log(data);
            res.send("短信发送成功");
        },function (err) {
            console.log(err);
            res.send("短信发送失败");
        });
    },

    // 验证函数

verifyCode:function (req,res) {
        let phone = req.body.phone;
        let smscode = req.body.smscode;
        AV.Cloud.verifySmsCode(smscode,phone).then(function (data) {
            //验证成功
            console.log(data);
            res.send("验证成功");
        },function (err) {
            //验证失败
            console.log(err);
            res.send("验证失败");
        });
    },

//发送邮件
// 授权码：qxwirndtwbeqbdhf
sendMail:function (req,res) {
        // 1.设置使用的邮箱，开启pop3，smtp服务
        //2.使用nodemailer第三方模块
        // 3.引入nodemailer
        // 4.创建连接池
        let mailTransport = mailer.createTransport({
            service: "qq",
            auth: {
                user: "1032790481@qq.com",
                pass: "qxwirndtwbeqbdhf"
            }
        });
        // 5.配置邮件内容
        let touser = req.body.touser;
        let title = req.body.title;
        let content = req.body.content;
        let mailcontent = {
            from: '"Fred Foo 👻" <1032790481@qq.com>', // sender address
            to: touser, // 收件人
            subject: title, // 邮件标题
            // text: "Hello world?", //  文本内容
            html: "<h1>您好</h1><p>"+content+" </p>"
        };
        //6.发送邮件
        mailTransport.sendMail(mailcontent,function (err,data) {
            console.log(err);
            console.log(data);
            mailTransport.close();//关闭连接池
            if (err){
                res.send("发送失败");
            }else {
                res.send("邮件发送成功");
            }
        })
    }
};
module.exports = sms;