### vite





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





