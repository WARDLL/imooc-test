//封装通过Class获取元素的方法
//类名，父元素下的Class（可不传）
function getByClass(clsName, parent) {
  //若有父元素传入，不要传入父元素这个对象，而是传入父元素的ID;若没有传入，则用document
  var oParent = parent ? document.getElementById(parent) : document,
    //新建空数组
    eles = [],
    //获取所有元素，*号表示匹配该页面里所有的标签
    elements = oParent.getElementsByTagName('*');

  //可以初始化多个变量
  for (var i = 0, l = elements.length; i < l; i++) {
    if (elements[i].className == clsName) {
      //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
      eles.push(elements[i]);
    }
  }
  return eles;
}

//页面加载
window.onload = drag;

function drag() {
  //因为getByClass方法返回一个数组，所以取数组的第一个[0]
  var oTitle = getByClass('login_logo_webqq', 'loginPanel')[0];
  //拖曳函数
  oTitle.onmousedown = fnDown;
  //关闭函数
  var oClose = document.getElementById('ui_boxyClose');
  oClose.onclick = function () {
    document.getElementById('loginPanel').style.display = 'none'
  }
  //切换状态
  var loginState = document.getElementById('loginState'),
    stateList = document.getElementById('loginStatePanel'),
    lis = stateList.getElementsByTagName('li'),
    //状态文本
    stateTxt = document.getElementById('login2qq_state_txt'),
    //状态图标
    loginStateShow = document.getElementById('loginStateShow')

  //点击列表
  loginState.onclick = function (e) {
    //显示列表（阻止冒泡到document防止点击空白处隐藏列表失效）
    e = e || window.event;
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.cancelBubble = true;
    }
    stateList.style.display = 'block'
  }

  //鼠标滑过、离开和点击状态列表
  //遍历Li
  for (var i = 0, l = lis.length; i < l; i++) {
    //鼠标滑过
    lis[i].onmouseover = function () {
      this.style.background = '#ccc'
    }
    //鼠标离开
    lis[i].onmouseout = function () {
      this.style.background = '#fff'
    }
    //鼠标点击(阻止冒泡到div使其列表隐藏)
    lis[i].onclick = function (e) {
      //阻止冒泡
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true;
      }

      //把点击的ID属性取出来
      var id = this.id;
      //点击后隐藏整个面板
      stateList.style.display = 'none';
      //替换文本，点击某个ID下的stateSelect_text类
      stateTxt.innerHTML = getByClass('stateSelect_text', id)[0].innerHTML;
      //先清空类
      loginStateShow.className = '';
      //再添加类
      loginStateShow.className = 'login-state-show ' + id;

    }
  }
  //页面中任何位置点击使列表隐藏
  document.onclick = function (e) {
    stateList.style.display = 'none';
  }
}




//封装fnDown函数
function fnDown() {
  //解决兼容性
  event = event || window.event;
  //选取面板
  var oDrag = document.getElementById('loginPanel'),
    //在X轴上的距离=光标X左边-oDrag盒子和浏览器窗口左边距离==光标与oDrag之间的距离
    disX = event.clientX - oDrag.offsetLeft,
    disY = event.clientY - oDrag.offsetTop;

  //移动
  document.onmousemove = function (event) {
    event = event || window.event;
    //封装函数
    fnMove(event, disX, disY);
  }
  //释放
  document.onmouseup = function (event) {
    //卸载事件时，让事件为null就好了
    document.onmousemove = null;
    document.onmouseup = null
  }
}
//修正oDrag位置
function fnMove(e, posX, posY) {
  var oDrag = document.getElementById('loginPanel'),
    l = e.clientX - posX,
    t = e.clientY - posY,
    //获取窗口的宽和高
    winW = document.documentElement.clientWidth || document.body.clientWidth,
    winH = document.documentElement.clientHeight || document.body.clientHeight,
    //拖动的最大宽度和高度
    //窗口的宽-oDrag的宽
    //-10为了照顾多出来的关闭按钮
    maxW = winW - oDrag.offsetWidth - 10,
    maxH = winH - oDrag.offsetHeight;

  //判断oDrag是否到达边缘
  if (l < 0) {
    l = 0
  } else if (l > maxW) {
    l = maxW
  }
  if (t < 0) {
    t = 10
  } else if (t > maxH) {
    t = maxH
  }
  oDrag.style.left = l + 'px';
  oDrag.style.top = t + 'px';
}

/*不完美拖动
//鼠标按下在整个页面移动
document.onmousemove=function(event){ 
  //解决兼容性
  event=event||window.event;
  //获取鼠标坐标并显示在标题上
  //document.title=event.clientX+','+event.clientY;
  oDrag.style.left=event.clientX+'px';
  oDrag.style.top=event.clientY+'px'; 
}
*/