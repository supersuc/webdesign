var data = {
    title: `标签`,
    list: [`文艺`, `博客`, `摄影`]
};
var html = template(`test`, data);
document.getElementById(`content`).innerHTML = html;