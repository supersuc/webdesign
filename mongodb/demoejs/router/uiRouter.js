/*
* 该模块是ui路由器模块，管理ui，定义页面路由
* */
const {Router} = require("express")
const router = new Router()
//引入path模块，核心模块，无需下载
let {resolve} = require("path")

router.get("/login",(req,res)=>{
    // let filePath = resolve(__dirname,"../public/login.ejs")
    // res.sendFile(filePath)
    const {email} = req.query
    res.render("login",{errMsg:{email}})
});
router.get("/register",(req,res)=>{
    // let filePath = resolve(__dirname,"../public/register.ejs")
    // res.sendFile(filePath)
    res.render("register",{errMsg:{}})
});

module.exports = router
