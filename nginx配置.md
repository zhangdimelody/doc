#### Nginx功能丰富，可作为HTTP服务器，也可作为[反向代理](https://so.csdn.net/so/search?q=反向代理&spm=1001.2101.3001.7020)服务器，邮件服务器。支持FastCGI、SSL、Virtual Host、URL Rewrite、Gzip等功能。并且支持很多第三方的模块扩展。



### nginx 常用命令

* 启动：nginx

* 关闭：  nginx-s stop

* 重启： nginx -s reload

* 检查配置文件： nginx -t  （输出配置文件的路径）

* 查看配置文件中的日志路径

  ```json
  http {
    ...
    access_log  logs/host.access.log
    ...
  }
  ```

  

#### todo

http

server

location /vitas/

​	root  /app   处理结果：root + location  (/app/vitas/...)

​	alias  /app/  处理结果: alias  (/app/...)

区别: 

	1. alias 必须在目录名后面加上/
	1. alias 只能位于location块中 （root可以不放在location中）

​	index

​	try_files

```shell
# 全局配置
user nginx;  # Nginx 进程运行的用户
worker_processes auto;  # Nginx 进程数，auto 表示自动根据 CPU 核心数设置
error_log /var/log/nginx/error.log;  # 错误日志文件路径
pid /run/nginx.pid;  # Nginx 进程 ID 文件路径

# 事件模块配置
events {
    worker_connections 1024;  # 每个进程最大连接数
    multi_accept on;  # 开启多个连接的接受
    use epoll;  # 使用 epoll 事件模型 ？
}

# HTTP 模块配置
http {
    include /etc/nginx/mime.types;  # MIME 类型配置文件路径
    default_type application/octet-stream;  # 默认 MIME 类型
    access_log /var/log/nginx/access.log;  # 访问日志文件路径

    # 服务器配置
    server {
        listen 80;  # 监听端口号
        server_name example.com;  # 服务器名称
        root /var/www/html;  # 网站根目录
        index index.html;  # 默认首页文件名

        # 访问控制
        location / {
            allow all;  # 允许所有访问
            deny 192.168.1.1;  # 拒绝指定 IP 访问
        }

        # 反向代理
        location /api/ {
            proxy_pass http://127.0.0.1:8080;  # 反向代理服务器地址
            proxy_set_header Host backend_server; # 反向代理服务器的主机名或 IP 地址
            # 如果被代理服务器使用了虚拟主机，即一个 IP 地址对应多个域名，那么 `Host` 字段需要设置为被代理服务器的域名，而不是 IP 地址。
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 				{
            expires 1d;  # 缓存时间
            add_header Cache-Control "public";  # 缓存控制
        }

        # HTTPS 配置
        listen 443 ssl;  # HTTPS 监听端口号
        ssl_certificate /etc/nginx/ssl/example.com.crt;  # SSL 证书文件路径
        ssl_certificate_key /etc/nginx/ssl/example.com.key;  # SSL 证书私钥文件路径
    }
}
```













