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

















