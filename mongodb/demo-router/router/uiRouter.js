/*
* 该模块是ui路由器模块，管理ui，定义页面路由
* */
const {Router} = require("express")
const router = new Router()
//引入path模块，核心模块，无需下载
let {resolve} = require("path")

router.get("/login",(req,res)=>{
    let filePath = resolve(__dirname,"../public/login.html")
    res.sendFile(filePath)
});
router.get("/register",(req,res)=>{
    let filePath = resolve(__dirname,"../public/register.html")
    res.sendFile(filePath)
});

module.exports = router
