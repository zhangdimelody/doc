### 11.17 react talk准备

* 虚拟DOM
    react从不直接操作DOM。react在内存中维护了一个快速响应的DOM描述。render()方法返回一个DOM的描述。React能利用内存中的描述来快速计算出差异，然后更新浏览器中的DOM。

抛开“最佳实践”，重新思考前端界面的构建方式，于是有了React。

思考：
problems：
层叠更新的时候，需要整体刷新，那就每次变更都整体刷新吧？
复杂和频繁的 DOM 操作，通常是性能瓶颈产生的原因

1. 每次数据变化虚拟dom 都会重新生成，然后重新对比DOM树，进行替换。
2. 虚拟DOM是在浏览器端用js实现了一套DOM API。每次重新生成虚拟dom树，和上次的对比，得到DOM的区别。然后将需要变化的部分，进行更新到浏览器DOM。且，react可以批处理虚拟DOM刷新，在一个事件循环中两次数据变化会被合并（？多长时间内呢）。
3. 虚拟DOM树（长什么样？），是内存数据，性能极高，对实际dom仅仅是diff操作，所以能提高性能。（diff算法：React将原来的O(n^3)复杂度降低到了O(n)？）
4. 故，开发者只用关心数据整体。开发难度降低。
5. MVC对比React：
    MVC：实现了表现、数据、控制的分离，三个模块都需要开发者自己定义。
    React：新的思路，按照界面模块自然划分成不同组件。每个组件的UI和逻辑定义在他们内部。


React 的最大价值？
1. 高性能虚拟 DOM 【★★】
2. 声明式的、直观的编程方式（别样的组件化、JSX也不是核心）【★】
3. 封装过的事件机制
4. 服务器端 Render（忽略，不是核心，锦上添花）
5. 完善的错误提示信息

提纲：
高性能虚拟DOM why


react-router:
1）抽象。如果说，react是对DOM的抽象，那react-router就是对BOM的抽象。
2）强大的功能特性，如：使用Lifecycle实现页面退出前的保存提示；使用Route的onEnter实现登录验证；使用Redirect进行跳转；
3）后端渲染。在isomorphic应用中，可以与后端共享路由。
4）提升项目的可维护性，易于测试；比如，history机制从核心中拆离，使用hash, HTML5 History API还是内存，开发者可以自己任选，这让测试和后端渲染都变得非常容易。


1. 之前很流行的MVC前端框架，为什么会产生react？
    重绘 回流
2. react有哪些优点？
3. react核心：组件 虚拟DOM 
4. 核心的原理有..blabla

当数据变化的时候，会重新执行render。
render返回的既不是一个字符串也不是一个dom节点，是一个对将会呈现DOM的轻量描述。


自动绑定：将方法自动绑定到组件实例上，react把绑定的方法缓存起来，提高其性能。
事件代理：

react实现了一个“合成事件”（synthetic event）层，这个事件模型和w3c标准保持一致，
而且还消除了IE和W3C标准实现之间的兼容问题。

组件之间通信
1. 父子组件通信
父＝>子 通过props传递   子＝>父 refs
2. 非父子组件通信
在componentDidMount里加事件，在 componentWillUnmount 删除事件，当收到事件触发时调用 setState 更新UI。


react reactDOM

#### 12.7
* 执行顺序：
自执行匿名函数 》DOMContentLoaded 》load
* 函数执行：
    - 只有执行的时候会加载代码段到内存，执行完后，函数本身不在内存，名称还在
    - 不同浏览器的回收机制不一样，每隔多长时间回收or内存达到多少后去回收
    - js解析器不会为匿名函数建立索引

#### 12.23

##### redux
* Action 把数据从应用传到Store的有效载荷。是store数据的唯一来源。通过：store.dispatch()将action传到Store。
* Reducer 指明应用如何更新 state。
* 在redux应用中，所有state都被保存在一个单一对象中。



##### flux

### 2016.3.2

#### shift() unshift() push() pop()

```js
    //shift 去掉
    var arr = [];
    arr.unshift(1,2,3,4); // 进队列
    console.log(arr); // [1,2,3,4]
    arr.shift(); // 1 取得第一项 
    console.log(arr); // [2,3,4]

    //push() pop()
    var arr1 = [];
    arr1.push(1,2,3,4); //进栈
    arr1.pop(); // 4 取得最后一项
    console.log(arr1) // [1,2,3]
 
```


* shift() 返回数组第一个
* pop() 返回数组最后一个
* unshift() 在数组前面加元素
* push() 在数组后面加元素

### 2016.3.12

#### 移动端技术点

* 适配问题
* 滚动
* video 标签
* 分享

#### 3.16

##### webpack
* 常用命令
    - webpack -w   watch 方法，实时打包更新
    - webpack -p   对打包后的文件压缩
    - webpack -d   提供 sourceMap ，方便调试
    - webpack --colors    输出结果带彩色，用红色显示耗时过长的步骤
    - webpack --profile   输出性能数据，看到每一步的耗时
    - webpack --display-modules   默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块

* plugin: 开发中将多个页面的功用模块独立打包，从而利用浏览器的缓存机制来提高页面的加载效率，减少页面初次加载时间，只有某功能被用时，才去动态加载。需要用 CommonsChunkPlugin 插件。
```js
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    module.exports = {
        entry : { a : "./a", b : "./b"},
        output : { filename : "[name].js" },
        plugins : [ new CommonsChunkPlugin("common.js") ]
    }
    //在文件中引用如下：
    <script src="common.js"></script>
    <script src="a.js"></script>
    <script src="b.js"></script>

```

* plugin: loader 会将 js 文件打包合并，css 文件会以 style 的方式插入页面的 header 中。如果希望生成独立的 css 文件，以外链的形式加载就需要用 extract-text-webpack-plugin 插件。
```js
    plugin:[
        new ExtractTextPlugin('styles.css')   //最后会生成styles.css
    ]
```

* 静态资源服务器 webpack-dev-server
    - 基于 nodejs express 框架的轻量开发服务器；
    - 静态资源 web 服务器
    - 开发过程中监听文件变化，在内存中实时打包，进行热替换，自动刷新页面。
* 双服务器模式
    - 项目开发中，仅有一台静态服务器是不能满足需求的，我们需要另启一台web服务器，且将静态服务器集成到web服务器中，就可以使用webpack的打包和加载功能。
```js
    entry: [
        './src/main.js',
        'webpack/hot/dev-server',
        'wepack-dev-server/client?http://127.0.0.1:8080'
    ],
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: "http://127.0.0.1:8080/assets"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
```

* 中间件 webpack-dev-middleware 解决了在开发中得启用两服务器的问题，但只能在生产环境中使用，可以实现在内存中实时打包生成虚拟文件，供浏览器访问以及调试。
```js
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpack = require("webpack");

    var compiler = webpack({
        output: { path: '/' }
    });

    app.use(
        webpackDevMiddleware(compiler,{
            //options
        })
    );

```

#### 隐藏ios视频播放按钮

```css
::-webkit-media-controls-start-playback-button {
  display: none;
}
```

3.28

#### [img的空URL对性能的影响](https://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/)

* <img src="url(about:blank)" /> or <img src=" "> 都会像服务器发空请求，得404


8.20

VCD 原则（view controller data）


2016.10.28

### Hololens

## 开发问题总结
--------------------------------------

### unity 中的相关设置
* 场景显示在非内容框里面：unity中设置 other settings/virtual reality supported 要 checked
* 要访问外部网络接口：unity中设置 publishing settings/capabilities/InternetClient InternetClientServer PrivateNetworkClientServer 要 checked

### 概念理解

#### coordinate systems from spatial anchors (空间锚点的坐标系), stationary frames of reference (固定参考系统) :
#### [坐标系](https://developer.microsoft.com/en-us/windows/holographic/coordinate_systems)
* stationary frames of reference 能保证一个固定的距离，保证了 hologram 与用户距离稳定，但是会引起漂移。
* spatial anchors 确保了 hologram 一直都在固定的位置，不会漂移。
* attached frame of reference 始终在屏幕的固定位置，可用于定位“返回 UI 界面” 等。


### 2017.3.2

* 判断是数据还是对象 Object.prototype.toString.call( ary ) === '[object Array]'
* undefined 代表一个意想不到的没有的值
* null 代表预期没有的值 
* 可用 `Object.prototype.toString.call(undefined)` 来判断
* null 通常用作一个空引用一个空对象的预期,就像一个占位符。 typeof null = "object"

### SPA 单页面应用
* [有关单页面资料](https://github.com/xufei/blog/issues/5)
* 通常在单页应用中，无需像网站型产品一样，为了防止文件加载阻塞渲染，把js放到html后面加载，因为它的界面基本都是动态生成的。
* 管理路由具体的做法就是把产品功能划分为若干状态，每个状态映射到相应的路由，然后通过`pushState`这样的机制，动态解析路由，使之与功能界面匹配。
* 样式技巧：在模板中避免使用id
* 样式技巧：不同类型的组件的z-index落到各自的区间，以避免它们的冲突。
* 觉得这段话形容的很对：单页应用开发过程中，前后端是天然分离的，双方以API为分界。前端作为服务的消费者，后端作为服务的提供者。`在此模式下，前端将会推动后端的服务化。`当后端不再承担模板渲染、输出页面这样工作的情况下，它可以更专注于所提供的API的实现，而在这样的情况下，Web前端与各种移动终端的地位对等，也逐渐使得后端API不必再为每个端作差异化设计了。
* `部署模式改变` 耳目一新的感觉：“无后端”的Web应用，只需要自己编写静态Web页面，在某种BaaS（Backend as a Service）云平台上定制服务端API和云存储，集成这个平台提供的SDK，通过AJAX等方式与之打交道，实现注册认证、社交、消息推送、实时通信、云存储等功能。

#### js 对象中什么是可枚举性（enumerable）
* 可枚举性（enumerable）用来控制所描述的属性，是否将被包括在for…in循环之中。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。
    - for…in循环
    - Object.keys方法
    - JSON.stringify方法
* 至于for...in循环和Object.keys方法的区别，在于前者包括对象继承自原型对象的属性，而后者只包括对象本身的属性。如果需要获取对象自身的所有属性，不管enumerable的值，可以使用Object.getOwnPropertyNames方法。
```js
var o = {a:1, b:2};
o.c = 3;
Object.defineProperty(o, 'd', {
  value: 4,
  enumerable: false
});

o.d 
// 4  可以直接获取到
// 但以下三种方式不可以得到，有点类似“秘密”属性

for( var key in o ) console.log( o[key] ); 
// 1
// 2
// 3

Object.keys(o)  // ["a", "b", "c"]

JSON.stringify(o // => "{a:1,b:2,c:3}"
```

#### Object.defineProperty

* Object.defineProperty(obj, prop, descriptor)
* 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
* 数据描述符是一个拥有可写或不可写值的属性。
* 存取描述符是由一对 getter-setter 函数功能来描述的属性。
* 描述符必须是两种形式之一；不能同时是两者。

```js
Object.defineProperty(obj, "key", {
  __proto__: null, // 没有继承的属性
  value: "static"  // 没有 enumerable
                   // 没有 configurable 表示对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改。
                   // 没有 writable
                   // 作为默认值
});
```
[mdn defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)


2017.4.5
### 跨域通信

[相关文章](http://harttle.com/2015/10/10/cross-origin.html)

* 一类是Hack，比如通过title, navigation等对象传递信息，JSONP可以说是一个最优秀的Hack。
* 另一类是HTML5支持，一个是Access-Control-Allow-Origin响应头，一个是window.postMessage。

#### 设置domain 。。。。下面几个域名下的页面都是可以通过document.domain跨域互操作的： http://a.com/foo, http://b.a.com/bar, http://c.a.com/bar。 但只能以页面嵌套的方式来进行页面互操作，比如常见的iframe方式就可以完成页面嵌套：

```js
// URL http://a.com/foo
var ifr = document.createElement('iframe');
ifr.src = 'http://b.a.com/bar'; 
ifr.onload = function(){
    var ifrdoc = ifr.contentDocument || ifr.contentWindow.document;
    ifrdoc.getElementsById("foo").innerHTML);
};

ifr.style.display = 'none';
document.body.appendChild(ifr);

// 上述代码所在的URL是http://a.com/foo，它对http://b.a.com/bar的DOM访问要求后者将 document.domain往上设置一级：

// URL http://b.a.com/bar 页面中写
document.domain = 'a.com'
```
- document.domain 只能从子域设置到主域，往下设置以及往其他域名设置都是不允许的

#### 有 src 标签
    1. 原理：所有具有src属性的HTML标签都是可以跨域的，包括<img>, <script>
    2. 限制：需要创建一个DOM对象，只能用于GET方法
    3. important：不同的HTML标签发送HTTP请求的时机不同，例如<img>在更改src属性时就会发送请求，而script, iframe, link[rel=stylesheet]只有在添加到DOM树之后才会发送HTTP请求。

#### JSONP
原理：<script>是可以跨域的，而且在跨域脚本中可以直接回调当前脚本的函数。
限制：需要创建一个DOM对象并且添加到DOM树，只能用于GET方法

* `tips` : $.getJSON与$.get的区别是前者会把responseText转换为JSON，而且当URL具有callback参数时， jQuery将会把它解释为一个JSONP请求，创建一个<script>标签来完成该请求。

#### navigation 对象
原理：iframe之间是共享navigator对象的，用它来传递信息
要求：IE6/7

```js
// a.com
navigation.onData(){
    // 数据到达的处理函数
}
typeof navigation.getData === 'function' 
    || navigation.getData()

// b.com
navigation.getData = function(){
    $.get('/path/under/b.com')
        .success(function(data){
            typeof navigation.onData === 'function'
                || navigation.onData(data)
        });
}  
```

#### 跨域资源共享（CORS）(Access-Control-Allow-Origin HTTP响应头)
原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求
限制：浏览器需要支持HTML5，可以支持POST，PUT等方法

* 为 xhr 设置 withCredentials 后 CORS 方法跨域还可 携带Cookie (这就是用来授权认证？)

#### window.postMessage
原理：HTML5允许窗口之间发送消息
限制：浏览器需要支持HTML5，获取窗口句柄后才能相互通信

* tips: 注意IE8及小于IE8的版本不支持addEventListener，需要使用attachEvent来监听事件。

#### 技术点
* 实现 obj.scan().start().sleep(2000).end() //当有异步操作时处理方式
* 预防页面白屏的 js 技巧
* 实现 es6 super

|  i   | localhost | 127.0.0.1 | 本机IP|
| --------   | -----:  | :----:  | :----:  |
| 网络| 不联网 | 不联网 | 不联网  | 
| 传输 | 不使用网卡，不受防火墙和网卡限制   |  网卡传输，受防火墙和网卡限制 |  网卡传输 ，受防火墙和网卡限制|
| 访问 |  本机访问  | 本机访问  | 本机或外部访问|


















 


