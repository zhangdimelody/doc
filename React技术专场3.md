# react flux组件定制化实践

------------------

### 可配置的UI组件

#### 静态部分：
    把组件props 用统一数据结构结合
#### 交互部分：
    把导致props改变function组合起来
![图](images/react/IMG_5339.JPG) <br/>
* 基础组建和布局组件的组合（可嵌套业务组件）
* ……

#### 静态部分：
    1.数据
        通过静态数据描述组件
![图](images/react/IMG_5340.JPG)<br/>

    2.拼接
![图](images/react/IMG_5341.JPG)<br/>

    3.数据流和context
        业务组件和非业务组件的数据处理
![图](images/react/IMG_5342.JPG)<br/>

    4.静态部分 store
![图](images/react/IMG_5343.JPG)<br/>

#### 交互部分：
![图](images/react/IMG_5344.JPG)<br/>

    1.规则
![图](images/react/IMG_5345.JPG)<br/>

    2.action
![图](images/react/IMG_5347.JPG)<br/>

    eg:
![图](images/react/IMG_5347.JPG)<br/>

    3.ActionHandler
![图](images/react/IMG_5349.JPG)<br/>

#### 一些Flux框架
    Reflux
    Redux




