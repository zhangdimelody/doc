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
<br>其实.bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate(),也是一样的都是通过.off()来实现的。on提供了一种统一绑定事件的方法
<br>

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

#### apply/call/bind 比较
* [参考文档](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=210721256&idx=1&sn=257732ae0a08a375da33238ec6061d44&scene=1&srcid=1013UTTx2icGjVzNnhsKfXvH&key=2877d24f51fa5384989d1b399c81e2ec79d4de591ed62e2bf4d319557c0b4f9593fd25e27f77b7c3ee6179e47338e911&ascene=0&uin=NDY4NzQwNTYw&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=11020201&pass_ticket=al3q8Ic0a17V27oxKOApNpPVGk04H2rGKYClIKWi%2BScg40L%2BzokfoNZuwU%2B%2Bcri7)
* 定义：在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
* 面试题
    定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：
```js
    function log(msg)　{
      console.log(msg);
    }
    log(1);    //1
    log(1,2);  //1
```
    上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：
```js
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```
* apply (参数是array格式)
* call (参数是a,b,c格式)
* bind 与以上不一致，不是立即调用的

### 10.16

#### css3 box-sizing 的值
* content-box css标准指定的默认样式，盒模型，width包括padding，border
    - 定义: .box{ width:350px; border:10px solid black; }
    - rendered in browser: .box{ width:370px; }

* border-box IE文档是怪异模式时，模拟没有正确支持盒子模型的状态。

### 10.19

#### 深入理解js闭包

1. 闭包的特性
    * 函数嵌套函数
    * 函数内部可以引用外部的参数和变量
    * 参数和变量不会被垃圾回收机制回收

2. 闭包主要用来：设计私有方法和变量
3. 一般函数执行完之后，局部活动对象会被销毁，内存仅保存全局作用域。但闭包不是，闭包会使变量始终保存在内存中，如果不当使用会增大内存消耗。

```js
function aa(){
    var i = 1;
    return function(){
        alert(i++);
    }
}
var func = aa(); //方法命名
func(); //执行方法 alert(1)  i++, i还在
func(); // alert(2)
func = null; //i被销毁
```

4. 变量的叠加
```js
<script>
// 全局变量的叠加
    var a = 1;
    function abc(){
            a++;
            alert(a);
    }
    abc();              //2
    abc();            //3

// 局部变量
    function abc(){
            var a = 1;
            a++;
            alert(a);
    }
    abc();       //2
    abc();      //2

// 局部变量的叠加（创建闭包）
    function outer(){
        var a = 1;
        return function(){
            a++;
            alert(a);
        }
    }
    var abc = outer();
    abc(); // 2
    abc(); // 3
</script>
```

#### js 自执行匿名函数

* "立即调用的函数表达式"

```js
function(){}(); // 报错，因为 function(){} 是function的声明，不是function表达式
function(){}(1); // 报错，相当于 
// function(){}
// (1)

// 由于括弧()和 JS的&& ，异或，逗号等操作符是在函数表达式和函数声明上消除歧义的
(function(){}()) // 正确，因为javascript里面不能包含语句，解析器会将相应代码解析成function表达式，而不是function声明。
(function(){})() // 正确，因为解析器知道其中一个是表达式，其他也默认为表达式。
```

```js
// 由于括弧()和 JS的&& ，异或，逗号等操作符是在函数表达式和函数声明上消除歧义的
!function () { /* code */ } ();   //true
~function () { /* code */ } ();   // -1
-function () { /* code */ } ();   //NaN
+function () { /* code */ } ();   //NaN
```

* 用闭包保存状态，经典例子：

- 例子1:

```js
    var elems = document.getElementsByTagName('a');

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + i);
        }, 'false');
    }
```
<br>当循环执行以后，在点击的时候i才获得数值。所以说无论点击那个连接，最终显示的都是I am link #10（如果有10个a元素的话）<br>

- 例子2：

```js
var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    (function (lockedInIndex) {
        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, 'false');
    })(i);
}

// 这个是可以用的，因为他在自执行函数表达式闭包内部
// i的值作为locked的索引存在，在循环执行结束以后，尽管最后i的值变成了a元素总数（例如10）
// 但闭包内部的lockedInIndex值是没有改变，因为他已经执行完毕了
// 所以当点击连接的时候，结果是正确的
```
- 例子3：

```js

var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', (function (lockedInIndex) {
        return function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        };
    })(i), 'false');
}
// 你也可以像下面这样应用，在处理函数那里使用自执行函数表达式
// 而不是在addEventListener外部
// 但是相对来说，上面的代码更具可读性

```
### 10.26

#### 数据类型
* Number : 数字包括浮点数
* Boolean : 真假（true false）
* String : 字符串
* Object : 复杂数据类型
* Null : 空指针，表明指向的内存空间不存在
* Undefined : 未定义，表明指向的内存空间存在，但是没有数据

```js
var obj = {};
alert(null==undefined);  // true
alert(null);    //'object'(在不同浏览器中也可能为'null')
typeof null   // "object" typeof是操作符,typeof(null)

```



















