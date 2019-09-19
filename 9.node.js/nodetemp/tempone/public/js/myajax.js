/**
 * 函数名 ajax(),
 * @param method
 * @param url
 * @param param
 * @param async
 */
var xhr;
function ajax(method,url,param,async,callback) {
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = callback;
    if (method == "get"){
        xhr.open(method,url+"?"+param,async);
        xhr.send(null);
    } else if (method == "post") {
        xhr.open(method,url,async);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(param);
    }

}