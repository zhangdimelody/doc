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

















