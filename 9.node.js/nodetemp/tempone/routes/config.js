const mysql = require("mysql");
"use strict";
// mysql封装
let mysqlconfig = {
    config:{
        host:"localhost",
        user:"root",
        password:"123",
        port:3306,
        database:"test-data"
    },
    connection: function (sql,arr,fn) {
        let myconnection = mysql.createConnection(this.config);
        myconnection.connect();
        myconnection.query(sql,arr,fn);
        myconnection.end();
    }
};

module.exports = mysqlconfig;