## Webgl/Threejs 学习及实践总结

---

### 1. Webgl 是什么？ 前端使用场景有哪些？

* webgl （web图形库），是根据 OpenGL ES  2.0来实现的一套 JavaScriptAPI，可以在浏览器中渲染交互式3D和2D图形。该API可以在`HTML5 canvas ` 元素中使用，可以利用用户设备的 GPU 加速。
* 前端可以使用 threejs 库进行开发， threejs 是基于原生webgl 封装运行的三维引擎，将3D渲染中重要的工具方法与渲染循环封装起来，简化细节。前端可以在客户端创建3d场景、模型等，业务具体场景：3D可视化、产品720度预览（车、房）、海量数据可视化、h5/微信游戏、webVR。
* 使用Detector.js检测：判断canvas兼容、webgl兼容。

​	兼容性：

![image-20200903173708880](/Users/melody/Library/Application Support/typora-user-images/image-20200903173708880.png)



移动端：Android 5以上、iOS 8以上。



### 2.  Threejs 基础知识点

##### 2.1 基本概念

* 场景(scene) ：容纳一切的容器
* 相机(camera) ：在webGL世界里面的眼睛。
* 视口(viewport) ：3D场景渲染的二维图像，从浏览器的canvas元素上看到的场景。
* 视野(field of view) ：相机可见范围左右边界的夹角。
* 视锥体(view frustum) ：物体可以被渲染到视口的空间（只有处于视锥体空间内部的物体，才可以被看见）
* 近裁剪面(near clipping plane) ：视锥体靠近相机的一面，其实就是视口。
* 远裁剪面(far clipping plane) ：视锥体最远离相机的平面。

### 2.2 公式部分

弧长公式： `l = n * Math.PI * r / 180`  （n 圆心角）

角度转换公式： `30 * Math.PI/180`  // 30度


### 2.3 方法

* vector1.angleTo(vector2)  // 两个向量间弧长
* camera.getWorldDirection()  // camera角度
* 设置垂直于自身位置向量：

```js
// 围绕自身向量旋转
var fundVec = new THREE.Vector3(0,0,1);
var selfVec = new THREE.Vector3(x, y, z).normalize();
var newVec = new THREE.Quaternion().setFromUnitVectors(fundVec, selfVec);
hotArea.quaternion.multiply(newVec);
```

* 坐标转换：

  ```js
  // 3d 坐标转 2d
  var qiutweenPos = qiu163.getWorldPosition();
  var vec = new THREE.Vector3();
  var widthHalf = window.innerWidth / 2;
  var heightHalf = window.innerHeight / 2;
  qiu163.updateMatrixWorld();
  vec.setFromMatrixPosition(qiu163.matrixWorld);
  vec.project(camera);
  vec.x = ( vec.x * widthHalf ) + widthHalf;
  vec.y = - ( vec.y * heightHalf ) + heightHalf;
  console.log(vec)
  
  ```

  * 横竖屏事件监听方法:

  ```js
  //横竖屏事件监听方法
  var innerWidthTmp = window.innerWidth;
  function screenOrientationListener() {
    try {
      var iw = window.innerWidth;
      var orientation;
      //屏幕方向改变处理
      if (iw != innerWidthTmp) {
        if (iw > window.innerHeight) orientation = 90;
        else orientation = 0;
        //调用转屏事件
        onWindowResize();
        innerWidthTmp = iw;
      }
    } catch (e) {
      console.log(e);
    };
    //间隔固定事件检查是否转屏，默认300毫秒
    setTimeout(screenOrientationListener, 300);
  }
  //启动横竖屏事件监听
  screenOrientationListener();
  ```

  

### 3. Threejs + Tweenjs 

* 可实现 3d 场景中动画效果

###  4. 坑（tip）

* ` dpr > 2 `的机型如：`iphone6plus` 等，需注意模型太大时，会导致闪退，需要设置：

  ```js
  renderer.setPixelRatio(window.devicePixelRatio<3 ? window.devicePixelRatio : 1)
  ```

* multi polygon 贴图 可置换成 spotlight 打灯上色
* 1个geometry对应1个材质 在c4d中
* c4d 中的坐标position 3js要使用 getWorldPosition()
* geometry为sphere 贴图默认是sphere投射贴图，
* geometry为uv 贴图默认是uvw投射贴图，多面体mesh需注意
* 选择模型loader需要注意，如果场景复杂建议直接用dae格式文件，可导出camera light 播放动画等，不足之处在于需要自行添加材质material。
* 如果使用单个模型可用 obj格式，材质也可以导出为mtl格式。