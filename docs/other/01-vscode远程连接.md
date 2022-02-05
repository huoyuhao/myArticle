
# vscode远程连接

## 配置云服务器

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

### 4. vscode免密码登录

1）生成密钥文件

2）上传本地密钥到服务器

```shell
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
```

3） 配置打开密钥登录功能

```shell
# 打开SSH配置文件
vim /etc/ssh/sshd_config

# 查看确认下面两项配置 默认不需要修改配置
RSAAuthentication yes
PubkeyAuthentication yes

# 当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录
PasswordAuthentication no

# 重启SSH
systemctl restart sshd
```

4）本机vscode配置

```config
Host liam
  HostName X.X.X.X
  User root
  Port XX
  IdentityFile //Users/liam/.ssh/id_rsa

Host liam
  HostName X.X.X.X
  User root
  Port 22
  IdentityFile //Users/liam/XX.pem

Host liam
  HostName X.X.X.X
  User root
  Port 22
  IdentityFile /d/XX.pem
```
