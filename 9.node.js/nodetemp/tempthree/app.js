const express = require("express");
const myfile = require("./routes/file.js");//文件上传和下载
const mysms = require("./routes/sms.js");//短信模块

const app =express();

app.set("views",__dirname+"/views");//设置视图路径
app.set("view engine","ejs");//启动视图引擎

app.use(express.logger("dev"));
app.use(express.bodyParser({uploadDir:"./public/temp"}));//处理上传文件的临时路径
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));
app.use(express.errorHandler());

app.set("port",8009);
app.listen(app.get("port"),function () {
    console.log("server is running,port 8009")
});

// 同步方式上传文件
app.post("/uploadFile.do",myfile.uploadFile);

//拦截异步的文件上传
app.post("/uploadPhoto.do",myfile.uploadPhoto);

//下载文件的请求拦截
app.get("/downfile.do",function (req,res) {
    // res.download("别名","另存名");
    res.download("./public/upload/mmexport1474465106993.jpg","aaa.jpg");
});

// 拦截短信发送的请求
app.post("/sendMsg.do",mysms.sendMsg);
app.post("/sendVerifyCode.do",mysms.verifyCode);
//拦截邮件请求
app.post("/sendMail.do",mysms.sendMail);
