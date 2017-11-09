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













