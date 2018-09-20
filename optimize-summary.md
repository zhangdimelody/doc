### optimize

--------------

#### webp 图片格式


- 前端JS方案——利用img标签加载一张base64的WebP图片，在img标签的onload事件中判断该图片是否具有宽高的属性，若有表示支持webP，若没有表示不支持webP。
- 后台判断方案——判断浏览器请求头Accept是否支持WebP，返回是否支持的标示给前台。

```js

window.isSupportWebp = false;//是否支持
(function() {
    var img = new Image(); 
    function getResult(event) {
        //如果进入加载且图片宽度为1(通过图片宽度值判断图片是否可以显示)
        window.isSupportWebp = event && event.type === 'load' ? img.width == 1 : false;
    }
    img.onerror = getResult;
    img.onload = getResult;
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='; //一像素图片
})();

```