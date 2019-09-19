const express = require("express")
const app = express()

//暴露静态资源
app.use(express.static("public"))
//解析post请求体中以urlencoded形式编码参数
app.use(express.urlencoded({extended:true}))

app.get("/test_get",(req,res)=>{
    console.log("一个GET请求来了",req.query)
    res.send("我是服务器响应GET请求信息")
})

app.post("/test_post",(req,res)=>{
    console.log("一个POST请求来了",req.body)
    res.send("我是服务器响应POST请求信息")
})


app.listen(3000,(err)=>{
    if (!err) console.log("服务器启动成功")
    else console.log(err)
})
