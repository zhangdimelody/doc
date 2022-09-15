#### 8.4

#### commonjs  esModule 区别

* Commonjs 

1. 运行时加载
2. 输出值的拷贝（浅拷贝）

* esModule 

1. 静态分析编译
2. 输出值的引用





        ### 8.9 中设

1. Map object 区别
2. gis 坐标系转换  c r s
3. 优化方案
4. three 碰撞检测
5. three camera类型
6. 数据类型
7. cookie storage
8. ts
9. vue3 
10. 9宫格布局

### 8.15 翼欧

1. await async ，generator 的返回值（是迭代器）
2. Webpack5 更新点
3. Vue3  优化点，Composite API 与 mixins 的区别
4. ssr 服务端渲染，优化方向
5. 跨域带cookie，with credentials 加到哪里
6. Ref reactive 区别？使用场景

### 8.16  算法 齿轮易创

### 8.23  58

1. Css 盒模型，对瀑布流影响
2. 垂直居中
3. 闭包
4. 垃圾回收（标记清除、引用计数）对象的循环引用
5. localstorage
6. 数据绑定

### 8.23 滴滴

1. 算法：二叉树深度

### 8.24 hokdo

1. Vue-router hash / history

### 8.24 58 3d

1. 原生写下拉
2. 多边形内任意一点与其交集

### 8.25 58

1. 数组扩展运算，[a, ,b , ...c] = numberList
2. 垂直居中，高度50%，内部滚动，外部不影响

### 8.25 跨越速运

1. Provide / inject 不是响应式，需要传入一个响应式的数据引用
2. 方法中用filter 的方式： this.$options.$filters

### 8.26 西门子

1. https / http
2. http

### 8.29 希望学

```js
async foo() {
  console.log('foo start');
  await bar();
  console.log('foo end'); // await之后的是微任务
}
async bar() {
  console.log('bar run');
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeout');
}, 0)
foo();
new Promise((resolve, reject) => {
  resolve('promise1');
  console.log('promise2')
}).then(res => console.log(res))
console.log('script end')

// script start'
// foo start'
// bar run
// promise2
// script end'
// foo end
// promise1
// setTimeout

diff 算法

tcp 3次握手4次挥手

hybird jsbridge
```

### 8.30 作业帮

1. 手写promise.all

2. 闭包概念

3. ```js
   let a = 0, b = 0;
   function A (a) {
     A = function (b) {
       console.log(a + b++)
     }
     console.log(a++)
   }
   A(1)   // 1 a++ 先输出a 再++
   A(2)   // 4
   ```

### 8.31 航旅纵横

1. webpack gulp区别
2. jsbridge 原理，iframe src

### 9.1 长城

1. dom bom 区别
2. Diff算法
3. 深拷贝遇到递归怎么办

### 9.1 头条

1. 架构设计，项目中的优化
2. https
3. 移动端的离线包发布
4. 持续集成

### 9.2 好未来

1. cors：



### 9.8

### react

1. fiber
2. Typescript  declare  定义
3. requestIdleCallback 是 window 属性上的方法，它的作用是在浏览器一帧的剩余空闲时间内执行优先度相对较低的任务。



### 9.13 搜狐

Css加载阻塞，会阻塞dom渲染？加载会影响j s 执行

1. css加载不会阻塞DOM树的解析
2. css加载会阻塞DOM树的渲染
3. css加载会阻塞后面js语句的执行

浏览器为什么限制请求？

useEffect 和 useLayoutEffect 区别：https://zhuanlan.zhihu.com/p/348701319

Websocket 心跳



通常会问到的问题：
1.总结一些项目的亮点及你是怎么做的
2.技术选型上的考量
3.按需加载插件如何实现

问答题：
1.浏览器如何渲染页面的？
2.CDN的工作原理
3.JavaScript的事件循环是怎么一回事？和Nodejs的有什么区别吗？这样设计的原理是什么？
4.React hooks 中 setState发生了什么？ 

1.合并两个对象
题目描述

```js
const obj1 = {
  a: {
    b: 1,
    c: [2, 3, 4],
  },
  d() {
    console.log(5);
  },
};
const obj2 = {
  a: {
    c: [5],
    e: 10,
  },
  d: 5,
};

function merge(obj1, obj2) {}

console.log(merge(obj1, obj2));
// {
// a: {
// 		b: 1,
// 		c: [2, 3, 4, 5],
// 		e: 10,
// },
// d: 5,
// };
```



2.题目描述
假设 CSS 选择器有如下权重规则：

ID 选择器（如 #container），权重 1000
类、属性、伪类选择器（如 .element 、[type=text] 、 :hover），权重 100
标签、伪元素选择器（如 body 、 ::first-child ），权重 10

选择器表达式的权重为其包含选择器的权重之和，比如 #container > section 权重为 1010。请构造一个函数，对任意 CSS 选择器的优选级进行计算：

3.题目描述

```js
const entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
};
```

// 要求转换成如下对象

```js
const output = {
	'a.b.c.dd': 'abcdd',
	'a.d.xx': 'adxx',
	'a.e': 'ae',
};
```



```js

```



![image-20220816162514329](/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162514329.png)

![image-20220816162558655](/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162558655.png)

![image-20220816162618469](/Users/dizhang/Library/Application Support/typora-user-images/image-20220816162618469.png)

