---
meta:
  - name: description
    content: 前端fiddler使用
  - name: keywords
    content: 前端fiddler使用,JavaScript,前端,fiddler,抓包
---
# 前端fiddler使用

## fiddler 抓取移动端H5网络请求

>有的时候我们遇到一些线上移动端的bug，比如按钮不能点击，信息显示不正确等前端问题。这个时候我们需要快速定位问题，查看移动端请求报文，这个时候可以使用Fiddler去抓取网页请求内容。

### 1. 连接同一局域网

首先需要保证手机与电脑连接在同一局域网中，比如，手机连接电脑开启的WiFi，或者手机电脑连接同一个WiFi
*只有连接同一局域网，Fiddler才能抓取手机请求*

### 2. Fiddler配置

打开Fiddler，点击按钮Tools------> Options，选择Connections tab页，配置如图所示：

![Fiddler配置](./img/Fiddler-1.png)

其中“8888”端口号是Fiddler代理服务的端口号
选项Allow remote computers to connect是一个Checkbox，勾选后Fiddler就可以查看非本机但是代理到本机设置端口的流量了
**注意：重启Fiddler才会生效**

### 3. 查看电脑IP

打开命令行，输出`ipconfig`

![电脑IP](./img/Fiddler-2.png)

如果所示，IP为：192.168.13.55

### 4. 手机配置

以 iPhone 为例，打开设置，链接同一WiFi，点击该WiFi名字后面的感叹号（详情）。点击【配置代理】，选择【手动】，填写服务器、端口信息。服务器IP即安装Fiddler的代理请求的电脑局域网IP地址（第三步查到的IP：192.168.13.55），因为使用Fiddler代理请求，所以端口需选择第二步中配置的Fiddler代理端口（8888）。
然后在手机上需要抓取信息的网址，会弹出不受信任的证书，安装后，再次打开该网址，就可以在Fiddler上看到抓取的信息了。

![iPhone手机配置](./img/Fiddler-3.png)
