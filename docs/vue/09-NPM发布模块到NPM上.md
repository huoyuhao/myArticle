---
meta:
- name: description
  content: NPM发布
- name: keywords
  content: NPM发布,NPM,发布模块,NPM发布模块
---

# NPM发布模块

在我们进行多个项目开发的时候，有时候发现有的Vue模块在这些项目中是共用的，这个时候我们就可以把这个模块封装发到NPM上，然后再项目中安装引入就可以使用了。

下面我就来简单介绍一下发布NPM包的流程

## 一、项目创建

### 1. 使用简洁的webpack配置模板webpack-simple初始化项目

```npm
vue init webpack-simple vue-name
#简洁的webpack配置模板
```

### 2. 编写组件代码，本地进行调试

先编写组件代码，例如：

```vue
<template>
  <div class="hello">{{ msg }}</div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}
</script>
```

然后在App.vue中直接引入本地的组件

```vue
<HelloWorld msg="这是一个测试内容"/></HelloWorld>
...
import HelloWorld from "./components/HelloWorld";
```

## 二、本地组件测试没问题,改造成vue插件类型的

### 1. 创建一个index.js文件，将组件输出

```js
import vueHelloWorld from './components/HelloWorld' // 导入组件
const HelloWorld= {
  install (Vue, options) {
    Vue.component(vueHelloWorld.name, vueHelloWorld) 
    // vuePayKeyboard.name 组件的name属性
    // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
    // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
    // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
  }
}
export default HelloWorld// 导出..
```

### 2. 修改配置文件package.json

#### 1) name

+ 名称，发布的模块名称，发布线上后，可以通过npm install xxxx来引用该模块，一般Vue组件以`vue-`开头

#### 2) description

+ 描述，该模块的简单描述

#### 3) version

+ 版本号，版本号分为A.B.C三位
+ A表示主版本号，如果有较大变动，且向下不兼容，需要更新，A为零时表示软件还在开发阶段
+ B表示次版本号，如果是新增了功能，而且向下兼容，需要更新
+ C表示补丁版本号，如修复bug

#### 4)author

+ 作者信息

#### 5）license

+ 代码授权许可，[具体编写可参考这里](https://zh.wikipedia.org/wiki/Category:%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E6%8E%88%E6%AC%8A)

#### 6）main

+ 主入口文件，该属性指定了程序的主入口文件。即如果你的模块被命名为foo，用户安装了这个模块并通过require("foo")来使用这个模块，那么require返回的内容就是main属性指定的文件中 module.exports指向的对象。

#### 7）keywords

+ 关键词，可以通过npm搜索你填写的关键词找到你的模块

#### 8）bugs

+ 填写一个bug提交地址或者一个邮箱，被你的模块坑到的人可以通过这里吐槽

```json
{
  "name": "name",
  "description": "description",
  "version": "1.0.0",
  "author": "author>",
  "license": "MIT",
  "main": "dist/index.js",
  "keywords": [
    "vue",
  ],
  "private": true,
  "bugs": {
    "email": "email"
  },
...
}
```

### 3. 修改.gitignore文件

因为要用dist文件夹，所以在.gitignore文件中把dist/去掉

### 4. 修改配置文件webpack.config.js

```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/lib/',
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
...
```

### 5. 修改文件目录格式

#### 1）删除不需要的文件

删除main.js、index.html、App.vue等不需要的文件

#### 2）更改目录

```js
HelloWorld
├── example                    # 存放demo的代码
├── lib                        # 真实引用编译过的代码
├── src                        # 存放源码的目录
├── style                      # 样式文件
├── .bebalrc                   # babel配置文件
├── index.js                   # 项目入口文件
├── package.json            
├── webpack.config.json        # 项目开发demo的时候 需要用到的webpack
└── README.md                  # 项目说明 安装 使用
```

### 6. 打包线下验证

#### 1）打包压缩组件

```linux
npm run build
npm pack
#打包完成可以看到项目目录下多了一个压缩文件
```

#### 2）新项目引入测试

```linux
# 安装打包文件 name：打包文件名称
npm install 路径/HelloWorld-1.0.0.tgz
# 引入组件
import HelloWorld from 'HelloWorld'
Vue.use(HelloWorld)
```

## 三、发布线上

```linux
npm login // 登陆 
npm publish // 发布
# 如果使用淘宝镜像 登陆会报错
# code E409
# npm ERR! 409 Conflict - PUT https://registry.npm.taobao.org/-/user/org.couchdb.user:XXX - conflict
# 请使用如下命令
npm login --registry http://registry.npmjs.org
npm publish --registry http://registry.npmjs.org
```

然后登陆自己的npm网站就可看到了
