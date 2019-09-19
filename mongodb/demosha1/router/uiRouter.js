/*
* 该模块是ui路由器模块，管理ui，定义页面路由
* */
const {Router} = require("express")
const cookieParser = require("cookie-parser")
const user= require("../model/userModel.js")
const router = new Router()
//引入path模块，核心模块，无需下载
let {resolve} = require("path")

// 加中间件
router.use(cookieParser())

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
router.get("/usercenter",async (req,res)=>{
        //1.获取cookie，读取cookie中session的容器编号
        //2.去服务器中匹配编号对应的session容器
        //3.根据匹配结果，进行具体的业务逻辑
        //一句话
    const {_id}=req.session
    if (_id){
        let result = await user.findOne({_id})
            if (result){
                res.render("usercenter",{nickName:result.nick_name})
            }else {
                console.log("用户非法修改cookie")
                res.redirect("/login")
            }
    } else {
        res.redirect("/login")
    }

});

module.exports = router
