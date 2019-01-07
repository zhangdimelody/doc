### 3.13

#### 304 ---- 协商缓存 
* 通信一次

#### 200 (from cache) ---- 本地缓存
* (cache-control/expires) 无需通信
[浏览器缓存详解](https://blog.csdn.net/eroswang/article/details/8302191)


#### 静态资源优化方案，基本上要实现这么几个东西：
1. 配置超长时间的本地缓存 —— 节省带宽，提高性能
2. 采用内容摘要作为缓存更新依据 —— 精确的缓存控制
3. 静态资源CDN部署 —— 优化网络请求
4. 更新资源发布路径实现非覆盖式发布 —— 平滑升级


### 3.30
#### 同构JavaScript应用的概念：一份代码同时在客户端和服务端渲染的JavaScript应用。

* [同构](http://monring.com/front_end/isomorphic-javascript-applications.html)
* 在服务端渲染静态页面，还可以在客户端完成复杂的交互


### Hybird 模板本地化

优点：

* 本地化模板提高页面打开速度，减少用户等待时间
* 模板可更新，版本控制更方便可控，收敛快
* Web页面和NA内置代码实现一套代码，减少开发成本
* 上手成本小，开发就是实际开发Web（H5）页面，通过构建工具，生成Web页面和NA模板包不同的代码
* 标准H5代码，迁移成本小，通过Node和构建工具，可以做到H5版本前后同构，将来还可以不改代码的前提下适配PWA

- scheme 协议有长度限制，20000，但有人试过很长也是可以传输的 use at your risk


let cc = function(){
	let c=0
	console.log(c)  // 0
	function a(){
		console.log(c) // 0
	}
	a()
	console.log(c)  // 0
}

#### gzip 压缩 前端
* 服务器根据请求头中的 accept-encoding 来判断浏览器是否支持压缩功能，如果这个值包含有gzip，就表明浏览器支持gzip压缩内容的浏览


#### 优化
* 打点：
* 加载是并行的，执行是串行的
	- js后面的点 – js前面的点 ≠ js的加载时间  
	- html里面外联的js文件，前一个文件的加载会阻塞下一个文件的执行；而如果a.js负责渲染并会动态拉取js、拉取cgi并做渲染，会发现它后面的js文件再怎么阻塞也不会影响到它的处理

如果html的返回头包含chunk，则它是边返回边解析的，不然就是一次性返回再解析。这个是在服务器配置的

#### vue webpack 代码分割
* 路由：
```js
const AsyncComponent= () => import('./AsyncComponent')

new VueRouter({
  routes: [
    { path: '/test', component: AsyncComponent}
  ]
})
```
* 组件：
```js
new Vue({
  // ...
  components: {
    'AsyncComponent': () => import('./AsyncComponent').then({ AsyncComponent }) => AsyncComponent
  }
})
```
* Vuex 模块代码分割
```js
const store = new Vuex.Store()

import('./store/test').then(testModule => {
  store.registerModule('test', testModule)
})

```

### 转时区
```js
//东2区，东时区记做正数
var zoneOffset = 2;
//算出时差,并转换为毫秒：
var offset2 = new Date().getTimezoneOffset()* 60 * 1000;
//算出现在的时间：
var nowDate2 = new Date().getTime();
//此时东2区的时间
var currentZoneDate = new Date(nowDate2 + offset2 + zoneOffset*60*60*1000);

console.log("东2区现在是："+currentZoneDate);
```

### webpack 优化项目
* 分析工具：webpackAnalysisPlugin
* 按需加载 require (WebpackChunkName)
* uglifyPlugin
* tree shaking ( import { debounce } from 'filepath' )
* 第三方引入
* dllplugin dlldeferplugin


```
1.
const All = () => import(/* webpackChunkName: "all" */'../view/all.vue')
const Video = () => import(/* webpackChunkName: "video" */'../view/video.vue')
const Photoset = () => import(/* webpackChunkName: "photoset" */'../view/photoset.vue')
const Topic = () => import(/* webpackChunkName: "topic" */'../view/topic.vue')

2.模块化引入
import _isEmpty from 'lodash/isEmpty'

3.
uglifyPlugin

4.
dllPlugin dllReferencePlugin

5. scope hoisting (减少了约4k)
	plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]

```

### nginx 设置打开 gzip 服务
* 打开配置文件 nginx.conf找到gzip on 把前面的注释符号#去掉即可开启GZIP服务。然后配置GZIP即可。
```
Gzip on;

gzip_min_length 1024;

gzip_buffers   4  8k;

gzip_types   text/plain application/x-javascript text/css  application/xml;

```

#### js继承
```js

* 1 原型链继承+构造函数继承
var Animal = function(name, age){
	this.name = name
	this.age = age
}
Animal.prototype.getName = function(){
	console.log(this.name)
}

var Cat = function(){
	Animal.apply(this, arguments)   //!!!!!!
}
Cat.prototype = new Animal()   //!!!!!!
Cat.prototype.contructor = Animal  //!!!!!!
Cat.prototype.meow = function(){
	console.log('meow')
}
* 2 原型式继承
var object = {
	name: 'dd',
	getName: function(){
		return this.name
	}
}
var newObj = function(o){
	var Parent = function(){}
	Parent.prototype = o
	return new Parent()
}
newObj(object)


* 3 寄生式继承 `object.create()`

var func = function(Parent){
	var Child = Object.create(Parent)
	Child.getName = function(){
		console.log(this.name || '2')
	}
	return Child
}
var Parent = {
	name: '12'
}
var newOne = func(Parent)

* 4 寄生组合继承

function inheritFunc(Child, Parent){
	var prototypeObj = Object.create(Parent.prototype)
	prototypeObj.constructor = Child
	Child.prototype = prototypeObj
}

function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
Parent.prototype.sayName = function () {
  console.log(this.name)
}
function Child(name, job) {
  // 继承属性
  Parent.call(this, name)
  
  this.job = job
}
// 继承
inheritPrototype(Child, Parent)
var instance = new Child('Jiang', 'student')
instance.sayName()

* 5 ES6新增了一个方法，Object.setPrototypeOf，可以直接创建关联，而且不用手动添加constructor属性

// 继承
Object.setPrototypeOf(Child.prototype, Parent.prototype)
console.log(Child.prototype.constructor === Child) // true


* 6 extends继承
 class ColorPoint extends Point {
       constructor(x, y, color) {
          super(x, y); // 调用父类的constructor(x, y)
          this.color = color;
       }
       toString() {
          return this.color + ' ' + super.toString(); // 调用父类的toString()
       }
    }
```


- position: sticky; // >= 安卓6  ios8


#### instanceof
- instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
- `object instanceof constructor`



子域名跨域问题通过在子域名设置 document.domain 
src 都可以跨域，script 等是被渲染到页面的时候发起跨域请求 img src 是每次改变时都会发请求
jsonp 是通过引入script标签发起请求再由服务器端 调该yemian的function将数据返回
h5
access control allow origin  服务器设置acao
postMessage

get post区别
get 长度限制 2083bite
get 是幂等请求 post 不是
post 不会把请求信息暴露在url上
bite - kb - mb - gb - tb

类型
识别类型 typeof instanceof Object.prototype.toString()
1、HTTP缓存（对比缓存、强制缓存）
2、对PWA的了解（如果简历上有写）
3、array flatten
4、commonjs ES6 module 循环引用
5、实现一个Event trigger
6、BFC IFC
7、正则最多两位小数
绑定监控的实现原理
如何遍历所有节点
new 
class
写回文
promise

1.
200 不走缓存 正常返回
304 etag lastmodified 
200 from disk 不会有网络请求 expires /cache


service worker
#[调试方式](https://x5.tencent.com/tbs/guide/serviceworker.html)
* https
* 最大作用域为 sw 文件所在目录下
* sw 是 web worker 的一种，不能操作 dom

sw 激活时同时去除旧版本
更新：只要 service workers 文件有任何一点的修改，浏览器就会立即装载它，让它 install，并进入 Waiting 的状态，而并没有立即 activate。
* 只有当用户将浏览器关闭后，重新打开页面时，旧的 service workers 才会被新的 service workers 替换。
* 可以在 install 事件中 self.skipWaiting 方法来跳过等待，直接进入 activate 状态
* 同样的，可以在 activate 事件中调用 self.clients.claim 方法来更新所有客户端上的 service works

#### new 步骤
var child = new Parent()

（1）创建一个新对象；

（2）将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；

（3）执行构造函数中的代码（为这个新对象添加属性）；

（4）返回新对象。

```js
  var obj = new Animal('cat') 
=== 
  var obj = {};
  obj.__proto__ = Animal.prototype;
  Animal.call(obj,"cat");  //相当于 var result = obj.Animal("cat")
```












