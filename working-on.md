#### 2015.09.01  csstriggers.com 
    css重绘的问题
    eg: 内层height变，外层没有重绘
        解决方案：改变外层 可以重绘的css属性

#### 09.03
    tap-highlight-color: transparent; //a标签点击不显示默认背景色
    touch-callout: none; //禁止系统默认菜单
    user-select: none; //用户不能选择元素中的任何内容
#### 09.09
    1. *line-height:0; *//消除inline-block元素内部的元素行高去掉,display:block;块儿元素没有上下外边距了
    2. 适配
        * (eg:1像素边框，在2倍屏幕上为2“占位”，3倍屏上为3“占位”，但设计师就要1“占位”)

````
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

````
        * 基于表格布局的垂直居中 `display:table-cell;vertical-align: middle;` ?
        * 计算间距 `font-size`, `line-height`,`padding`,`margin`
    
    3. px em rem 区别
        * PX实际上就是像素，用PX设置字体大小时，比较稳定和精确。
        * EM就是根据基准来缩放字体的大小。EM实质是一个相对值，而非具体的数值。这种技术需要一个参考点，一般都是以<body>的“font-size”为基准。em是相对于父元素的属性而计算的。
        * EM是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而Rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值。
        <br/>
        除了IE6-IE8r，其它的浏览器都支持em和rem属性，px是所有浏览器都支持。

    4. 模拟hover
```javascript
    var myLinks = document.getElementsByTagName('a');
    for(var i = 0; i < myLinks.length; i++){
    　　myLinks[i].addEventListener(’touchstart’, function(){this.className = “hover”;}, false);
    　　myLinks[i].addEventListener(’touchend’, function(){this.className = “”;}, false);
    }
```



















