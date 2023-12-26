---
meta:
  - name: description
    content: Linux常用命令
  - name: keywords
    content: Linux常用命令,Linux,常用命令,
---

# Linux常用命令

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

// 查看默认防火墙状态（关闭后显示notRunning，开启后显示running）
firewall-cmd --state
```

## MySQL

```linux
# 链接数据库
mysql -umysql -h9.134.32.65 -p
use oss;
show tables;

```

## Others

```shell
ls -a   # 显示所有文件
ctrl+c  # 退出当前模式
rm -rf  # 删除当前目录下的所有文件 比较危险 无法恢复
sudo -s # 切换到root用户
df -hl  # df命令是linux系统以磁盘分区为单位查看文件系统，可以加上参数查看磁盘剩余空间信息
kill 00 # 关闭nginx或者响应进程
sudo chmod -R 777 www # 更改www目录权限
netstat -tpln         # 查看项目端口
kill -9 2238 # 杀死进程PID为2238的进程
sudo passwd root      # 设置root密码
chkconfig --list      #查看开机启动服务列表
telnet 127.0.0.1 80 # 测试ip端口连通性
killport 3000 # 删除端口占用
lsof -i:端口号 # 展示所有端口

# grep
grep -A1 '060d2b1dd41f4ad38d271e4fa991163f' ./root.log
# 匹配文件中 同一行包含 word1、word2、word3 之一
grep -E "word1|word2|word3" ./xxx.log

# 过滤文件名
find ./* -type f -name "*.log" | grep keyword
# 查找文件包含字段的内容
find . -type f | xargs grep keyword

# tailf 日志名 查看日志
```
