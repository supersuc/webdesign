// function myModule() {
//     //私有数据
//     var msg = 'Smyhvae Haha'
//
//     //操作私有数据的函数
//     function doSomething() {
//         console.log('doSomething() ' + msg.toUpperCase()); //字符串大写
//     }
//
//     function doOtherthing() {
//         console.log('doOtherthing() ' + msg.toLowerCase()) //字符串小写
//     }
//
//     //通过【对象字面量】的形式进行包裹，向外暴露多个函数
//     return {
//         doSomething1: doSomething,
//         doOtherthing2: doOtherthing
//     }
// }


(function () {
    //私有数据
    var msg = 'Smyhvae Haha'

    //操作私有数据的函数
    function doSomething() {
        console.log('doSomething() ' + msg.toUpperCase())
    }

    function doOtherthing() {
        console.log('doOtherthing() ' + msg.toLowerCase())
    }

    //外部函数是即使运行的匿名函数，我们可以把两个方法直接传给window对象
    window.myModule = {
        doSomething1: doSomething,
        doOtherthing2: doOtherthing
    }
})();
