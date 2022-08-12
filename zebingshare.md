1、自我介绍
2、找一个项目，谈谈你对它的贡献，或者难点（他大概率要讲性能优化了）
3、然后问前端优化的技术有那些（浏览器原理、分析慢在哪里、分析工具、甚至webpack构建相关等）这里面太多了
4、开始vue：
 生命周期（包含父子组件）
 diff算法（带key和不带key的区别）
 v-if和v-for为啥不能一起用
 nextTick原理
 eventBus原理以及为啥要new才能使用（自己实现一个eventBus）
 vue3为啥要用proxy（优缺点）
 vue3有哪些变化（proxy、diff算法优化、v-mode增强、内置组件、composition API（这个很重要，能问的很多。例如：跟原始的生命周期函数有什么优点））
5、js基础：
 for in和for of的区别
 promise源码
 bind实现
 async await的原理

6、开始webpack：
 构建速度优化相关（dll、thread-loader、externals+cdn、alias、splitchuks等等一大堆）
 webpack的生命周期（这个能问的也很多）
 热启动原理（源码）
 plugin和loader区别
 有没有写过plugin（做什么用的）
 plugin除了可以同步的还支持其它异步插件吗?（如果是异步他怎么做异步流程控制）
 webpack5有哪些新的变化
 tree shaking是干什么的（为啥必须依赖于es6 module，commonJS为啥不行）
7、手写代码
 简单的：
 节流防抖
 函数颗粒化
 promise.all或者race实现
 快排

 稍微难的：
 堆排序
 两个有序数组中第K大的值
 旋转数组找到最小值  [1,2,3,4,5]旋转成[3,4,5,1,2] 找到 1