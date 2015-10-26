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

















