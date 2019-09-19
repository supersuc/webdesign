const express = require("express");
const mysqlpool = require("./routes/dbconfig.js");
const db = mysqlpool.sqlpool();
const app = express();

app.set("views",__dirname+"/views");//设置视图路径
app.set("view engine","ejs");//启动视图引擎

app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));
app.use(express.errorHandler());

app.set("port",8008);
app.listen(app.get("port"),function () {
    console.log("server is running,port 8008")
});

// 请求拦截响应
// 显示

app.get("/users",function (req,res) {
    let sql = "select * from user";
    let arr =[null];
    db.connect(sql,arr,function (err,data) {
        if (data.length>0 && data!=undefined) {
            console.log(data);//[{},{},{}]
            res.render("users",{listArr:data})
        }
    });
});
// 删除
app.get("/del",function (req,res) {
    let id = req.query.id;
    let arr = [id];
    let sql = "delete from user where uid = ?";
    db.connect(sql,arr,function (err,data) {
        if(err){
            res.send("删除失败"+err);
        }else {
            res.redirect("users");
        }
    });
});
//添加
app.get("/add",function(req,res,next){
    res.render("add");
});
app.post("/add",function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var sex = req.body.sex;
    console.log(username);
    console.log(password);
    console.log(sex);

    let sql = "insert into user (uname,upassword,sex) values(?,?,?)";
    let arr = [username,password,sex];
    db.connect(sql,arr,function (err,data) {
        console.log(err);
        console.log(data);

        if(username == "")username = null;
        if (password == "")password = null;
        if (sex == "")sex = null;
        if (err == null){
            //null，插入数据成功
            res.redirect("users");
        }else {
            res.send("添加失败");
        }
    });
});
//修改
app.get("/toUpdate",function (req,res) {
    let id = req.query.id;
    console.log(id);
    console.log(req.query.id);
    console.log(req.query);
    let sql = "select * from user where uid = ?";
    let arr = [id];
    console.log(sql);
    console.log(arr);
    db.connect(sql,arr,function (err,data) {
        console.log(data);
        console.log(err);
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update",{listArr:data});
        }
    });
});
app.post("/update",function (req,res) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var sex = req.body.sex;
    console.log(id);
    console.log(name);
    console.log(sex);
    let sql = "update user set uname = ?,sex = ? where uid= ?";
    let arr = [name,sex,id];
    db.connect(sql,arr,function (err,data) {
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("users");
        }
    });
});
//查询
app.post("/search",function (req,res) {
    console.log(req.body);
    var name = req.body.username;
    var sex = req.body.sex;
    console.log(name);
    console.log(sex);
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
    db.connect(sql,arr,function (err,data) {
        console.log(err);
        console.log(data);
        if (data.length >0 && data != undefined){
            res.render("users",{listArr:data});
        } else {
            res.send("fail");
        }
    });
});
