### vite



Provider / inject 本身不是响应式的，但是可以传进去一个引用类型的响应式值，就可以是响应式的

Object.freeze()

$nextTick 原理？如何降级？

### vue3 变化

1. proxy 取代 defineProperty
2. 多根节点
3. 新增组件
   * suspense（兜底组件 异步请求时的兜底；比如setup不可以async，可以用此组件+setup）两个插槽 default、fallback
   * teleport（转移dom去body）
4. v-model 增强
   * 组件也可以用v-model，组件 props 中定义 modelModifiers <span v-model.capitalize="value" ></span>
5. composite API
6. 打包优化
7. 虚拟dom添加 patchFlag
   * 静态节点被单独存为变量，进行变量提升，重新渲染时可以直接使用
   * cacheHandler 缓存事件，不需要每次都传递一个函数
8. diff 算法优化
   * 静态标签标记一下，不对比
   * 静态标签重新渲染时直接用
   * 方法提升
9. typescript 支持
10. v-if 优先级更高 v-for

### v-if v-for 优先级

- 在vue2中，v-for的优先级高于v-if
- 在vue3中，v-if的优先级高于v-for

### ref reactive 区别

* Reactive 基于proxy，只支持object

* Ref 在 reactive的基础封装一层，支持各种数据类型

### vue-router

### 1. 工作流程

1. url 改变
2. 触发url监听
3. 更改vue router 里的current
4. 监听current的事件触发
5. 重新渲染组件

### 2. Hash / history

History 需要后端配合，将路由重定向到根 pushState replaceState

Hash 事件 hashchange



### diff算法

https://juejin.cn/post/6994959998283907102#heading-2

1. O（n）对比传统的 O（n3）优化点：

   * 同级比较，深度遍历
   * 如果不同节点，直接替换
   * 通过唯一的key

2. setter 改变数据，通过notify通知dep中的watcher，订阅者watcher会调用patch方法进行给真实dom打补丁，重新绘制视图。

   * patch 方法：深度遍历，进行同级比较，如果是不同节点重新生成节点替换掉，如果是同一个节点走patchVnode 方法

   * saveVNode 方法：判断 **key / tag **/ 是否是注释节点 / input的话判断 type是否一致

   * patchVnode 方法：判断是否是同一个对象，如果是同一对象就直接返回；

     ​								判断内容是否是text进行替换；

     ​								判断是否有子节点，如果新的有旧的没有就替换，如果新的没有旧的有就删除；

     ​										如果都有子节点则走 updateChildren 方法。

   * updateChildren 方法：共有4个指针，分别指向头和尾，每次都进行头尾的相互比较，最终达到新的节点





### Vue的核心思想

vue的整体思想仍然是拥抱经典的html(结构)+css(表现)+js(行为)的形式，vue鼓励开发者使用template模板，并提供指令供开发者使用(v-if、v-show、v-for等等)，因此在开发vue应用的时候会有一种在写经典web应用（结构、表现、行为分离）的感觉。另一方面，在针对组件数据上，vue2.0通过`Object.defineProperty`对数据做到了更细致的监听，精准实现组件级别的更新。

### React的核心思想

react整体上是函数式的思想，组件使用jsx语法，all in js，将html与css全都融入javaScript，jsx语法相对来说更加灵活，当组件调用setState或props变化的时候，组件内部render会重新渲染，子组件也会随之重新渲染，可以通过`shouldComponentUpdate`或者`PureComponent`可以避免不必要的重新渲染（个人感觉这一点上不如vue做的好）。









