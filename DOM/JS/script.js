window.onload = function () {
    var go = document.getElementById('go'),
        box = document.getElementById('box');

    //给整个大盒子添加点击事件
    eventUtil.addHandler(box,'click',function(){
        alert('我是整个父盒子')
    });
    //想知道事件来自于哪个元素
    eventUtil.addHandler(go,'click',function(e){
        //兼容所有浏览器
        e=e||window.event;
        //事件来自于哪个元素
        alert(eventUtil.getElement(e));
        //阻止事件默认行为
        eventUtil.preventDefault(e);
        //阻止事件冒泡
        eventUtil.stopPropagation(e);
    })
}