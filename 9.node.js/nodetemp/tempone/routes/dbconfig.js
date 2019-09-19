const mysql = require("mysql");
"use strict";
module.exports.sqlpool = function () {
    let pool = {
        config: {
            host: "localhost",
            user: "root",
            password: "123",
            port: 3306,
            database: "test-data"
        },
        connect: function (sql, arr, fn) {
            // 1.创建连接池
            var pool = mysql.createPool(this.config);
            //2.获取连接对象
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log(err);
                }
                // 3.发送query
                connection.query(sql, arr, fn);
                //4.关闭连接,自动释放
                connection.release();
            })
        }
    };
    return pool;
};