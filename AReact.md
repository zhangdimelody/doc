### react

1. 合成事件（class 4、5个） + setState settimeout  同步
2. pure Component 和 普通 区别：shouldupdate浅对比
3. hooks 有哪些use方法
4. use affect 第二个参数传值 空数组 不传 有什么区别
5. use callback、use memo 怎么实现函数缓存的
6. diff算法； fiber 原理  request idle callback；改变虚拟dom结构；
   * 因为用了fiber ，所以优化了虚拟dom结构，增加了对父节点和兄弟节点指针， 16.6剩余时间去渲染，>4ms 渲染为真实dom， 剩余时间如果小于4ms， 下一帧渲染；
7. request idle callback 





### 性能优化

1. component => pure component

2. shouldupdate 防止重复渲染



