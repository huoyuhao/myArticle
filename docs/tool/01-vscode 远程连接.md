
# vscode远程连接

## 配置云服务器

开启HTTP代理

```linux
cat ~/.bashrc
export http_proxy=devnet-proxy.oa.com:8080
export https_proxy=devnet-proxy.oa.com:8080
export ftp_proxy=devnet-proxy.oa.com:8080
export no_proxy="127.0.0.1,tlinux-mirror.tencent-cloud.com,tlinux-mirrorlist.tencent-cloud.com,localhost,mirrors-tlinux.tencentyun.com,.oa.com,.local"
```

设置tlinux云开发机支持ssh-public-key登录

```linux
vim /etc/ssh/sshd_config

AllowAgentForwarding yes #vscode使用TcpForwarding模式，需要把这两项配置打开
AllowTcpForwarding yes #vscode使用TcpForwarding模式，需要把这两项配置打开
RSAAuthentication yes #打开RSA签名认证模式
PubkeyAuthentication yes #打开公钥认证模式
# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile .ssh/authorized_keys 
#设置默认的公钥保存文件，设置的值是.ssh/authorized_keys，设置后实际读取的文件为~/.ssh/authorized_keys

systemctl restrt sshd
```

### 本地开发安装vscode插件

安装插件`Remote SSH`

安装完成填写连接服务器的IP、端口、登录用户等信息，点击连接

## 问题

### 1. 解決rpm conflicts with file from package

+ 安裝的時候增加–replacefiles參數
+ `rpm -ivh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm --replacefiles`

### 2. php点击查看函数声明

+ 安装插件`php intelliSecse`

+ 修改扩展设置
  找到插件`php intelliSecse`，点击该插件设置，选择【扩展设置】，点击配置文件setting，编辑 `php.executablePath` 选项，修改为php安装路径（Linux为 / usr/bin/php）

### 3. php点击查看函数声明失败

+ 失败原因一般是PHP版本过低，[安装php7](https://www.jianshu.com/p/1e23aba0a164)版本
+ 安装成功后更改php可执行文件没有在$PATH中
+ 运行`ln -s /usr/local/php/bin/php /usr/bin/php`
+ 运行`php -v`查看是否成功