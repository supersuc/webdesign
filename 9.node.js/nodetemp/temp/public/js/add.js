"use strict";
$("#addData").on("click",function () {
    $.ajax({
        type:"post",
        url:"/add.do",
        dataType:"json",
        data:{username:$("#uname").val(),password:$("#upassword").val(),sex:$("#sex").val()},
        success:function (data) {
            $("#msg").css("display","block");//inline-block
            console.log("111");
        }
    });
})