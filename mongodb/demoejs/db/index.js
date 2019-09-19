/*
* 定义一个模块连接monogodb数据库
* 封装方法
* */

var mongoose=require("mongoose");
mongoose.set("useCreateIndex",true)
const DB_NAME = 'custom'
const DB_url = 'localhost:27017'
let dbPromise = new Promise((resolve,reject)=>{
    mongoose.connect(`mongodb://${DB_url}/${DB_NAME}`,{useNewUrlParser: true})
    mongoose.connection.once('open',(err)=>{
        if (!err){
            console.log(`位于${DB_url}上的${DB_NAME}启动成功`)
            resolve()
        } else {
            reject(err)
        }
    })
})

module.exports = dbPromise