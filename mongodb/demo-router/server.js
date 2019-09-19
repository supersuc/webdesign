const express=require("express")
const db = require("./db/index.js")
//引入ui路由器
const uiRouter = require("./router/uiRouter.js")
//引入业务路由
const businessRouter = require("./router/businessRouter.js")
const app=express()
//数据库连接成功后注册路由
db.then(()=>{
    //暴露静态资源
app.use(express.static("public"))
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