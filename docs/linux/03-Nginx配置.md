---
meta:
  - name: description
    content: NGINX配置
  - name: keywords
    content: NGINX配置,NGINX,前端,alias,root,Nginx
---
# NGINX配置

## 1. 基础特点

+ Nginx 专为性能优化而开发。
  + 性能是其最重要的考量,实现上非常注重效率 。它支持内核 Poll 模型，能经受高负载的考验,有报告表明能支持高达 50,000 个并发连接数。
+ Nginx 具有很高的稳定性。
  + 其它 HTTP 服务器，当遇到访问的峰值，或者有人恶意发起慢速连接时，很可能会导致服务器物理内存耗尽频繁交换，失去响应，只能重启服务器。例如当前 apache 一旦上到 200 个进程以上，web响应速度就明显非常缓慢了。而 Nginx 采取了分阶段资源分配技术，使得它的 CPU 与内存占用率非常低。
  + Nginx 官方表示在保持 10,000 个无活动连接时，它只占 2.5M 内存，所以类似 DOS 这样的攻击对 Nginx 来说基本上是毫无用处的。就稳定性而言，Nginx 比 lighthttpd 更胜一筹。
+ Nginx 支持热部署。
  + 它的启动特别容易, 并且几乎可以做到 7*24 不间断运行，即使运行数个月也不需要重新启动。
  + 你还能够在不间断服务的情况下，对软件版本进行升级。

## 2. 常用命令

```sh
# nginx配置文件位置
cd /etc/nginx/conf.d

# nginx的启动
systemctl start nginx
# 热加载，重新加载配置文件
nginx -s reload

# 测试nginx是否正常
nginx –t
```

## 3. 配置

### 3.1 配置示例

```config
#指令名 指令值;  #全局块，主要设置Nginx服务器整体运行的配置指令
worker_processes  1;

#events块,主要设置,Nginx服务器与用户的网络连接,这一部分对Nginx服务器的性能影响较大
events {
    worker_connections  1024;
}

#http块，是Nginx服务器配置中的重要部分，代理、缓存、日志记录、第三方模块配置...  
http {

  #指令名 指令值;
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  #server块，是Nginx配置和虚拟主机相关的内容
  server {
    listen       80;
    server_name  localhost;
    
    #location块，基于Nginx服务器接收请求字符串与location后面的值进行匹配，对特定请求进行处理
    location / {
      #指令名 指令值;
      root   html;
      index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }

}
```

nginx.conf配置文件中默认有三大块：全局块、events块、http块

http块中可以配置多个server块，每个server块又可以配置多个location块

### 3.2 全局块

全局块是默认配置文件从开始到events块之间的一部分内容，主要设置一些影响Nginx服务器整体运行的配置指令，因此，这些指令的作用域是Nginx服务器全局。

通常包括配置运行Nginx服务器的用户（组）、允许生成的worker process数、Nginx进程PID存放路径、日志的存放路径和类型以及配置文件引入等

### 3.3 events块

events块涉及的指令主要影响Nginx服务器与用户的网络连接。常用到的设置包括是否开启对多worker process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型处理连接请求，每个worker process可以同时支持的最大连接数等。

这一部分的指令对Nginx服务器的性能影响较大，在实际配置中应该根据实际情况灵活调整

### 3.4 http块

http块是Nginx服务器配置中的重要部分，代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。

前面已经提到，http块中可以包含自己的全局块，也可以包含server块，server块中又可以进一步包含location块，在本书中我们使用“http全局块”来表示http中自己的全局块，即http块中不包含在server块中的部分。

可以在http全局块中配置的指令包括文件引入、MIME-Type定义、日志自定义、是否使用sendfile传输文件、连接超时时间、单连接请求数上限等。

### 3.5 server块

server块和“虚拟主机”的概念有密切联系。

虚拟主机，又称虚拟服务器、主机空间或是网页空间，它是一种技术。该技术是为了节省互联网服务器硬件成本而出现的。这里的“主机”或“空间”是由实体的服务器延伸而来，硬件系统可以基于服务器群，或者单个服务器等。虚拟主机技术主要应用于HTTP、FTP及EMAIL等多项服务，将一台服务器的某项或者全部服务内容逻辑划分为多个服务单位，对外表现为多个服务器，从而充分利用服务器硬件资源。从用户角度来看，一台虚拟主机和一台独立的硬件主机是完全一样的。

在使用Nginx服务器提供Web服务时，利用虚拟主机的技术就可以避免为每一个要运行的网站提供单独的Nginx服务器，也无需为每个网站对应运行一组Nginx进程。虚拟主机技术使得Nginx服务器可以在同一台服务器上只运行一组Nginx进程，就可以运行多个网站。

在前面提到过，每一个http块都可以包含多个server块，而每个server块就相当于一台虚拟主机，它内部可有多台主机联合提供服务，一起对外提供在逻辑上关系密切的一组服务（或网站）。

和http块相同，server块也可以包含自己的全局块，同时可以包含多个location块。在server全局块中，最常见的两个配置项是本虚拟主机的监听配置和本虚拟主机的名称或IP配置。

```config
server {
  listen              443 ssl http2;
  listen              [::]:443 ssl http2;
  server_name         domain.com *.domain.com;
  root                /var/www/domain/dist;
  # SSL
  ssl_certificate     /etc/nginx/ssl/domain.com.pem;
  ssl_certificate_key /etc/nginx/ssl/domain.com.key;
  # security
  include             sites-available/security.conf;
  # index.html fallback
  location / {
    try_files $uri $uri/ /index.html;
  }
  # reverse proxy
  location /api/ {
    proxy_pass http://127.0.0.1:8080/;
    include    sites-available/proxy.conf;
  }
  # allow safe files
  location ~* \.(?:css(\.map)?|js(\.map)?|ttf|ttc|otf|eot|woff2?|svgz?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv|pdf|docx?|dotx?|docm|dotm|xlsx?|xltx?|xlsm|xltm|pptx?|potx?|pptm|potm|ppsx?)$ {
    add_header Access-Control-Allow-Origin "*";
    add_header Cache-Control "public";
    expires    30d;
  }
  # additional config
  include sites-available/general.conf;
}
# HTTP redirect
server {
  listen      80;
  listen      [::]:80;
  server_name .domain.com;
  return      301 https://domain.com$request_uri;
}
```

```config
# gzip
gzip            on;
gzip_vary       on;
gzip_proxied    any;
gzip_comp_level 6;
gzip_types      text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
```

### 3.6 location配置

#### 3.6.1 location 配置

```config
location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
```

修饰符匹配优先级从高到低依次为

+ `location =` 表示精确匹配。只有请求的url路径与后面的字符串完全相等时，才会命中。如果已经匹配成功，就停止继续向下搜索并立即处理此请求
+ `location ^~` 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找
+ `location ~` 表示该规则是使用正则定义的，区分大小写
+ `location ~*` 表示该规则是使用正则定义的，不区分大小写
+ `location /a` 普通前缀匹配，优先级低于带参数前缀匹配
+ `location /` 任何没有匹配成功的，都会匹配这里处理

注意：在浏览器传送URI时对一部分字符进行URL编码，比如空格被编码为`%20`，问号被编码为`%3f`等。`～`有一个特点是，它对uri中的这些符号将会进行编码处理。比如，如果location块收到的URI为`/html/%20/data`，则当Nginx服务器搜索到配置为`～ /html/ /data`的location时，可以匹配成功

#### 3.6.2 location 案例分析

```conf
server {
  server_name liam.com;
  location ^~ /document {
      return 701; # 用这样的方式，可以方便的知道请求到了哪里
  }
  location /doc {
    return 702;
  }
  location ~* ^/doc$ {
    return 703; 
  }

  location /use {
    return 704;
  }
  location /user {
    return 705;
  }

  location ~ ^/tes[a-z]+ {
    return 706;
  }
  location ~ ^/te[a-z]+ {
    return 707;
  }

  location ~ ^/ima[a-z]+ {
    return 708;
  }

  location ~ ^/image[a-z]+ {
    return 709;
  }
}
# 修改本机hosts文件 127.0.0.1 liam.com
# curl -I liam.com/document 查看返回码，可以方便的知道请求到了哪里
liam.com/document 701 ^~ 命中以后不会再搜寻正则匹配
liam.com/doc 703 ^~ 按照上述的规则，显然第三个正则匹配会有更高的优先级
liam.com/userName 705 前缀匹配下，返回最长匹配的 location，与 location 所在位置顺序无关
liam.com/test 706 
liam.com/images 708 正则匹配是使用文件中的顺序，先匹配成功的返回
```

#### 3.6.3 location URI结尾带不带 /

关于 URI 尾部的 / 有三点也需要说明一下。第一点与 location 配置有关，其他两点无关。

+ location 中的字符有没有 / 都没有影响。也就是说 /user/ 和 /user 是一样的。
+ 如果 URI 结构是 `https://liam.com/` 的形式，尾部有没有 / 都不会造成重定向。因为浏览器在发起请求的时候，默认加上了 / 。虽然很多浏览器在地址栏里也不会显示 / 。这一点，可以访问baidu验证一下。
如果 URI 的结构是 `https://liam.com/some-dir/` 。尾部如果缺少 / 将导致重定向。因为根据约定，URL 尾部的 / 表示目录，没有 / 表示文件。所以访问 `/some-dir/` 时，服务器会自动去该目录下找对应的默认文件。如果访问 `/some-dir` 的话，服务器会先去找 `some-dir` 文件，找不到的话会将 `some-dir` 当成目录，重定向到 `/some-dir/ `，去该目录下找默认文件。可以去测试一下你的网站是不是这样的

#### 3.6.4 location @name的用法

@用来定义一个命名location。主要用于内部重定向，不能用来处理正常的请求。其用法如下

```conf
location / {
  try_files $uri $uri/ @custom
}
location @custom {
  # ...do something
}
```

### 3.7 虚拟目录alias和root

+ `alias`指定的目录是准确的，即location匹配访问的path目录下的文件直接是在alias目录下查找的；
+ `root`指定的目录是location匹配访问的path目录的上一级目录，这个path目录一定要是真实存在root指定目录下的；

```shell
# /data 目录
|--img
   |--logo.png
   |--header.png
|--images
   |--banner.png
   |--index.png
```

```config
location /test/ {
  alias /data/images/;
}
# http://XXX.com/test/banner.png 访问成功
# alias虚拟目录配置中，location匹配的path目录如果后面不带"/"，那么访问的url地址中这个path目录后面加不加"/"不影响访问，访问时它会自动加上"/"；
# 但是如果location匹配的path目录后面加上"/"，那么访问的url地址中这个path目录必须要加上"/"，访问时它不会自动加上"/"。如果不加上"/"，访问就会失败！
# 即 /test/ alias /data/images 会导致访问失败

location ~ ^/im[a-z]+/ {
  root /data/;
}
# http://XXX.com/images/banner.png 访问成功
# http://dev.doppler.oa.com/img/logo.png 访问成功
# root目录配置中，location匹配的path目录后面带不带"/"，都不会影响访问。
```
