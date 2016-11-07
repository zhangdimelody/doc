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

#### coordinate systems from spatial anchors (空间锚点的坐标系), stationary frames of reference (固定参考系统) :

* stationary frames of reference 能保证一个固定的距离，保证了 hologram 与用户距离稳定，但是会引起漂移。
* spatial anchors 确保了 hologram 一直都在固定的位置，不会漂移。






























 


