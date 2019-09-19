"use strict";
const  server = require("http");
const  myfs = require("fs");
const  myroute = require("./routes/myroute.js");
const  app = server.createServer(function (req,res) {
    let path = req.url;
    let type = path.split(".")[1];
    myroute.sendHtml(req,res,type);
});
app.listen(8080,function () {
    console.log("server is running,port is 8080.");
});