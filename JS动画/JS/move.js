// 获取样式函数
function getStyle(obj, attr) {
    // 针对IE
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}
//转化为json
//startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
//fn为新参数
//attr与iTarget为一组值，对应json中的name和key
function startMove(obj, json, fn) {
    var timer=null
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //假设运动都达到目标值
        var flag = true
        // for-in循环
        //iTarget替换为json[attr]
        for (var attr in json) {
            // 取当前值
            var icur = 0;
            if (attr == 'opacity') {
                //*100为了符合习惯
                //Math.round四舍五入
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
            } else {
                icur = parseInt(getStyle(obj, attr))
            }
            // 计算速度
            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            // 检测停止
            //还需要判断所有运动都到达目标值才可以关闭定时器
            //如果不是所有运动都达到目标值
            if (icur != json[attr]) {
                flag = false;
            }
            //那么接下来继续去做运动
            //单独为透明度设置做判断
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (icur + speed) + ')';
                obj.style.opacity = (icur + speed) / 100
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
        //如果flag为true，说明所有运动都达到目标值
        if (flag) {
            clearInterval(obj, timer);
            if (fn) {
                fn()
            }
        }
    }, 30)
}

// 1、flag=true，应该立在定时器内，json的for遍历前；
// 2、if（flag）{clearInterval(obj.timer);if(fn){fn()}}应该放在定时器内，json的for遍历后；
// 因为当三个iCur==json[attr]，flag==false，之后一次执行定时器时，会将flag变为true，则变成true状态，
// for遍历中的结果并不会被执行，等于空运行一次for遍历后，true被带到if（flag）{if(fn){fn()}}，中执行关闭定时器和fn（）,
// 如果吧if（flag）{...}放在for遍历中，最后fn（）会被执行三次，for遍历的特性