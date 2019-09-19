"use strict";
const  myfs = require("fs");
// exports.sendHtml = function (req,res,type) {
//     let path = req.url;
//     if (type == "html") {
//         myfs.readFile("public" + path, "utf-8", function (err, data) {
//             if (err == null) {
//                 console.log("html111");
//                 res.writeHead(200, {"content-type": "text/" + type});
//                 res.write(data);
//                 res.end();
//             }
//         });
//     }else if (type == "css"){
//         myfs.readFile("public" + path, "utf-8", function (err, data) {
//             if (err == null) {
//                 console.log("css");
//                 res.writeHead(200, {"content-type": "text/" + type});
//                 res.write(data);
//                 res.end();
//             }
//         });
//     }else if (type == "png" || type =="jpg"){
//         myfs.readFile("public" + path, function (err, data) {
//             if (err == null) {
//                 res.writeHead(200, {"content-type": "image/" + type});
//                 res.write(data);
//                 res.end();
//             }
//         });
//     }else if (type == "javascript"){
//         myfs.readFile("public" + path, "utf-8",function (err, data) {
//             if (err == null) {
//                 res.writeHead(200, {"content-type": "text/" + type});
//                 res.write(data);
//                 res.end();
//             }
//         });
//     }
// }

let sendFile = {
    sendHtml: function (req,res,type) {
        let path = req.url;
        if (type == "html") {
            myfs.readFile("public" + path, "utf-8", function (err, data) {
                if (err == null) {
                    console.log("html111");
                    res.writeHead(200, {"content-type": "text/" + type});
                    res.write(data);
                    res.end();
                }
            });
        }else if (type == "css"){
            myfs.readFile("public" + path, "utf-8", function (err, data) {
                if (err == null) {
                    console.log("css");
                    res.writeHead(200, {"content-type": "text/" + type});
                    res.write(data);
                    res.end();
                }
            });
        }else if (type == "png" || type =="jpg"){
            myfs.readFile("public" + path, function (err, data) {
                if (err == null) {
                    res.writeHead(200, {"content-type": "image/" + type});
                    res.write(data);
                    res.end();
                }
            });
        }else if (type == "javascript"){
            myfs.readFile("public" + path, "utf-8",function (err, data) {
                if (err == null) {
                    res.writeHead(200, {"content-type": "text/" + type});
                    res.write(data);
                    res.end();
                }
            });
        }
    },
    sendJs: function () {},
    sendFont: function () {}
};
module.exports = sendFile;

