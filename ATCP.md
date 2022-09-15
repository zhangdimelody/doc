## TCP

### 三次握手

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/22/1706c89b92f7503f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="三次握手建立连接" style="zoom:50%;" />



### 四次挥手

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/22/1706c89b93024c48~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="四次挥手关闭连接" style="zoom:50%;" />

### tips

1. 为什么不能变为2次握手，因为：如果最后一个应答没有的话，第一个请求如果阻塞，会重新发起请求，连接之后，如果第一个阻塞请求到了之后会有两个链接，产生浪费。有了最后一个应答，当客户端收到服务器关于阻塞请求的应答时，客户端就可以抛弃，不用这个链接，就不会产生浪费。
2. 为什么客户端要等2MSL自动关闭，因为：如果最后一个客户端发给服务器的应答 服务器没收到的话，服务器会再等1个MSL给客户端发一个fin，这一共是2MSL。