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

1. 去掉过期功能

   需手动引入 polyfills 

2. 持久缓存

   * 新增长期缓存的算法，计算chunkid，生产模式下默认启用：

     `chunkIds: deterministic`

     `moduleIds: deterministic`

   * 内容哈希：使用真正的内容哈希值

3. 模块联邦

   * 新增功能：允许多个 webpack 一起工作，可以让跨应用间做到模块共享`ModuleFederationPlugin`

4. Tree shaking

   * 内部模块的tree shaking
   * 嵌套的tree shaking
   * commonjs 的 tree shaking，只引入真正用到的代码

### hash chunckName contentHash

1. hash 与项目构建相关
2. chunckName 与用一个chunk内容相关
3. contentName 与文件内容相关

https://zhuanlan.zhihu.com/p/389408380 webpack4 contenthash 并不是真的根据content生成的hash，因为 module chunk 的命名时根据 id 自增的。当删除module时会影响到别的 module 的name，所以会变。webpack5 中修正这一问题，不使用自增id命名。

### from chatgpt

Webpack的编译过程可以分为以下几个步骤：

1. **初始化阶段**：在这个阶段，webpack会接收两个参数：命令行参数和配置文件中的参数，然后合并它们并初始化出一个最终的配置对象。然后，webpack会根据这个配置对象实例化一个Compiler对象。
2. **编译阶段（Compilation）**：在这个阶段开始时，webpack会触发一些钩子函数，并开始构建模块。首先从入口文件（entry）开始解析依赖关系图谱，并递归地找到所有依赖项。每找到一个新模块就创建一个新的Module实例，并调用Loader来转换这些模块。
3. **构建AST抽象语法树**：对于每一个模块，Webpack都会使用acorn库去生成抽象语法树(Abstract Syntax Tree, AST)，以便于分析出当前模块所有的依赖项。
4. **完成Module构建**：通过Loader将源代码转换成最终代码，并记录下该模块所有的依赖关系。
5. **封装Chunk**：当所有Module构建完成之后, Webpack 会将所有 Module 按照不同入口和代码分割规则进行拆分和组合, 形成一系列 Chunk.
6. **输出资源（emit）**: 在确定好输出内容之后，Compiler 将所有 Chunk 转换成输出资源，包括生成 Bundle 文件、source map 等等。具体是通过调用 OutputFileSystem 把内容写入到文件系统中。
7. **完成编译**: 在完成写入操作后, 根据配置确定是否需要进行压缩、混淆等优化操作.

