function userLogin() {
    "use strict";
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //忽略正则验证
    // 1.添加绑定事件，创建函数
    //2.创建XMLHttpRequest对象
    let xhr;
    if (window.XMLHttpRequest){
       //dom
        xhr = new XMLHttpRequest();
    }else if (window.ActiveXObject){
       //ie
        xhr = new ActiveXObject("microsoft.XMLHTTP");
    }
    //3.配置XMLHttpRequest对象
        xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        // console.log(xhr.responseText);

            //6.判断参数值，获取响应的值
        if (xhr.readyState ==4 && xhr.status ==200){
            let data = xhr.responseText;
            console.log(data);
            //6.操作Dom更新html
            if (data == "ok"){
                document.getElementById("show").innerHTML="登录成功";
            }else {
                document.getElementById("show").innerHTML="登录失败";
            }
        }
    };

    xhr.open("get","/login.do?username="+username+"&password="+password,true);
    //xhr.open(method,url,Boolean);
    // method:get,post
    //url:数据提交的url，或者是请求的url。
    //如果是get方式，把数据拼接在url后面；如果是post，则url只是请求的目标地址
    //Boolean：true：异步，false：同步

    // 4.XMLHttpRequest对象发送一个异步HTTP请求到服务器
    xhr.send(null);
    //send()的参数，由method的值来决定，get—null；post→send("要提交的数据字符串")

    //5.在服务器中请求处理

}