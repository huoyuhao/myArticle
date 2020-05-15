---
meta:
  - name: description
    content: Linux常用命令
  - name: keywords
    content: Linux常用命令,Linux,常用命令,
---

# Linux常用命令


## Node & Npm 
```js
// 最新版本安装方法 
sudo apt install nodejs-legacy 
sudo apt install npm

// 升级npm为最新版本
sudo npm install npm@latest -g 
npm install npm@4 -g // 4是版本号

// 安装用于安装nodejs的模块n 
sudo npm install -g n sudo n latest // 安装官方最新版本 
sudo n stable // 安装官方稳定版本 
sudo n lts // 安装官方最新LTS版本 
n 8.10.0 // 安装8.10.0版本
```

## Nginx 
```js
// nginx配置文件位置 
cd /etc/nginx/conf.d

// nginx的启动
systemctl start nginx
nginx -s reload

// 测试nginx是否正常
nginx –t
```

## Vim
```js
u   // 撤销上一步 
/   // 查找 
dd  // 删除光标所在行 
cat -n rsyslog.conf //显示所有行号（包括空行） 
cat -b rsyslog.conf //显示所有行号（不包括空行） 
```


## Firewall
```js
// 停止firewall 
systemctl stop firewalld.service

// 禁止firewall开机启动 
systemctl disable firewalld.service

// 查看默认防火墙状态（关闭后显示notrunning，开启后显示running） 
firewall-cmd --state
```


## Others
```js
ls -a   // 显示所有文件
ctrl+c  // 退出当前模式
rm -rf  // 删除当前目录下的所有文件 比较危险 无法恢复 
sudo -s // 切换到root用户
df -hl  // df命令是linux系统以磁盘分区为单位查看文件系统，可以加上参数查看磁盘剩余空间信息
kill 00 // 关闭nginx或者响应进程
sudo chmod -R 777 www // 更改www目录权限 
netstat -tpln         // 查看项目端口
sudo passwd root      // 设置root密码
chkconfig --list      //查看开机启动服务列表
```
