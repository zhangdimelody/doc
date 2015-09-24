# 移动WAP页面资料整理 － Melody

-----------------

## 背景

### android & IOS

#### android
    1. android的厂商碎片化比较严重，由于webkit内核开源，导致webkit内核的浏览器多样化，厂商实现html5标准不同，对html5支持的程度不一致。
    2. android的版本碎片化，安卓2.2以及以下的版本，对于html5的支持性不是很好。在安卓2.3的版本上，开始移植pc版chrome的核心代码实现，因此从2.3开始，android的web开发开始了新的旅程。
#### IOS
    ios由于其封闭性，并且苹果公司严格按照html5的规范来进行实现，因此在ios上html5的规范实现的较好。

### PC、手机端的页面渲染
* PC：有高性能硬件及显卡，使得页面渲染性能很高。
* 手机端：有限的硬件性能，没有显卡，页面渲染由CPU来执行。CPU执行频率有限，就会造成页面渲染缓慢。因此在手机上，页面有大量渲染变化的时候，会有卡顿现象。如：长列表滑动、页面切换动画等。

### dpi ppi 像素

* DPI（Dot Per Inch）表示分辨率,即点/英寸，指每英寸长度上的点数，输出分辨率，针对于输出设备而言的。
* PPI（Pixels Per Inch），即像素/英寸，所表示的是每英寸所拥有的像素（Pixel）数目。因此PPI数值越高，即代表显示屏能够以越高的密度显示图像。当然，显示的密度越高，拟真度就越高。
* 像素是分辨率的单位
* box-shadow border-radius (圆角坑)
* property change

### 适配
- (eg:1像素边框，在2倍屏幕上为2“占位”，3倍屏上为3“占位”，但设计师就要1“占位”)
- 文件引用

```css
<link rel="stylesheet" media="screen and (-webkit-device-pixel-ratio: 0.75)" href="ldpi.css" />
<link rel="stylesheet" media="screen and (-webkit-device-pixel-ratio: 1.0)" href="mdpi.css" />
<link rel="stylesheet" media="screen and (-webkit-device-pixel-ratio: 1.5)" href="hdpi.css" />
<link rel="stylesheet" media="screen and (-webkit-device-pixel-ratio: 2.0)" href="retina.css" />
```

```css
        // 2倍屏
        @media only screen and (-webkit-min-device-pixel-ratio:2.0)
        ,only screen and (-o-min-device-pixel-ratio:2.0)
        ,only screen and (min-device-pixel-ratio:2.0){
            h1{
                transform: scaleY(0.5);
                -webkit-transform: scaleY(0.5);
            }
        }
        // 3倍屏
        @media only screen and (-webkit-min-device-pixel-ratio:2.5)
        ,only screen and (min-device-pixel-ratio:2.5){
            h1{
                transform: scaleY(0.334);
                -webkit-transform: scaleY(0.334);
            }
        }

```
        
- 基于表格布局的垂直居中 `display:table-cell;vertical-align: middle;` ?
- 计算间距 `font-size`, `line-height`,`padding`,`margin`
- 断点：区间的具体分界点
    根据场景、设备选择常见的断点，如320px、360px、414px、640px、736px等<br/>
    [百度统计分辨率使用情况](http://tongji.baidu.com/data/screen)
    
### px em rem 区别

- PX实际上就是像素，用PX设置字体大小时，比较稳定和精确。
- EM就是根据基准来缩放字体的大小。EM实质是一个相对值，而非具体的数值。这种技术需要一个参考点，一般都是以<body>的“font-size”为基准。em是相对于父元素的属性而计算的。
- EM是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而Rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值。
<br/>
除了IE6-IE8r，其它的浏览器都支持em和rem属性，px是所有浏览器都支持。

### 模拟hover

```javascript
    var myLinks = document.getElementsByTagName('a');
    for(var i = 0; i < myLinks.length; i++){
    　　myLinks[i].addEventListener(’touchstart’, function(){this.className = “hover”;}, false);
    　　myLinks[i].addEventListener(’touchend’, function(){this.className = “”;}, false);
    }
```

### 页面滚动
1. IOS5之后，支持局部滚动css属性：`-webkit-overflow-scrolling: touch`，在某些滚动中，会失效，不建议使用。
2. 出于性能考虑，页面惯性滚动时，浏览器会把页面上的渲染进行锁定状态。eg:元素从static状态变成fixed状态时，在滑动中，js动态设置了，页面也不会响应，直到滚动结束。

### 默认窗口
    头部会出现当前URL地址，无法去除。

### meta标签

#### 常见viewpoint设置
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"/>
```

#### [meta标签属性介绍](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
* 背景介绍
* 窗口基础
* 1px不是1px (!)
* 窗口宽度和屏幕宽度 (!)
* 常见手机和平板设备的窗口尺寸
* 规范 (!)

### html5标签使用参考
    [查看是否可以使用](http://caniuse.com/)

### input标签
保险类型：
* text:文本 此类型说明输入框为文本信息,对应的键盘而言，Android和ios都会弹出全键盘。
* passsword：密码 在手机上和PC上的交互有所不同，这个需要注意 text-font-size:
* button、checkbox、radio、reset、submit等 这些控件都可以使用，不过需要注意在Android和ios的手机上，控件的样式会所有不同，如果想完全掌控样式，需要reset一下-webkit-appearance:none，之后在设置自己需要的样式。

谨慎使用类型：..

### 浏览器触摸事件，相应顺序
ontouchstart -> ontouchmove -> ontouchend -> onclick

### 1px is not 1px
* 在不同的屏幕上(普通屏幕 vs retina屏幕)，css像素所呈现的大小(物理尺寸)是一致的，不同的是1个css像素所对应的物理像素个数是不一致的。
* 在普通屏幕下，1个css像素 对应 1个物理像素(1:1)。 在retina 屏幕下，1个css像素对应 4个物理像素(1:4)。

### 参考文献
* [alipay移动页面中遇到的问题及解决方案](http://am-team.github.io/about/about.html)
* [meta标签属性介绍](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)































