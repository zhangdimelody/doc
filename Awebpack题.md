## webpack

#### 构建流程

1. 首先new compiler 进行初始化的操作，包括对生命周期钩子的初始化，（生命周期这里基于tapable实现，事件的发布订阅，可以支持call 和 promise 的异步执行），如果plugin配置的话，在这里处理。最终得到complition。
2. 读entry入口文件，根据loader处理文件，如将图片进行base64压缩，转成webpack 可读取的文件也就是 js，最终生成 ast，遍历 ast 拿到依赖文件。
3. 最后读取 output 输出文件。

#### loader

`对文件内容进行操作`

实现loader

* thread-loader

* happy-pick

#### plugin

`在生命周期中对编译流程的干预`

重要的勾子：

实现：实现类、apply方法、complier注入 hooks

插件处理事件瀑布流，分为同步异步

### 热更新原理

1. 服务端编译文件，生成hash值，对文件监听

https://juejin.cn/post/6844903933157048333#heading-9

### Webpack5变化





