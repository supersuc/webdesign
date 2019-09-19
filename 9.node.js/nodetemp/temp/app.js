const myuser = require("./routes/addModule.js");
const mysearch = require("./routes/searchModule.js");

const express = require("express");
const app =express();

app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+"/public"));
app.use(express.favicon(__dirname+"/public/img/node.png"));
app.use(express.errorHandler());

app.set("port",8004);
app.listen(app.get("port"),function () {
    console.log("server is running,port is 8004");
});


app.post("/add.do",myuser.myAdd().add);
app.post("/search.do",mysearch.mysearch().search);
