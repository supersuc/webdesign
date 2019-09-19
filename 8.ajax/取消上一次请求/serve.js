/**
 *Create by suchao an 2019/8/26
 */
const express = require("express")
const app = express()

//中间件
app.use(express.static("public"))

//根路由
app.get("/get_code",(req,res)=>{
    console.log("客户端发来了一个请求")
    setTimeout(function () {
        //返回一个1000-9999
        let code = Math.floor(Math.random()*8999+1000)
        //不能返回数字，返回数字会以为返回的是状态码，变为字符串
        res.send(code.toString())
    },2000)
})

app.listen(3000,(err)=>{
    if (!err) console.log("服务器已经启动了！")
    else console.log(err)
})