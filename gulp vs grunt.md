# Gulp与Grunt对比（M心得）

------

### 共性
都是构建工具

### 差别
1. Gulp是基于流的构建工具
2. Gulp是代码大于配置（写配置和写nodejs类似）
3. Gulp用流、管道的方式，没有中间文件产生，所以更快
4. Gulp遵从一个插件只做一件事儿，例如：Grunt中的imageMin插件不仅压缩图片还会缓存图片；Gulp则将这个分成两个插件，提高了重用性。

### PS
Gulp采用流的方式去操作文件，这种模式与Unix(*nix)一样（M：或许Gulp才是大势所趋）

### 文案参考
[二者对比](http://www.benben.cc/blog/?p=407)

[npm grunt gulp](http://www.w3ctech.com/topic/114)

[grunt迁移gulp](http://www.huangyunkun.com/2014/05/04/grunt-to-gulp/)