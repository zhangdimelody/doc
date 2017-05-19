# 从 Threejs 到 Hololens 开发实践

=================

## 开发问题总结
--------------------------------------

## UNITY
#### unity 中的相关设置
* 场景显示在非内容框里面：unity中设置 other settings/virtual reality supported 要 checked
* 要访问外部网络接口：unity中设置 publishing settings/capabilities/InternetClient InternetClientServer PrivateNetworkClientServer 要 checked

#### unity 的坐标转换
* [四种坐标系以及相互转换](http://blog.csdn.net/zuoyamin/article/details/8813424)

#### unity position
```c#
transform.position.Set(x, y, z);    //失效  这个position只是调用了transform的get方法，得到了一个transform里的记录
//位置的Vector3私有成员的临时副本，然后再对这个Vector3的副本执行Set，所以不会更改到transform里真实的私有成员。
transform.position = new Vector3 (x, y, z);   //成功设置  transform.position其实既有get又有set
```
#### unity 中脚本的生命周期
*  执行顺序：awake  onEnable  start 
*  Awake和Start在一个游戏物体的生命周期中只调用一次，但是OnEnable会在每次激活脚本的时候再次执行。
*  [基本四种情况](http://www.ceeger.com/forum/read.php?tid=12962)


## HOLOLENS

### 概念理解

#### coordinate systems from spatial anchors (空间锚点的坐标系), stationary frames of reference (固定参考系统) :
#### [坐标系](https://developer.microsoft.com/en-us/windows/holographic/coordinate_systems)
* stationary frames of reference 能保证一个固定的距离，保证了 hologram 与用户距离稳定，但是会引起漂移。
* spatial anchors 确保了 hologram 一直都在固定的位置，不会漂移。
* attached frame of reference 始终在屏幕的固定位置，可用于定位“返回 UI 界面” 等。

