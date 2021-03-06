---
meta:
  - name: description
    content: 浏览器DNS解析
  - name: keywords
    content: 浏览器DNS解析,DNS,前端,浏览器,
---
# 浏览器DNS解析

网域名称系统(DNS，Domain Name System)
因特网上的一个服务，将域名和IP地址相互映射的一个分布式数据库，能让用户更方便的访问互联网，而不是通过IP地址去读取。

下面具体介绍浏览器DNS解析域名的过程

+ 浏览器DNS缓存。浏览器会检查浏览器DNS缓存中是否有这个域名对应的解析过的IP地址，如果有，域名解析结束，使用对应的IP地址；

+ 操作系统DNS缓存。如果浏览器缓存没有，那么就检查操作系统的hosts文件，比如windows就是C:\Windows\System32\drivers\etc\hosts文件，linux在/etc/hosts文件中配置；

+ 域名服务器缓存。如果在本机无法完成域名解析，会通过网络配置中的本地DNS服务器，把域名发送给这个本地区DNS域名服务器（LDNS），也就是本地的服务提供商：如电信、联通、校园网；

+ 根域名服务器。根域名服务器返回给本地域名服务器一个所查询域的主域名服务器（gTLD Server）地址。gTLD是国际顶级域名服务器，如.com、.cn、.org等；

+ 主域名服务器（gTLD Server）地址。本地域名服务器（LDNS）请求国际顶级域名服务器。顶级域名服务器会返回所查询域名对应的Name server域名服务器地址。这个Name server域名地址就是你注册域名服务提供商的域名服务器地址，最终由这个Name server域名服务器解析；

+ Name server域名服务器。Name server域名服务器地址会根据域名和IP对应关系表，找到对应的IP记录，返回给本地域名服务器。本地域名服务器会缓存域名和IP的对应关系，并返回。本机同时也缓存在本地系统中，到此域名解析完成。

![DNS解析过程](/img/NDS解析.png)

> 在url地址栏输入chrome://net-internals/#dns可以查看chrome浏览器的dns缓存信息
