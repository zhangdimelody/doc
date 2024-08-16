## ECMAScript 6 知识点笔记

---------------

#### let var

#### let
1. let 只在命令所在的代码块儿里有效，适用于 for 循环，

```js
// 用var定义的for循环
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

// 用var定义
var a = [];
for (var i = 0; i < 10; i++) {
    (a[i] = function (i) {
      console.log(i);
    })(i);
}
a[6](6); // 6

// 用let定义
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

```

2. 不存在提升变量
3. 暂时性死区，以为let和const是只在代码块儿里有效，如果代码块里有let或者const，不再受外部影响。

```js
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
暂时性死区的本质是：一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的时候，才可以获取和使用该变量。


#### 块级作用域
1. ES5 只有全局作用域和函数作用域，没有块级作用域，会有不合理的场景。
<br>
```js
// 1. 内部变量可能覆盖外层变量，在函数体内，由于变量提升，导致内层tmp覆盖了外层的。
var tmp = new Date();
function f(){
  console.log(tmp);
  if (false){
    var tmp = "hello world";
  }
}
f() // undefined

// 2. 用来计数的循环变量泄露为全局变量
var s = 'hello';
for (var i = 0; i < s.length; i++){
  console.log(s[i]);
}
console.log(i); // 5

```

2. let实际上为JavaScript新增了块级作用域

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
//上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。

```

3. ES6 函数本身的作用域在其所在的块儿级作用域之内

```
立即执行函数
(function(){
  ...
}())

// ES6中
{
  ...
}

```
#### 解构赋值

```js
var a = 1;
var b = 2;
var c = 3;

//ES6写法，模式匹配
var [a,b,c] = [1,2,3];
//使用嵌套数组进行解构demo
let [x,,y] = [1,2,3]
let [head, ...tail] = [1,2,3] //head 1 ,tail [2,3]
let [x,y, ...z] = ['a'] //x a, y undefined, z []
//解析不成功，变量的值为undefined

//允许默认值
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a'] // x='a', y='b'
[x, y = 'b'] = ['a', undefined] // x='a', y='b'

//注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null

//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f(){
  console.log('aaa');
}

let [x = f()] = [1];
//上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

```
对象：

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

注意：对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。采用这种写法时，变量的声明和赋值是一体的。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
模式不能使用圆括号,可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```
#### 字符串扩展

#### 正则的扩展
字符串对象有4个方法：match() replace() search() split()

#### 数值的扩展
* 这两个新方法只对数值有效，非数值一律返回false
* isFinite() //是有限的
* isNaN()
* Number.parseInt()  Number.parseFloat() 将全局方法parseInt() parseFloat()移植到Number对象上，行为保持不变，目的在于：逐步减少全局性方法，使语言逐步模块化。
* Number.isInteger() 判断一个值是否为整数。 3和3.0是同一个值，因为存储方式一样。
* Number.EPSILON 实质是一个可以接受的误差范围
* JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
* Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。


```js
Number.isFinite(15);    // true 有限的
Number.isFinite(0.8);    // true
Number.isFinite(NaN);    // false 无限的
Number.isFinite(Infinity);    // false
Number.isFinite(-Infinity);    // false
Number.isFinite('foo');    // false
Number.isFinite('15');    // false
Number.isFinite(true);    // false

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

Math.pow(2, 53) // 9007199254740992
Math.pow(2, 53) === Math.pow(2, 53) + 1  //true

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false

9007199254740993 - 990 //因为存储时会按9007199254740992进行存储
//9007199254740002
```
#### 数组的扩展

* Array.from() 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
* Array.of() 用于将一组值转换为数组。
* [].copyWithin(target,start包含,end不包含)
* ES6则是明确将空位转为undefined



```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
let arr3 = [...arrLike]
let arr4 = Object.assign([],arrayLike)

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.of(3, 11, 8) // [3,11,8]

[NaN].indexOf(NaN)
// -1 查不到NaN
[NaN].findIndex(y => Object.is(NaN, y))
// 0  可以找到NaN

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

```
#### 对象的扩展
1. 属性简洁表示法

```js
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: foo};
```
2. 属性名表达式

```js
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};
obj.hello() // hi

//函数的name属性，返回函数名
var person = {
  sayName: function() {
    console.log(this.name);
  },
  get firstName() {
    return "Nicholas"
  }
}

person.sayName.name   // "sayName"
person.firstName.name // "get firstName"
```
3. 函数的name属性，返回函数名(shang)
4. Object.is用来比较两个值是否严格相等。与（===）行为一致。

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

//Object.assign可以用来处理数组，但是会把数组视为对象
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
1). 为对象添加属性
2). 为对象添加方法

```js
1.
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
2.
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};

在实现上，__proto__调用的是Object.prototype.__proto__。
```

3. __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。

#### Symbol
1. ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Number Boolean String Object Undefined Null
2. Symbol是一种类似于字符串的数据类型。
3. Symbol值不能与其他类型的值进行运算，会报错。

```js
var s1 = Symbol('foo');
s1 // Symbol(foo)

var sym = Symbol();
Boolean(sym) // true

var mySymbol = Symbol();
var a = {};

//Symbol值作为对象属性名时，不能用点运算符。
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

```
#### Proxy Reflect ?
* Proxy 代理，在目标对象前设一层“拦截”，外界对该对象访问，必须先通过这层拦截。
* Refect 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

```

#### 二进制数组

#### Set Map数据结构
* Set 是类似于数组，但是成员的值是唯一的，没有重复值。Set本身是一个构造函数，用来生成Set数据结构。
* Set内部判断两个值是否不同，使用的算法类似于精确相等运算符（===），这意味着，两个对象总是不相等的。唯一的例外是NaN等于自身（精确相等运算符认为NaN不等于自身）。
  - 属性：Set.prototype.constructor  Set.prototype.size
  - 操作方法：add(value)返回Set结构本身 delete(value)返回布尔类型 has(value)返回布尔类型 clear()清除所有


```js
var s = new Set();
[2,3,5,4,5,2,2].map(x => s.add(x))
for (i of s) {console.log(i)}
// 2 3 5 4

var set = new Set([1, 2, 3, 4, 4])
[...set]
// [1, 2, 3, 4]

function divs () {
  return [...document.querySelectorAll('div')]
}
var set = new Set(divs())
set.size // 56
// 类似于
divs().forEach(div => set.add(div))
set.size // 56

```
17.9.25
```js
class Point(){
  constructor(){
    ...
  }
  toFunc(){
    ...
  }
}
= 
function Point(){
  
}
Point.prototype.toFunc = function(){
  ...
}
```


### ?? 和 ?.
#### ?? 和 || 区别
1. ??空值合并运算符只会在左侧操作数为 null 或 undefined 时返回右侧操作数
2. || 在左侧操作数为假值时会返回右侧操作数，""、0、false、null、undefined 等会被认为是假值

#### 支持 ?? + ?.
1. 安装babel插件
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ]
}
```






