## interview

----------------------
----------------------

####基础：
1. Doctype
2. Meta

	* charset
	* content (这个属性为 http-equiv 或 name 属性提供了与其相关的值的定义)
	* http-equiv 
		-content-security-policy

tips:  `<meta charset="UTF-8">` = `<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">`



Css3
Js{ number string boolean undefined object }
   {继承、闭包、跨域}
Es6{ symbol/ set/ map }
      {  => / promise / async await }

框架及组件：
MVVM: Vue/vuex/vue-rooter{ 原理 }   React
[ Eslint/pretter/standardjs ]
Webpack
js设计模式{ 工厂模式、坚挺者模式 }

升级：
优化、安全

算法：冒泡排序、快速排序

新技术：pwa  ssr 

---------------

1. Webpack  loader plugin 区别
2. Es6 新特性
3. Vue 双向绑定：v-model


#### new

```js
var o = new Foo()

=

var o = new Object()
o.__proto__ = Foo.prototype
Foo.call(o)

```


#### 1  实现 promise



Ran:

```javascript

快手

var a = 10; 
function f1(){var a = 100; var b = 10; return fx()};
 function fx(){return a+ b  };
f1();
 

快手
Object.prototype.a = ()=>{console.log(123)}

var a = {};
a.a();

function B(){};
B.a()

function Base(){};
var base = new Base();
base.a();


'a' instanceof a

'a' instanceof Function

base instanceof Base

base instanceof Object
​```

​```javascript

快手
for(let n =0; n < 3; n++) {  
  const n =2;
  document.body.addEventListener('click', function(){ 
   const n =1; 
   console.log(n)
  }) 
}
​```

​```javascript
快手
实现 Promise.allSettled()
​```


​```javascript
快手
使用正则转换
#c1c1c1    --->   rgb(193,193,193) 
​```





​```
字节题目

class 组件和 function useHooks 组件的区别，如何选型
hooks 和 utils 的区别

理解：event loop

实现
class Event(){
constructor(){}
on(){}
off(){}
emit(){}
once(){}
}


koa 中 use 原理
egg 启动过程 
孤岛问题

连续自串的最大和和索引位置


​```



​```
搜狗
event loop

前端事件循环

react 生命周期

egg 启动过程

前端错误监控实践
​```


​```
老虎

css居中
react 生命周期
react hook 有哪些，作用
redux 理解

node event loop
nodejs 多进程同时监控一个端口如何实现，culster模块原理
启动一个子进程有几种方法，他们区别
​```
```

###  tt

1. Promise limit 10，resolve一个塞进去一个
2. css grid
3. sessionstorage
4. 200 304;  Cache control ; max-age
5. Service worker



https://blog.csdn.net/qq_44755188/article/details/107294558

```js
class Promise(){

  constructor(excuter){
    this.status ='pending';

    function resolve(){
      this.status = 'fulfilled'
    }
    function rejected(){
      this.status = 'rejected'
    }	

    try{
      excuter(resolve,reject)
    }catch(e){
      reject(e)
    }
  }
	then(onFullfilled, onRejected){

    if(this.status==='fulfilled'){
      onFullfilled()
    }
    if(this.status==='rejected'){
      onRejected()
    }
	}
}	
```



[promise 限流](http://scarletsky.github.io/2019/11/02/a-simple-throttle-promise-queue/#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

```js
// promise 限流

let total = 100
let limit = 10
let quene = []
let i = 0;
let done = 0;

function loadNext(){
  if (i === limit) {
    return
  }
  i++
  let pickOne = quene.shift()
  pickOne().then(()=>{
    done++
    i--
    if(done===total){
      console.log('done')
    }else{
      loadNext()
    }
  })
}

for(let i=0; i<resources.length; i++){
  quene.push(()=>{
    new Promise((resolve)={
      axios({
        method: 'GET',
        url: resources[i]
      }).then(res=>{
        resolve(res)
      })
    })
  })
  loadNext()
}
```





```js
let arr = [5, 3, 2, 1, 4]
// 冒泡排序
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[j] 
                arr[j] = arr[i] 
              	arr[i] = temp
            }
        }
    }
    return arr
}
// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) return arr 
  	let midIndex = Math.floor(arr.length / 2) 
    let mid = arr.splice(midIndex, 1)[0] 
    let leftArr = [] 
    let rightArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < mid) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }
    return quickSort(leftArr).concat([mid], quickSort(rightArr))
}
// 二叉树
let tree1 = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3
        },
        right: {
            val: 4
        }
    },
    right: {
        val: 5,
        left: {
            val: 6
        },
        right: {
            val: 7,
            left: {
                val: 8
            }
        }
    }
}
let res = []
function DeepTraverse(node) {
    if (node) {
      res.push(node.value) 
      if (node.left) 
        DeepTraverse(node.left) 
      if (node.right) 
        DeepTraverse(node.right) 
      return res
    }
}
function DeepTraversal(node) {
    if (node) {
      console.log(node.value) 
      node.left && DeepTraversal(node.left) 
      node.right && DeepTraversal(node.right)
    }
}
// 广度遍历
function BreadthTraversal(node) {
    let queue = []
    let res = []
    if (node) {
        queue.push(node) 
     		while (queue.length) {
            let current = queue.shift() 
            res.push(current.value) 
            current.left && queue.push(current.left) 
            current.right && queue.push(current.right)
        }
        return res
    }
}
// 左视角
function LeftTravesal(node) {
    let queue = [] let arr = []
    if (node) {
        queue.push(node) 
      	while (queue.length) {
            let len = queue.length 
            arr.push(queue[0].value) 
          	while (len--) {
                let current = queue.shift() 
                current.left && queue.push(current.left) 
              	current.right && queue.push(current.right)
            }
        }
        return arr
    }
}
/* function TreeNode(x) {
this.val = x;
this.left = null;
this.right = null;
} */
function FindPath(root, expectNumber) {
    var result = [];
    if (root === null) {
        return result;
    }
    dfsFind(root, expectNumber, [], 0, result);
    return result;
}
function dfsFind(root, expectNumber, path, currentSum, result) {
    currentSum += root.val;
    path.push(root.val);
    if (currentSum == expectNumber && root.left == null && root.right == null) {
        result.push(path.slice(0));
    }
    if (root.left != null) {
        dfsFind(root.left, expectNumber, path, currentSum, result);
    }
    if (root.right != null) {
        dfsFind(root.right, expectNumber, path, currentSum, result);
    }
    path.pop();
}

function sendRequest(urls, max, callback) {
    let index = 0; // 当前发送到第几个url
    let total = 0; // 并发数量
    const result = []; // 记录fetch结果
    function next() {
        // 当结果数量 === urls.lengtha 时，说明全部fetch已经返回结果，该调用callback了
        if (result.length === urls.length) {
            callback(result);
            return;
        }
        // 当urls中还有未发送的 并且 并发数量小于max时，发送下一个
        if (index < urls.length && total < max) {
            const url = urls[index];
            index++;
            total++;
            fetch(url).then(res = >{
                result.push({
                    url,
                    success: true,
                    res
                });
                total--; // 成功后当前并发数减1
                next(); // 执行下一个next，下一个请求
            }).
            catch(res = >{
                result.push({
                    url,
                    success: false,
                    res
                });
                total--; // 失败后当前并发数减1
                next(); // 执行下一个next，下一个请求
            });
            next();
        }
    }
    next();
}
/** ** ** ** ** ** ** 测试 ** ** ** ** ** ** */
function fetch({
    index,
    spend,
    success
}) {
    return new Promise((resolve, reject) = >{
        console.log("%d pending start", index, new Date());
        setTimeout(() = >{
            if (success) {
                console.log("%d success end", index, new Date());
                resolve(new Date());
            } else {
                console.log("%d fail end", index, new Date());
                reject(new Date());
            }
        },
        spend);
    });
}
const urls = [{
    index: 1,
    spend: 1000,
    success: true
},
{
    index: 2,
    spend: 1000,
    success: true
},
{
    index: 3,
    spend: 1000,
    success: true
},
{
    index: 4,
    spend: 1000,
    success: true
},
{
    index: 5,
    spend: 1000,
    success: true
},
{
    index: 6,
    spend: 1000,
    success: true
},
{
    index: 7,
    spend: 1000,
    success: true
},
{
    index: 8,
    spend: 1000,
    success: true
},
{
    index: 9,
    spend: 1000,
    success: true
},
{
    index: 10,
    spend: 1000,
    success: true
}];
sendRequest(urls, 3, console.log);

function flatten2(arr) {
    return arr.reduce((result, item) = >{
        return result.concat(Array.isArray(item) ? flatten2(item) : item)
    },
    [])
}
function flatten1(arr, result = []) {
    for (let item of arr) {
        if (Array.isArray(item)) {
            flatten(item, result)
        } else {
            result.push(item)
        }
    }
    return result
}

var a = 1
function a() {}
function name() {
    console.log(a)
}
Object.create = function(prototype, options) {
    function fn() {}
    fn.prototype = prototype
    return new fn()
}
```

### 1127sina

Paddling-top: 50%

实现 Promise.all()

100 200 300 400 httpcode https://lefts.cn/biji/163.html

cors   post  /login 过程  preflight http://kwin.site/others/1877.html

cors  header 头

自动部署

弹窗 stopPropagation()

Vue computed 实现



```js
Function.prototype.myCall = function(context, ...arg1){
  let id = new Symbol()
  context[id]=this
  let res = context[id](...arg1)
  return res
}

function _curry(fn, ...arg){
  if(arg.length>=fn.length){
    return fn(...arg)
  }else{
    return function(...arg2){
      return _curry(fn, ...arg, ...arg2)
    }
  }
}
let fn = _curry(func)
fn(1)(2)
```



```js
function  myBind(){
  let context = this;
  return context.arguments[0]([...arguments].slice(1))
}
```

### gao tu

节流防抖 发布订阅  顺时针打印二位数组  二位数组找中位数啥的







