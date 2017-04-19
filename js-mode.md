## JS 设计模式读书笔记

---------

原始类型：布尔 数值 字符串
高级类型：对象(数组是特殊的对象、包含可执行代码的函数型 函数是一等对象)      
       ：空类型(null)  未定义类型(undefined)


### 1. 富有表现力的 Javascript

#### 概念

* js 作用域是具有词法性质（lexically scoped）的 ＝ 函数运行在定义它的作用域中，而不是调用他的作用域中。
 
```js
var baz;
(function(){
  var foo = 10;
  var bar = 2;
  baz = function(){
    return foo * bar;
  }
})()

baz();  //可执行，因为运行在定义 baz 的时候

```
#### 继承
* 原型式继承
* 类式继承



### 2. 接口

#### js 模仿接口的三种方法：

* 注释法  .属于文档范畴
* 属性检查法 （检测是否含有该属性）
* 鸭式辨型法 （）

注: 不是很理解

2017.02.07

### 作用域
* 对于JavaScript而言，它的作用域是function-level scope
* 在JavaScript中，如果我们需要实现block-level scope，我们也有一种变通的方式，那就是通过自执行函数创建临时作用域.
* 推荐：任何时候，请使用var声明变量, 并放置在作用域的顶端.

#### 作用域提升
* 变量被提升
    - 对JavaScript解释器而言，所有的函数和变量声明都会被提升到最前面, 并且变量声明永远在前面，赋值在声明过程之后。
    - 
* 函数的声明方式主要由两种：声明式(function a(){})和变量式(var a = function(){})。
    - 声明式会自动将声明放在前面并且执行赋值过程。
    - 变量式则是先将声明提升，然后到赋值处再执行赋值。
    - 带有命名的函数变量式声明，是不会提升到作用域范围内的。(var a = function b(){}; a(); //这句可执行  b(){}; //这句不可执行
    - eg:

```js
function test() {
    foo(); // 因为是以变量的方式命名的 TypeError "foo is not a function" 
    bar(); // 声明式会自动提升 "this will run!"
    var foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
    function bar() { // function declaration, given the name 'bar'
        alert("this will run!");
    }
}
test();
<!-- 实际上等价于: -->

function test() {
    var foo;
    var bar;
    bar = function () { // function declaration, given the name 'bar'
        alert("this will run!");
    }

    foo(); // TypeError "foo is not a function"
    bar(); // "this will run!"

    foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
}
test();
```
### 变量的基本类型：
* 五种基本类型：
    - number
    - string
    - boolean
    - undefined
    - null  （typeof null 返回 object）
* 五种基本类型保存在内存中的栈中,大小固定,复制其变量时会创建这个值的一个副本。使用typeof区分。这些值是在底层上直接实现的，他们不是object，所以没有原型，没有构造函数。
* 引用类型的值是对象,保存在堆内存中。引用类型的变量实际上是一个指针,它保存在栈中,指向堆内存中的对象,复制引用类型变量实际是复制该指针,所以他们都指向同一个对象,用instanceof确定一个值是哪种引用类型。
* 检测一个对象的类型，强烈推荐使用 Object.prototype.toString 方法； 因为这是唯一一个可依赖的方式。

### tips:

* 定义类的属性时注意指明作用域。
* 原话为：同一函数创建的所有实例均共享一个原型。如果你给原型赋值了一个数组，那么所有实例都能获取到这个数组。除非你在某个实例中对其进行了重写，实事上是进行了覆盖。解释如下：


```js
// 下面的things1 覆盖了原始的类属性
function Thing() {
}
Thing.prototype.things = [];
var thing1 = new Thing();
var thing2 = new Thing();
thing1.things.push("foo");
console.log(thing2.things); //logs ["foo"]

// 正确做法
function Thing() {
    this.things = []; // 指明作用域
}
var thing1 = new Thing();
var thing2 = new Thing();
thing1.things.push("foo");
console.log(thing1.things); //logs ["foo"]
console.log(thing2.things); //logs []

```
### 原型链的方式实现继承（以前没有理解的现在懂了）

```js
function Thing1() {
}
Thing1.prototype.foo = "bar";

function Thing2() {
}
Thing2.prototype = new Thing1();


var thing = new Thing2();
console.log(thing.foo); //logs "bar"

```
* 注意:原型链底层函数中对this的操作会覆盖上层的值。

```js
function Thing1() {}
Thing1.prototype.foo = "bar";

function Thing2() {
    this.foo = "foo";
}
Thing2.prototype = new Thing1(); // this will cover Thing1's foo.

function Thing3() {
    this.foo = "zd";
}
Thing3.prototype = new Thing2(); // 在 new Thing3 时才会覆盖为 zd

var thing = new Thing3();
console.log(thing.foo); //zd
```
```js
function a(){}
a.prototype.abc = "1"  // 可以当默认值用？

function b(){
  this.abc = "2"
  return this;
}
b.prototype = new a(); // b 继承了 a
b.prototype.test = function(){
  console.log("hahah")
  return this;
}
b.prototype.test2 = function(){
  console.log("链是调用");
  return this;
}

var ads = new b();
ads.test().test2();

```

### 单例模式1

* 单例模式是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例类的特殊类。
* 通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。
* 比如 页面上的弹窗、唯一的xhr对象

```js
//可以创建一个通用的singleton
var singleton = function( fn ){
    var result;
    return function(){
        return result || ( result = fn .apply( this, arguments ) );
    }
}
var createMask = singleton( function(){
    return document.body.appendChild( document.createElement('div') );
})
//用一个变量来保存第一次的返回值, 如果它已经被赋值过, 那么在以后的调用中优先返回该变量. 而真正创建遮罩层的代码是通过回调函数的方式传人到singleton包装器中的. 这种方式其实叫桥接模式. 
```

### 模块化

* 匿名函数方法
    - 防止污染全局空间，使用对象方式圈定变量和方法，再通过立即执行函数，来将对象中私有变量保护起来，通过 return 返回公共变量与方法。
    - 缺点：动态添加方法的时候不方便，私有变量无法修改。

```js
var object = (function(){
    var count = 3;
    function add(){}
    function minus(){}
    return {
        count: count,
        add: add
    }
})()
```
* 放大模式
    - 下列代码为已有的 module1 添加方法。

```js
var module1 = (function(mod){
    mod.fuc3 = function(){

    }
})(module1)

```
* 宽放大模式
    - 加载的模块可能不存在 所以要兼容一下

```js
var module1 = (function(mod){
    mod.func3 = function(){};
})(window.module1 || {})

```

### 简单工厂模式2
* 简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口. 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。

```js
eg:
var request1 = Request('cgi.xx.com/xxx' , ''get' );
request1.start();
request1.done( fn );
```

* 使用 new 完成构造函数
    - 每 new 一次会在内存中生成复制的一份

```js
//通过这段代码, 在firefox, chrome等浏览器里，可以完美模拟new.
function A( name ){
    this.name = name;
}
function ObjectFactory(){
    var obj = {},
    Constructor = Array.prototype.shift.call( arguments );
    obj.__proto__ =  typeof Constructor .prototype === 'number'  ? Object.prototype:  Constructor .prototype;
    var ret = Constructor.apply( obj, arguments );
    return typeof ret === 'object' ? ret : obj;
}
    var a = ObjectFactory( A, 'svenzeng' );
    alert ( a.name );  //svenzeng
```
```js

// part one
var Person = function(name){
    var name = name || 'leo';
    return {
        setName: function(){},
        getName: function(){ return name; }
    }
}
var leo = new Person('test');
leo.getName();

// part two
var person = function(name) {
  var age = 10;
  function getName(name){
    return name
  }
  return {
    age: age,
    getName: getName
  }
}
var girl = new person('zd')
console.log(girl.age)
console.log(girl.getName()) //undefined
girl.age = 12
console.log(girl.age) //12
console.log(person().age) //10 复制了一份所以不会改变原有值

```
* 引入全局变量
    - JavaScript有一个特性叫做隐式全局变量，不管一个变量有没有用过，JavaScript解释器反向遍历作用域链来查找整个变量的var声明，如果没有找到var，解释器则假定该变量是全局变量，如果该变量用于了赋值操作的话，之前如果不存在的话，解释器则会自动创建它，这就是说在匿名闭包里使用或创建全局变量非常容易，不过比较困难的是，代码比较难管理。

```js
(function ($, YAHOO) {
    // 这里，我们的代码就可以使用全局的jQuery对象了，YAHOO也是一样
} (jQuery, YAHOO));
```

* 基于 module 模式，声明全局变量（通过声明匿名函数，输出对象方式）

```js
var globalModule = (function(){
    var me = {};
    me.getName = function(){};
    return me;
}())

// 得到全局 globalModule 可以直接调用 globalModule.getName()
```




### 正则
(基础规则)[https://leohxj.gitbooks.io/front-end-database/content/javascript-regular-expressions/grammar.html]


### 观察者模式3

#### 推模式 or 拉模式
* demo 见 [http://localhost:8700/doc/pubsub-test.html](http://localhost:8700/doc/pubsub-test.html)
```js
// 数据格式搞清楚就很easy了

var topics = {
    "example1": [{
        tooken: 0,
        callback: callback
        }]
}
//代表了订阅了 example1 事件，在执行callback
//先订阅事件 
```


### 适配器模式4


### 代理模式5


### 桥接模式6


### 外观模式7


### 访问者模式8


### 策略模式9


### 模板方法模式10


### 中介者模式11


### 迭代器模式12


### 组合模式13


### 备忘录模式14


### 职责链模式15


### 享元模式16


### 状态模式17




### UMD (commonjs amd 糅合)

* UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。
* AMD 浏览器第一的原则发展 异步加载模块。
* CommonJS 模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。
```js
// UMD 模式
(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```
