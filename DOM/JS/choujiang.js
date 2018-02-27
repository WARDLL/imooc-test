//抽奖内容写入数组内
var data = ['江西瓦罐', '烤肉拌饭', '尖椒肉丝', '拌饭', '炸酱面', '焖鸡煲', '麻辣拌', '麻辣香锅', '普通炒菜', '西苑炒菜', '包子', '砂锅米线', '石锅拌饭', '黄焖鸡', '铁板面', '芝士肉丸饭', '重庆小面', '麻汁拌面'],
    //定时器
    timer = null,
    //键盘状态
    flag = 0;

window.onload = function () {
    var play = document.getElementById('play'),
        stop = document.getElementById('stop');

    //开始抽奖
    play.onclick = playFun;
    stop.onclick = stopFun;

    //键盘事件
    document.onkeyup = function (event) {
        event = event || window.event;
        if (event.keyCode == 32) {
            //为0即初始状态 从未敲过键盘
            if (flag == 0) {
                playFun();
                flag = 1;
            } else {
                stopFun();
                flag = 0
            }
        }

    }
}

function playFun() {
    var title = document.getElementById('title');
    //清除定时器 先清除定时器再开一个定时器
    clearInterval(timer)
    //添加定时器
    timer = setInterval(function () {
        //保存随机数 Math.floor取整 Math.random范围为0-1，生成0或小数
        var random = Math.floor(Math.random() * data.length)
        //根据随机数找数组里的值 放入title
        title.innerHTML = data[random]
    }, 10)
    //this指play按钮
    play.style.background = '#ccc'
}

function stopFun() {
    clearInterval(timer);
    play.style.background = 'red'
}