"use strict";
$("#search").on("click",function () {
    $.ajax({
        type: "post",
        url: "/search.do",
        dataType: "json",
        data: {username: $("#username").val(), sex: $("#usersex").val()},
        success: function (data) {
            console.log(data);
            var str = "<thead></thead><tr><th>序号</th><th>姓名</th><th>密码</th><th>性别</th><th colspan=2>操作</th></tr></thead>";
            $.each(data,function (index,item) {
                str += "<tr>"+
                        "<td>"+item.uid+"</td>"+
                        "<td>"+item.uname+"</td>"+
                        "<td>"+item.upassword+"</td>"+
                        "<td>"+item.sex+"</td>"+
                        "<td>删除</td>"+
                        "<td>修改</td>"+
                        "</tr>"
            });
            $("#mst").html(str);
            $("#mst").css("display","block");
        },
        error:function () {
            $("#mst").css("display","none");
        }

    });
})