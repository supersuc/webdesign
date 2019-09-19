/**
 *Create by suchao an 2019/8/27
 */
const express = require("express")
const db = require("./db")
const cityModel = require("./model/cityModel.js")
const app = express()

app.use(express.static("public"))

db.then(()=>{
    app.get("/getAllProvinces",(req,res)=>{
        res.set("Access-Control-Allow-Origin","http://localhost:63342")
        cityModel.find({level:1},{name:1,province:1,_id:0},(err,data)=>{
            if (!err){
                const result = {state:1,data}
                res.json(result)
            } else {
                const resultErr = {state:0,err:"省份请求出错"}
                res.send(resultErr)
            }
        })
    })
    app.get("/getCityByproCode",(req,res)=>{
        res.set("Access-Control-Allow-Origin","http://localhost:63342")
        const {province} = req.query
        cityModel.find({level:2,province:province},{name:1,city:1,_id:0},(err,data)=>{
            if (!err){
                const result = {state:1,data:data}
                res.json(result)
            } else {
                const resultErr = {state:0,err:"城市请求出错"}
                res.json(resultErr)
            }
        })
    })
    app.get("/getCountryByproCodeAndCitCode",(req,res)=>{
        res.set("Access-Control-Allow-Origin","http://localhost:63342")
        const {province,city} = req.query
        cityModel.find({level:3,province:province,city:city},{name:1,code:1,_id:0},(err,data)=>{
            if (!err){
                const result = {state:1,data:data}
                res.json(result)
            } else {
                const resultErr = {state:0,err:"城市请求出错"}
                res.json(resultErr)
            }
        })
    })

}).catch((err)=>{
    console.log(err)
})


app.listen(3000,(err)=>{
    if (!err) console.log("三级联动服务器启动成功")
    else console.log(err)
})