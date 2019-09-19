const express = require("express");
const myuser = require("./routes/userModule.js");
const user = require("./routes/myroutes.js");
const mysqlpool = require("./routes/dbconfig.js");
const db = mysqlpool.sqlpool();


const app =express();
// app配置
//ejs配置
app.set("views",__dirname+"/views");//设置视图路径
app.set("view engine","ejs");//启动视图引擎

app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));
app.use(express.favicon(__dirname+"/public/img/html5.png"));
app.use(express.errorHandler());


app.set("port",8003);
app.listen(app.get("port"),function () {
    console.log("server is running,port 8003")
});


// 拦截
// app.post("/login.do",user.login);
// app.post("/register.do",myuser.register);

//5.ajax第五步,拦截请求，在业务模块中(模块化)处理后台业务
// app.get("/login.do",myuser.loginGet().myLogin);


//多条件查询
app.post("/search.do",myuser.mysearch().search);
// app.get("/test",function (req,res) {
//     let uname = "suchao";
//     let lists = [{username: uname,age:23,sex: "男"},{username:"蒋婷",age: 18,sex: "女"},{username:"苏超",age:23,sex:"男"}];
//     res.render("test",{obj:lists});//后面只能放一个obj对象
//
// });

app.get("/test",function (req,res) {
    let sql = "select * from user";
    let arr =[null];
    db.connect(sql,arr,function (err,data) {
            if (data.length>0 && data!=undefined) {
                console.log(data);//[{},{},{}]
                res.render("test",{listArr:data})
            }
        });

});