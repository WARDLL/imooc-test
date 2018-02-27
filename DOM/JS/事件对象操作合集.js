var eventUtil = {
    //添加句柄
    //给谁添加，添加的事件类型,句柄（触发操作）
    addHandler: function (element, type, handler) {
        //能力检测
        //如果支持addEventListener
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
            //如果支持attachEvent
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
            //老版本不支持DOM2级也不支持IE，只能用DOM0级
        } else {
            //element.onclick====element['onclcik']
            element['on' + type] = handler;
        }
    },
    //删除句柄
    removeHandler: function (element, type, handler) {
        //能力检测
        //如果支持addEventListener
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
            //如果支持attachEvent
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler)
            //老版本不支持DOM2级也不支持IE，只能用DOM0级
        } else {
            //element.onclick====element['onclcik']
            element['on' + type] = handler;
        }
    },
    //获取事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取事件类型
    getType: function (event) {
        return event.type;
    },
    //获取事件目标
    getElement: function (event) {
        return event.target || event.srcElement;
    },
    //阻止事件冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true;
        }
    },
    //阻止事件默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }
}