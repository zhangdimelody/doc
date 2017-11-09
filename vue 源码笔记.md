

### 数据的响应化
* data对象的几乎任何更改我们都能够监听到
* 基本思路: 遍历每一个属性，然后使用Object.defineProperty将这个属性设置为响应式的，
通过改写 getter/setter 属性

```js
// 遍历属性
function touch (obj) {
  if (typeof obj === 'object')
    if (Array.isArray(obj)) {
      for (let i = 0,l = obj.length; i < l; i++) {
        touch(obj[i])
      }
    } else {
      let keys = Object.keys(obj)
      for (let key of keys) touch(obj[key])
    }
  console.log(obj)
}
```

* 对于数组通过上述做法无法监听到，VUE 重写了 pop/push/shift/unshift/splice/sort/reverse,
执行之后通知数组更新。
* 不能直接修改数组的长度 (eg: vm.items[0] = {}) 需要用 `$set` (eg: this.items.$set(0, {c: 'a'}))；
同样添加了`$remove`方法，原理是用splice去掉
* 通过下标去修改数组
* Obsever 待续，，

 
### _compile 函数
* 包含三个阶段：transclude compile link.
- transclude 内嵌: 把 template 转换为 dom 的过程
- compile : 遍历模版解析出模版里的指令（解析后生成了指令描述对象）（第一个阶段是编译，返回出去的这个函数完成另一个阶段：link）
- link : link函数会把descriptor(指令描述对象)传入Directive构造函数，创建出真正的指令实例


##### tips:
* 模板中每个指令/数据绑定都有一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。
之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。 --Vue官网
* 详解 `v-for` (大数据量的重复渲染生成): 重复渲染的模板是一致的，不一致的是他们需要绑定的数据，
因此compile阶段找出指令的过程是不用重复计算的，只需要link函数（和里面闭包的指令)，
而模板生成的dom使用原生的cloneNode方法即可复制出一份新的dom。现在，复制出的新dom+ link+具体的数据即可完成渲染，
所以分离compile、并缓存link使得Vue在渲染时避免大量重复的性能消耗。 














