/*
* 该模块是业务路由，登录，注册
* */
const user= require("../model/userModel.js")
const {Router} = require("express")
const sha1 = require("sha1")
const router = new Router()
//业务逻辑的路由
router.post("/register",async (req,res)=> {
    // console.log(req.body);
    //1.获取用户的输入
    const {email,nick_name,password,re_password} = req.body
    //2.校验数据
    const emailReg = /^[a-zA-Z0-9_]{2,16}@[a-zA-Z0-9]{2,16}\.com$/
    const nick_nameReg = /[\u4e00-\u9fa5]/gm
    const passwordReg = /^[a-zA-Z0-9_#]{2,16}$/
    let errMsg = {}
    if (!emailReg.test(email)) {
        // res.send("邮箱格式不正确，要求2-16位")
        // return
        errMsg.emailErr = "邮箱格式不正确，要求2-16位"
    }
    if (!nick_nameReg.test(nick_name)) {
        // res.send("昵称输入不合法")
        // return
        errMsg.nickNameErr = "昵称输入不合法"
    }
    if (!passwordReg.test(password)) {
        // res.send("密码输入格式不正确")
        // return
        errMsg.passwordErr = "密码输入格式不正确"
    }
    if (password !== re_password) {
        // res.send("两次输入密码不一致")
        // return
        errMsg.re_passwordErr = "两次输入密码不一致"
    }
//检验js对象是否为空
    if (JSON.stringify(errMsg) !=="{}"){
        // console.log(222)
        res.render('register',{errMsg})
        return
    }
    //3.检查该是否注册
    //优化错误执行步骤
    try {
        let finResult = await user.findOne({email})
            // console.log(finResult)
        if (finResult){
            // res.send(`注册失败,${email}邮箱已经被注册了`)
            // return
            errMsg.emailErr=`注册失败,${email}邮箱已经被注册了`
            res.render('register',{errMsg})
        }else {
            await user.create({email,nick_name,password:sha1(password)})
            console.log(`邮箱为：${email},昵称为：${nick_name}的用户注册成功了`)
            // res.send("注册成功");
            res.redirect(`/login?email=${email}`)
        }
    }
    catch (err) {
        //警报程序，通知
        console.log(err)
        errMsg.networkErr=`啊哦，网络不稳定，请稍后再试`
        // res.send("啊哦，网络不稳定，请稍后再试~~")
        res.render('register',{errMsg})
    }
})
//登录业务逻辑
router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    const emailReg = /^[a-zA-Z0-9_]{2,16}@[a-zA-Z0-9]{2,16}\.com$/
    const passwordReg = /^[a-zA-Z0-9_#]{2,16}$/
    const errMsg = {}
    if (!emailReg.test(email)) {
        // res.send("邮箱格式不正确，要求2-16位")
        // return
        errMsg.emailErr = "邮箱格式不正确，要求2-16位"
    }
    if (!passwordReg.test(password)) {
        // res.send("密码输入格式不正确")
        // return
        errMsg.passwordErr = "密码输入格式不正确"
    }
//判断错误对象是否为空
    if (JSON.stringify(errMsg) !=="{}"){
        res.render("login",{errMsg})
        return
    }
    
    try {
        let finResult = await user.findOne({email,password:sha1(password)})
        if (finResult){
            //1.在服务器中开辟一块内存
            //2.将用户的id存入上一步产生的session中
            //3.获取session的编号，放入cookie中
            //4.将上一步的cookie返回给客户端
            //以上四步
            req.session._id = finResult._id
            res.redirect("/usercenter")

        }else {
            errMsg.loginErr = "登录失败，邮箱或密码输入错误"
            // res.send('登录失败，邮箱或密码输入错误')
            res.render("login",{errMsg})
        }
    }
    catch (err) {
        console.log(err)
        errMsg.networkErr = "啊哦，网络不稳定，请稍后再试~~"
        // res.send("啊哦，网络不稳定，请稍后再试~~")
        res.render("login",{errMsg})
    }
})

module.exports=router