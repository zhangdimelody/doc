#### 2017.09.12
* 无痕浏览不支持 localstorage (客户端内可以设置成无痕浏览)


#### 2017.10.19
### 服务器端文件传输
1. scp
````
tar -zcf ufile.tar.gz ufile
scp -P port ufile.tar.gz user@host:~/ufile.tar.gz
ssh -p port user@host 'tar -zxf ufile.tar.gz'

=

scp -P port -C ufile user@host:~/ufile

````
2. sftp
* sftp与ftp有着几乎一样的语法和功能，不过*SFTP是SSH的一部分*，它使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是，由于这种传输方式使用了加密、解密技术，所以传输效率比普通的FTP要低一些。
* SFTP (SSH或Secure FTP) 是基于 SSH 来进行加密和验证的. 而 SSH 是通过公开密钥加密算法来验证和加密的。

3. 直接用 ssh
* 将本地的数据传输到远程服务器的用法：gzip -c ufile | ssh -p port user@host 'gunzip >ufile'
* 将远程服务器传输到本地的用法：ssh -p port user@host "gzip -c ufile" | gunzip -c > ufile


4. nc ( netcat )（nc需要root权限）
* 通过TCP和UDP在网络中读写数据
* netcat所做的就是在两台电脑之间建立链接并返回两个数据流，在这之后所能做的事就看你的想像力了。
* 能建立一个服务器，传输文件，与朋友聊天，传输流媒体或者用它作为其它协议的独立客户端。
````
在服务器端：
sudo nc -l -p port | tar -zxf - #l 参数用于监听
sudo nc -l -p port > ufile
在客户端：
tar -zcf - ufile | sudo nc host port
sudo nc host port < ufile

````

5. rsync (remote sync) (类unix系统下的数据镜像备份工具)
* rsync有两种用法，一种是通过SSH通道传输数据，
* 另一种是通过与服务器的rsync守护者(daemon)进程建立连接来传输数据。
- ssh: `rsync -zav --rsh='ssh -p port' ufile user@host:path`
- daemon: 不同于SCP和SFTP，rsync是一套独立的软件，除了通过SSH通道传输数据以外，还可以通过rsync的守护者进程进行数据传输。`rsync -avz ufile user@host::module_name`

6. ftp (FTP没有数据压缩的功能)



##### shell 登陆 ftp
* ftp user@ftpdomain.com
* 最常用的命令有：
ls 列出远程机的当前目录
cd 在远程机上改变工作目录
lcd 在本地机上改变工作目录
ascii 设置文件传输方式为ASCII模式
binary 设置文件传输方式为二进制模式
close 终止当前的ftp会话
hash 每次传输完数据缓冲区中的数据后就显示一个#号
get（mget） 从远程机传送指定文件到本地机
put（mput） 从本地机传送指定文件到远程机
open 连接远程ftp站点 

```shell
#!/bin/bash
ftp -n<<!
open 192.168.1.171
user dizhang 123456
binary   #使用二进制传输模式
cd /home/data
lcd /home/databackup
# 打开prompt模式，一般prompt模式在使用多文件传输中才用到，默认为打开状态。
# 如果prompt模式未打开，命令mput和mget将会传输目录中的所有文件。
prompt
mget *
close
bye
!
```

##### shell 定时服务
* .netrc 内容：（设置默认登陆账号密码）machine 192.168.0.1 login ftpuser password ftpuser_password  
* [.netrc 文件用途](http://www.phpbegin.com/2013/05/31/568.html)


### 10.27 使用DocumentFragment(一个没有父级文件的最小文档对象)加快DOM渲染速度
* 可以提供一个缓冲的机制，将DOM节点先放到内存中，当节点都构造完成后，再将DocumentFragment对象添加到页面中，
这时所有的节点都会一次渲染出来，这样就能减少浏览器很多的负担，明显的提高页面渲染速度。
```js
function CreateFragments(){
  var fragment = document.createDocumentFragment();
  for(var i = 0;i < 10000;i++){
    var tmpNode = document.createElement("div");
    tmpNode.innerHTML = "test" + i + "<br />";
    fragment.appendChild(tmpNode);
  }

  document.body.appendChild(fragment);
}
```
#### 10.30
* 语法树：计算机描述世界真理的树状结构。
* 在计算机编程语言上，无论什么语种，都会有「类型」「运算符」「流程语句」「函数」「对象」
等概念来表达计算机中存在内存中的0和1，以及背后运算与逻辑。
* 语法分析器是把源代码作为字符串读入、解析，并建立语法树的程序。
* 语法的设计和语法分析器的实现是决定语言外在表现的重要因素


#### 11.01
 * ios8 flex 需要加前缀 -webkit-

#### 11.07
* webpack支持在代码中定义分割点。分割点指定的模块只有在真正使用时才加载

```js
// 只有点击时在加载
$('#okButton').click(function(){
  require.ensure(['./foo'], function(require) {
    var foo = require('./foo');
    //your code here
  });
});
// or
$('#okButton').click(function(){
  require(['foo'],function(foo){
    // your code here
  }]);
});
```
* CommonsChunkPlugin（公共部分每次hash 也会变，除非提取出 runtime 态）的作用可以抽象：
将多个入口中的公有代码和Runtime(运行时)抽取到父节点
* DllPlugin、DllReferencePlugin(构建时间短，利用浏览器缓存机制)
##### 对比：
（1）由于dll包和业务chunk包是分开进行打包的，每一次修改代码
时只需要对业务chunk重新打包，webpack的编译速度得到极大的提升
，因此相比于CommonChunkPlugin，DllPlugin进行代码分割可以显
著的提升开发效率。
（2）使用DllPlugin进行代码分割，dll包和业务chunk相互独立，
其chunkhash互不影响，dll包很少变动，因此可以更充分的利用浏览
器的缓存系统。而使用CommonChunk打包出的代码，由于公有chunk中
包含了webpack的runtime(运行时)，公有chunk和业务chunk的
chunkhash会互相影响，必须将runtime单独提取出来，才能对公有
chunk充分地使用浏览器的缓存。

#### 11.13
* 深拷贝： 
  - Object.assign({},{a:1}) 
  - JSON.parse(JSON.stringify({a:1}))
  - [...arr] (=slice)

* 在需要使用数组作为函数参数的情况下,通常使用 Function.prototype.apply 方法
```js
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
```


#### 11.23
* 深拷贝

* 浅拷贝
  - assign（拷贝的是属性值；方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter） (拷贝后 obj1变了，obj2不会跟着变)（Object.assign 会跳过那些值为 null 或 undefined 的源对象。）
  - 

...

#### 11.27
#### service worker
* 使用场景：
  - 同步后台数据
  - 离线体验
  - 处理网络请求
* 生命周期：

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```


#### 11.30
* h5动画库 2d webgl renderer http://www.pixijs.com/
* 方法1：线下图片打包，页面直接下载后本地解压分离
  - jszip库 用来压缩图片，（jszip的基础是type array和blob）（http://stuk.github.io/jszip/）
  - 按照官网介绍使用 location 触发下载，小容量内容测试时一切都好，正式导出时Chrome就反复崩溃。Google之，原来Chrome的URL上限是2M，当压缩后的内容超过2M后，就不能再通过 location 触发下载了。没办法继续Google，从国外一个大侠的博客中找到了克敌制胜的法宝：Uint8Array 和 ArrayBuffer。
  - Uint8Array 和 ArrayBuffer 也是新标准带来的好东西。前者表示一个由8位无符号整数组成的数组，后者则代表一段二进制数据缓冲，这样说大家可能不明白，按照我的理解和用法，就是存储在 Uint8Array（JavaScript 类型数组的一种）的数据可以通过访问其 ArrayBuffer 属性来转化成二进制对象。前文的代码经修改已经可以支持二进制内容的写入，这里不再赘述。
* 方法2：转base64存到json中，请求后直接生成Image
* 方法3：图片转base64存js文件，放到cdn上用jsonp请求

### 12.21

#### jsbridge （js 与 native 通信原理）
##### iOS js
  * ios 发消息给 js ：有直接方法调用
    - swift : webview.stringByEvaluatingJavaScriptFromString("Math.random()")
    - OC : [webView stringByEvaluatingJavaScriptFromString:@"Math.random();"];
  * js 发消息给 iOS ：iOS 可以捕捉到 js 的网络请求，所以定个特殊协议（eg: JSBridge://transfer/..）
    - 通过 iframe src 发协议（不可通过改变 location.href ，因为只能收到最近一次变化）
##### Android js
  * android 发消息给 js ：有直接方法调用
    - webView.loadUrl("javascript:Math.random()"); 
  * js 发消息给 android ：
    - 通过schema方式，使用`shouldOverrideUrlLoading`方法对url协议进行解析。这种js的调用方式与ios的一样，使用iframe来调用native代码。 
    - android 注入js代码来接收消息`webView.addJavascriptInterface(new JSInterface(), "AndroidJS");  `，js 调用 `AndroidJS.getUserData()`
    - android 可重写 alert/console/prompt 这三个，一般使用`prompt`

````
class JSInterface {  
    @JavascriptInterface //注意这个代码一定要加上
    public String getUserData() {
        return "UserData";
    }
}
````
  


### 12.28 待续
1. server render
  - node + react ( 1.利于SEO; 2.提高收评渲染速度; 3.前后端都可用js )
  - 方法：renderToString(会加属性data-react-id、data-checksum)、renderToStaticMarkup(不会加属性)
  - [实践](http://www.alloyteam.com/2017/01/react-from-scratch-server-render/)
2. rn
3. sw
4. web assembly
  - 不稳定，文档还在修订中
  - 新型的代码,低级的汇编语言，具有紧凑的二进制格式，以接近原生的性能运行，并提供诸如C / C ++等语言编译目标，以便它们可以在网络上运行。它也被设计为与JavaScript一起运行，允许两者一起工作。

5. pwa
  - 是提供类似 App 体验的网站
  - 具体技术包括 Service worker、 Web App Manifest、 Cache API、 Fetch API、 Push API、 Web Push Protocol、 Notification 等等



### ArrayBuffer
* ArrayBuffer对象、TypedArray对象、DataView对象是JavaScript操作二进制数据的一个接口。
* 设计目的：与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是**二进制**的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像C语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升
* ArrayBuffer 内存中的一段二进制数据(不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。)
* TypedArray 用来生成内存的视图，通过9个构造函数，可以生成9种数据格式的视图
* DataView 用来生成内存的视图，可以自定义格式和字节序
* [ruanyifeng](http://javascript.ruanyifeng.com/stdlib/arraybuffer.html)

* 用到了 ArrayBuffer 操作二进制数据的接口：

  - file API
  - XMLHttpRequest
  - Fetch API
  - Canvas
  - WebSockets
  - ...


[working on](https://www.zybuluo.com/MelodyCC/note/192650)


* websocket 通过 ArrayBuffer 发送或接收二进制数据
```js
  var socket = new WebSocket('ws://127.0.0.1:8081');
  socket.binaryType = 'arraybuffer';

  // Wait until socket is open
  socket.addEventListener('open', function (event) {
    // Send binary data
    var typedArray = new Uint8Array(4);
    socket.send(typedArray.buffer);
  });

  // Receive binary data
  socket.addEventListener('message', function (event) {
    var arrayBuffer = event.data;
    // ···
  });

```

#### 1.4
当元素绝对定位后，若该元素的格式化属性不发生变化，则该元素处于静态位置。关于绝对定位元素格式化的相关内容移步至此。元素的静态位置是指元素在正常流中原本的位置，更确切的讲，顶端的静态位置是从包含块的上边界到假想框的上外边距边界之间的距离。假想框是假设元素position属性为static时元素的第一个框。

　　但对于居中对齐的行内元素来说，将元素设置为absolute或fixed会发生静态位置跳动问题。而relative或static则不会有此问题。这是因为元素默认的居中对齐是元素的内容中线对应父级块级元素中线，而当元素绝对定位或固定定位之后，定位元素左边界将与其父级块级元素的中线对齐。









