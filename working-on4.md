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
	console.log(c)
	function a(){
		console.log(c)
	}
	a()
	console.log(c)
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
	var Func = function(){}
	Func.prototype = o
	return new Func()
}
newObj(object)


* 3 寄生式继承 `object.create()`

var func = function(o){
	var clone = Object.create(o)
	clone.getName = function(){
		console.log(this.name || '2')
	}
	return clone
}
var obj = {
	name: '12'
}
var newOne = func(obj)

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


- position: sticky; // >= 安卓6  ios8

