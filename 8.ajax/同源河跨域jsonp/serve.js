/**
 *Create by suchao an 2019/8/26
 */
const express = require("express")
const app = express()

//中间件
// app.use(express.static("public"))
app.disable("x-powered-by")
//根路由
app.get("/test_get",(req,res)=>{
    console.log(req.query)
    let {callback} = req.query
    let arr = [{name:"suchao",age:18},{name:"jiangting",age:18}]
    res.send(`${callback}(${JSON.stringify(arr)})`)
})

app.listen(3000,(err)=>{
    if (!err) console.log("该服务器用于测试jsonp解决跨域问题，必须通过webstrom打开网页")
    else console.log(err)
})