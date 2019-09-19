// "use strict";客服端不需要，服务器端需要

// function search() {
//     let xhr;
//     if (window.XMLHttpRequest){
//         xhr = new XMLHttpRequest();
//     }else{
//         xhr = new ActiveXObject("microsoft.XMLHTTP");
//     }
//     let name;
//     let sex;
//     name = document.getElementById("uname").value;
//     sex = document.getElementById("sex").options[document.getElementById("sex").selectedIndex].value;
//     // console.log(sex);
//     // console.log(name);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200){
//             var data = xhr.responseText;
//             var oTbl = document.getElementById("msg");
//             if(data == "fail"){
//                 console.log("查询失败");
//                 alert("查询失败");
//                 oTbl.style.display = "none";
//             }else {
//                 data = JSON.parse(data);
//                 oTbl.innerHTML = "<tr><th>姓名</th><th>性别</th></tr>";
//                 for (var i = 0;i <data.length;i++){
//                     oTbl.innerHTML +="<tr><td>"+data[i].uname+"</td><td>"+data[i].sex+"</td></tr>"
//                 }
//                 oTbl.style.display = "block";
//             }
//         }
//     };
//     xhr.open("post","/search.do",true);
//     //post加头部信息，get不需要，同步异步区别
//     xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
//     xhr.send("username="+name+"&sex="+sex);
//
// }

var xhr;
function search() {
    let name ,sex;
    //注意后面的value
    name = document.getElementById("uname").value;
    sex = document.getElementById("sex").options[document.getElementById("sex").selectedIndex].value;

    function callbackSearch(err,data) {
        if (xhr.readyState == 4 && xhr.status == 200){
            let data = xhr.responseText;
            console.log(xhr.responseText);
            var oTbl = document.getElementById("msg");
            console.log(data);
            if(data == "fail"){
                console.log(data);
                alert("查询失败");
                oTbl.style.display = "none";
            }else {
                data = JSON.parse(data);
                oTbl.innerHTML = "<tr><th>姓名</th><th>性别</th></tr>";
                for (var i = 0;i <data.length;i++){
                    oTbl.innerHTML +="<tr><td>"+data[i].uname+"</td><td>"+data[i].sex+"</td></tr>"
                }
                oTbl.style.display = "block";
            }
        }
    }
    ajax("post","/search.do","username="+name+"&sex="+sex,true,callbackSearch);
}