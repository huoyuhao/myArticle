---
meta:
  - name: description
    content: Node命令
  - name: keywords
    content: Node命令,HTTPS,前端,Node,Nginx
---
# Node命令

## Node & Npm安装

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

## 用forever 进行管理

```js
npm install -g forever
forever start index.js
```

## PM2进程管理

### 安装

```js
// 通过npm安装
npm install -g pm2

// 通过yarn安装
yarn global add pm2

// 添加pm2命令自动完成功能
pm2 completion install
```

:::danger
安装完成后使用报错：
/usr/lib/node_modules/pm2/node_modules/chalk/source/index.js:103
  ...styles,
  ^^^

原因是pm2版本过高，因为我的nodejs才是v6.17.1版本，升级node即可
:::

### 多进程管理

PM2自身帮你维护着一个进程列表，你可以很方便的对列表中的进程进行启动、重启和停止等操作。你的所有项目都会在底层运行，你可以通过命令行，也就是PM2 CLI工具和你的项目进行交互。

通过 start 和 delete 命令将你的项目添加到进程列表里面

```js
// 将项目添加到进程列表，并启动该进程
pm2 start app.js

// 查看进程列表
pm2 ls

// 从进程列表中删除指定名称的进程
pm2 delete app

// 在start命令后面加上--name 或者-n参数来直接指定进程的名称
pm2 start app.js --name myApp

// 停止该进程，但是依然会保留在进程列表里面
pm2 stop app

// 启动该进程
pm2 start app

// 重启该进程，即先运行了stop命令，然后再运行start命令
pm2 restart app
```
