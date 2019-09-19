/*
*关于cookie
* 1.是什么
*      本质是一个字符串，里面包含着浏览器和服务器的沟通的信息（交互时产生的信息）。
*      存储的形式以：key-value的形式存储
*      浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带
* 2.分类
*       会话cookie（关闭浏览器后，会话cookie会自动小时，会话cookie存在在浏览器运行的拿快内存上）
*       持久化cookie：看过期时间，一旦到了过期时间，自动销毁，存储在用户的硬盘上，清楚缓存了，也会消失
* 3.工作原理(例子中的小纸条)
*       1)当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器
*       2)浏览器会判断cookie的种类
*           -会话cookie：存储在浏览器运行的那块内存上
*           -持久化cookie，存储在用户的硬盘上
*       3)以后请求该网站的时候，自动携带上该网站的所有cookie(无法进行干预)
*       4)服务器拿到之前自己种下的cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑
* 4.应用
*       解决http无状态的问题(7天免登录，一般来说不会单独使用cookie，会配后后台的session存储使用)
* 5.不同的语言，不同的后端架构cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的
*       备注:cookie不一定只由服务器生成，前端同样可以生成cookie，但是前端生成的cookie几乎没有意义
*
* */

const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
app.disable("x-powered-by")//响应头信息
//使用cookieParser解析浏览器携带过来的cookie为一个对象，随后挂载该req对象
app.use(cookieParser())

//种cookie
app.get("/test",(req,res)=>{
    /*
    * 当访问test路由时会给客户端种cookie
    * express在客户端种cookie，不用借助第三方库
    * */
    //给客户端种下一个会话cookie
    // res.cookie('demo',123)
    //持久化cookie
    res.cookie("demo",123,{maxAge:30*1000})
    res.send('<h2>种cookie</h2>')
})
//读cookie
app.get("/test2",(req,res)=>{
    /*
    * 当访问test2路由时会获取浏览器携带过来的cookie
    * express更方便的获取客户端携带过来的cookie，借助第三方库（cookie-parser）
    * */
    console.log(req.cookies)
    const {demo} = req.cookies
    console.log(demo)
    res.send('<h2>我读取到了你携带过来的cookie</h2>')
})
//删cookie
app.get("/test3",(req,res)=>{
    //第一种删除方式
    // res.cookie("demo",{maxAge:0})
    //第二种删除方式
    res.clearCookie("demo")
    res.send("我删除了cookie")
})

app.listen(3000,(err)=>{
    if (!err) console.log("服务器已经启动成功")
    else console.log(err);
})