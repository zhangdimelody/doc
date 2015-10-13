#### 2015.09.01  csstriggers.com 
    css重绘的问题
    eg: 内层height变，外层没有重绘
        解决方案：改变外层 可以重绘的css属性

#### 09.03
    tap-highlight-color: transparent; //a标签点击不显示默认背景色
    touch-callout: none; //禁止系统默认菜单
    user-select: none; //用户不能选择元素中的任何内容
#### 09.09
    1. *line-height:0; *//消除inline-block元素内部的元素行高去掉,display:block;块儿元素没有上下外边距了
    2. 适配
        * (eg:1像素边框，在2倍屏幕上为2“占位”，3倍屏上为3“占位”，但设计师就要1“占位”)

````
        // 2倍屏
        @media only screen and (-webkit-min-device-pixel-ratio:2.0)
        ,only screen and (-o-min-device-pixel-ratio:2.0)
        ,only screen and (min-device-pixel-ratio:2.0){
            h1{
                transform: scaleY(0.5);
                -webkit-transform: scaleY(0.5);
            }
        }
        // 3倍屏
        @media only screen and (-webkit-min-device-pixel-ratio:2.5)
        ,only screen and (min-device-pixel-ratio:2.5){
            h1{
                transform: scaleY(0.334);
                -webkit-transform: scaleY(0.334);
            }
        }

````
        * 基于表格布局的垂直居中 `display:table-cell;vertical-align: middle;` ?
        * 计算间距 `font-size`, `line-height`,`padding`,`margin`
    
    3. px em rem 区别
        * PX实际上就是像素，用PX设置字体大小时，比较稳定和精确。
        * EM就是根据基准来缩放字体的大小。EM实质是一个相对值，而非具体的数值。这种技术需要一个参考点，一般都是以<body>的“font-size”为基准。em是相对于父元素的属性而计算的。
        * EM是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而Rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值。
        <br/>
        除了IE6-IE8r，其它的浏览器都支持em和rem属性，px是所有浏览器都支持。

    4. 模拟hover
```javascript
    var myLinks = document.getElementsByTagName('a');
    for(var i = 0; i < myLinks.length; i++){
    　　myLinks[i].addEventListener(’touchstart’, function(){this.className = “hover”;}, false);
    　　myLinks[i].addEventListener(’touchend’, function(){this.className = “”;}, false);
    }
```
#### 10.12
websocket 是 h5 提供的在单个TCP连接上进行全双工通讯的协议。浏览器和服务器只用做一个握手动作，形成一条快速通道，二者就可以数据互相传送。

推送技术对比：
* 旧方法：轮询

    轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP request，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而HTTP request的header是非常长的，里面包含的数据可能只是一个很小的值，这样会占用很多的带宽和服务器资源。
* Comet：使用ajax，可双向通信，但依然要发请求，且Comet中采用长链接，这也会大量消耗服务器带宽和资源。
* websocket：能更好的节省服务器资源和带宽并达到实时通讯。

#### 10.13
* 事件绑定
```js
//点击事件绑定方法1
var btn = document.getElementById('lucky-draw')
btn.onclick = function () {
  //do something
}

//方法2
btn.addEventListener('click', function () {
  //do something
}, false)

//方法3
$btn.on('click', function () {
  //do something
})

//方法4
$(document.body).on('click', '#lucky-draw', function () {
  //do something
})

```

1. 在jQuery中，事件代理是指：把事件绑定到父级元素，然后等待事件通过DOM冒泡到该元素时再执行。在事件侦听过程中有两种触发事件的方式：事件捕获和事件冒泡。事件冒泡更快，效率更高。

* 事件捕获：事件在DOM中向后代元素下沉。
* 事件冒泡：事件从发生事件的源元素通过DOM向上冒泡。

2. bind()、live()、delegate()、on()四者的区别，[参考文献](http://blog.csdn.net/helloliuhai/article/details/19987509)

* **bind**
```js
$( "#members li a" ).bind( "click", function( e ) {} ); 
$( "#members li a" ).click( function( e ) {} );
```
两行代码所完成的任务都是一致的，把event handler加到全部的匹配的<a>元素上，存在效率问题：1，我们隐式地把click handler加到所有的a标签上，这个过程是昂贵的;2，在执行的时候也是一种浪费，因为它们都是做了同一件事却被执行了一次又一次。
<br>
tips:<br>
1. .click(), .hover()...这些非常方便的事件绑定，都是bind的一种简化处理方式
2. 当页面加载完的时候，你才可以进行bind()，所以可能产生效率问题

* **live**
```js
$('a').live('click',function()
{ 
    alert("That tickles!");
});
```
1. 从1.7开始已经不被推荐了。
2. jQuery绑定处理函数到 $(document) 元素，并把 ‘click’ 和 ‘a’ 作为函数的参数。有事件冒泡到document节点的时候，检查这个事件是不是 click 事件，target element能不能匹配 ‘a’ css选择器，如果两个条件都是true，处理函数执行。
3. 当使用event.stopPropagation()是没用的，因为都要到达document
4. Chaining没有被正确的支持
5. 也可以绑定到指定元素：`$('a',$('#container')[0]).live(...);`

* **delegate**
```js
$('#container').delegate('a','click',function()
{ 
    alert("That tickles!")
});　　
```
1. jQuery扫描文档找到 $(‘#container’)，绑定处理函数到他的 click 事件，’a’ css选择器作为函数的参数。当有事件冒泡到 $(‘#container’)，检查事件是不是 click，并检查target element是不是匹配css选择器，如果两者都符合，执行函数。
2. [与live区别](http://blog.csdn.net/helloliuhai/article/details/19987509)：可以选择把这个事件放到哪个元素上了；chaining被正确的支持了。live方法有一个最大的缺点，只能用css选择器。
3. 可以用在动态添加的元素上

* **on**
其实.bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate(),也是一样的都是通过.off()来实现的。on提供了一种统一绑定事件的方法

* **总结**
1. 用.bind()的代价是非常大的，它会把相同的一个事件处理程序hook到所有匹配的DOM元素上
2. 不要再用.live()了，它已经不再被推荐了，而且还有许多问题
3. delegate会提供很好的方法来提高效率，同时我们可以添加一事件处理方法到动态添加的元素上。
4. 我们可以用.on()来代替上述的3种方法。

* **阻止时间冒泡**
```js
$('a').bind('click',function(){  
    e.preventDefault();   
    //or   
    e.stopPropagation();
})
//但是在这里，用 live 或 delegate 方法绑定的事件会一直传递到事件真正绑定的地方才会执行。这时其他的函数已经执行过了。
```
```js
if (window.event) {
  e.cancelBubble=true;// ie6、7、8下阻止冒泡
} else {
  //e.preventDefault();
  e.stopPropagation();// 其它标准浏览器下阻止冒泡
}
```
  



















