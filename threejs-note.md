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
* 相机(camera) ：在webGL世界里面的眼睛。
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

```js
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt( new THREE.Vector3(0,0,0),vectorNew ); //一起用才生效

// 左右手坐标系转换
camera.position.x = -vectorNew.x ;
camera.position.y = vectorNew.y;
camera.position.z = -vectorNew.z ;


```
圆周上的坐标：
x = Math.sin( 角度 * Math.PI/180 ) * 半径
y = Math.cos( 角度 * Math.PI/180 ) * 半径

var intersects = raycaster.intersectObjects( objects,true ); // true 是否迭代子节点

### 坑
* multi polygon 贴图 可置换成 spotlight 打灯上色
* 1个geometry对应1个材质 在c4d中
* c4d 中的坐标position 3js要使用 getWorldPosition()
* geometry为sphere 贴图默认是sphere投射贴图，
* geometry为uv 贴图默认是uvw投射贴图，多面体mesh需注意
* 选择模型loader需要注意，如果场景复杂建议直接用dae格式文件，可导出camera light 播放动画等，不足之处在于需要自行添加材质material。
* 如果使用单个模型可用 obj格式，材质也可以导出为mtl格式。

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







