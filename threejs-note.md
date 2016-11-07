## Three.js 学习笔记

----------------------

### 公式部分

弧长公式： `l = n * Math.PI * r / 180`  （n 圆心角）

角度转换公式： `30 * Math.PI/180`  // 30度


### 方法

vector1.angleTo(vector2)  2向量间弧长
camera.getWorldDirection()  camera角度的角度


### 设置垂直于自身位置向量

```js
// 围绕自身向量旋转
var fundVec = new THREE.Vector3(0,0,1);
var selfVec = new THREE.Vector3(x, y, z).normalize();
var newVec = new THREE.Quaternion().setFromUnitVectors(fundVec, selfVec);
hotArea.quaternion.multiply(newVec);
```

frustumHeight = 2.0 * distance * tan(fov * 0.5 * (pi/180));

### 基本概念

* 场景(scene) ：容纳一切的容器
* 相机(camera) ：就是你在webGL世界里面的眼睛呐。
* 视口(viewport) ：想想浏览器的视口的概念，对，就是3D场景渲染的二维图像，也就是你从浏览器的canvas元素上看到的。
* 视野(field of view) ：相机可见范围左右边界的夹角。
* 视锥体(view frustum) ：物体可以被渲染到视口的空间，换句话说，只有处于视锥体空间内部的物体，才可以被看见。
* 近裁剪面(near clipping plane) ：视锥体靠近相机的一面，其实就是视口。
* 远裁剪面(far clipping plane) ：视锥体最远离相机的平面。


#### 线性代数

(描述空间三维变换的变换矩阵是4×4的形式。由此，一系列变换可以用单个矩阵来表示。)

* 网格由N个多边形构成，实际上就是由多边形的顶点集合构成。顶点是一个向量，而向量可以用一个三维坐标(x, y, z)来表示。矢量之间存在加法、减法、点乘、叉乘运算。
* 引入齐次坐标(w)来区分，w=0，则表示向量，否则表示点。(x, y, z, w) = (x/w, y/w, z/w, 1)
* 仿射变换
    - 平移
    - 旋转 欧拉角坐标：旋转中的万向节死锁问题(http://www.cnblogs.com/soroman/archive/2008/07/15/1118996.html)
















