const express=require("express")
const db = require("./db/index.js")
//引入express-session用于在express中操作session
const session = require("express-session")
//引入connect-mongo,用于session持久化
const MongoStore = require("connect-mongo")(session)
//引入ui路由器
const uiRouter = require("./router/uiRouter.js")
//引入业务路由
const businessRouter = require("./router/businessRouter.js")
const app=express()
app.set("view engine","ejs")
app.set("views","views")
//定义一个对象cookie和session组合使用的配置对象
app.use(session({
    name:"session",//设置cookie的name，默认值是connect.sid
    secret:"suchao",//参与加密的字符串(又称签名)
    saveUninitialized:false, //是否在存储内容之前创建会话
    resave:true,//是否每次请求时，强制重新保存session，即使他们没有变化
    store:new MongoStore({
        url:"mongodb://localhost:27017/cookie_container",
        touchAfter:1800 //修改频率(半小时之内只更新一次)
    }),
    cookie:{
        httpOnly:true,//开启后前端无法通过js操作cookie
        maxAge:1000*30  //设置cookie的过期时间
    },
}));

//数据库连接成功后注册路由
db.then(()=>{
    //暴露静态资源
// app.use(express.static("public"))
// 中间件的使用
app.use(express.urlencoded({extended:true}))
//把uiRouter当作中间件
app.use(uiRouter)
//引入业务路由
app.use(businessRouter)
}).catch((err)=>{
    console.log("数据库连接成功",err)
})

app.listen(3000,(err)=>{
   if (!err) console.log("服务器已经启动");
   else console.log(err);
});