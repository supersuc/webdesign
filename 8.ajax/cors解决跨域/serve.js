/**
 *Create by suchao an 2019/8/26
 */
const express = require("express")
const app = express()

//中间件
app.use(express.urlencoded({extended:true}))
//根路由
app.get("/test_get",(req,res)=>{
    console.log(req.query)
    res.set("Access-Control-Allow-Origin","http://localhost:63342")
    console.log("get路由被调用")
    res.send("我是服务器返回的get请求信息")
})

app.post("/test_post",(req,res)=>{
    console.log(req.body)
    //设置跨域对象，cors方法
    res.set("Access-Control-Allow-Origin","http://localhost:63342")
    console.log("post路由被调用")
    res.send("我是服务器返回的post请求信息")
})

app.listen(3000,(err)=>{
    if (!err) console.log("服务器已经启动了！")
    else console.log(err)
})