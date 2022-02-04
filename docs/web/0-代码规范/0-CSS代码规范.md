---
meta:
- name: description
  content: 前端CSS代码规范
- name: keywords
  content: 前端规范,前端CSS代码规范,CSS,前端,规范,命名规范,CSS规范
---

# CSS代码规范

## 1. 加载方式

### 1.1. CSS样式由四种加载方式

#### 1.1.1 行内样式

直接对HTML标签引入style=""设置样式

优缺点：

+ 省去了CSS渲染树的构建查找等工作
+ 结构样式没有分离，导致代码冗余不利于维护

`<div style="border:1px red solid;">liam</div>`

#### 1.1.2 内嵌样式--内部样式表

在head标签之间用`<style></style>`标签声明

优缺点：

+ css代码会随着html文件一起下载，不会出现资源加载失败或者css资源延迟响应照成的页面只有文字
+ 内嵌样式会随着页面下在一起下载，在DOM解析过程中同时进行CSS解析，无需经过发送请求、三次握手后获取到CSS资源文件，有利于页面快速加载，避免CSS资源加载失败，照成整体样式丢失
+ 在多个页面的项目中，会照成代码冗余，不利于维护（模板文件除外）
+ 不能够被浏览器缓存（html文件一般不会设置缓存请求头信息）

```html
<style type="text/css">
div{ margin : 0; padding: 0; border: 1px red solid; }
</style>
```

#### 1.1.3 链入外部样式表—在head部分加入

链接样式使用最多，推荐使用的一种方法，在`<head></head>`标签之间用`<link ...../>`引入css文件

`<link rel="stylesheet" href="liam.css" media="all"/>`

#### 1.1.4 导入外部样式表—在head部分加入

导入方式指的是使用 CSS 规则引入外部 CSS 文件

```html
<style>
@import url(style.css);
</style>
```

### 1.2 链接方式和导入方式比较

+ link 属于 HTML，通过 `<link>` 标签中的 href 属性来引入外部文件，而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件
+ @import 是 CSS2.1 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件
+ 当 HTML 文件被加载时，link 引用的文件会同时被加载，而 @import 引用的文件则会等页面全部下载完毕再被加载

### 1.3 团队约定

+ 在页面中尽量避免使用style属性，即style="…"
+ 首屏关键CSS样式可以使用嵌入式样式加载
+ 非关键CSS样式使用外链形式加载

### 1.4 更多

+ 内联样式虽然省去了CSS渲染树的构建查找等工作，但是CSS外链形式可以进行缓存的。而且不符合结构与表象分离的思想
+ 非关键样式通过外链形式（或者[异步下载方式](https://juejin.im/post/5b6133a351882519d346853f#heading-1)）进行加载，可以通过浏览器进行缓存，减少加载时间，同时异步下载，减少源文件（html）大小
+ 更多内容查看[内联和外链脚本的性能实验](https://harttle.land/2017/05/05/external-scripts-vs-inline.html)

## 2. 代码风格

### 2.1. 命名

#### 2.1.1 class与id命名

+ id命名使用小驼峰命名，如：`userID`
+ class命名使用由 小写英文和 - 来组合命名, 如：`banner-container`
+ 避免使用中文拼音, 尽量使用简易的单词组合， 命名要语义化, 简明化.

class命名使用字符 `-` 增加易读性，而且和css属性名称保持了一致

*也可以使用下划线`_`作为连接符（双击更加容易全选中当前class）*

更多命名查看 [CSS 命名法](https://segmentfault.com/a/1190000007956424)

#### 2.1.2 头部缩写推荐

+ 重置和默认：reset + base
+ 布局(g-) 例如头部，尾部，主体，侧栏等
+ 模块(m-) 较大整体，如登录注册，搜索等
+ 元件(u-) 不可再分个体，例如按钮，input框等
+ 功能(f-) 使用频率较高样式，例如清除浮动
+ 皮肤(s-) 例如文字色，背景色，边框色等
+ 状态(z-) 例如hover，选中等
+ js- 专门用于js获取节点，勿占用

#### 2.1.3 常用头部名称

##### 类class的命名规范示例

内容：content/container
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体布局宽度：wrapper/box
广告：banner
页面主体：main
子导航：sub-nav
菜单：menu
子菜单：sub-menu
友情链接：friend-link
提示信息：msg
小技巧：tips
指南：guild
服务：service
注册：register
状态：status
投票：vote
合作伙伴：partner

### 2.2 编码格式

+ 样式文件必须写上 @charset 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”
+ 字符 @charset “”; 都用小写字母，不能出现转义符，编码名允许大小混写

```css
@charset "UTF-8";
.liam{}
```

### 2.3 代码格式化

样式书写一般有两种：

```css
/* 一种是紧凑格式 (Compact) */
.liam{ display: block; width: 50px; }

/* 一种是展开格式（Expanded）*/
.liam{
  display: block;
  width: 50px;
}
```

**团队约定**:
统一使用展开格式书写样式

### 2.4 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写

```css
/* 推荐 */
.liam{
  display: block;
}

/* 不推荐 */
.liam{
  DISPLAY: BLOCK;
}
```

### 2.5 代码缩进

统一使用两个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```css
.liam {
  width: 100%;
  height: 100%;
}
```

### 2.6 空格&分号

+ 左括号与类名之间一个空格，冒号与属性值之间一个空格
+ 逗号分隔的取值，逗号之后一个空格
+ 为单个css选择器或新申明开启新行
+ 颜色值 rgb() rgba() hsl() hsla() rect() 中每个逗号后必需有空格，且取值不要带有不必要的 0
+ 属性值十六进制数值能用简写的尽量用简写
+ 不要为 0 指明单位
+ \>、\+、\~ 选择器的两边各保留一个空格

```css
/* 推荐 */
.liam {
  width: 100%;
  box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
  color: rgba(255, 255, 255, .5);
  color: #fff;
  margin: 0 10px;
}
.liam,
.liam-logo {
  color: #ff0;
}
.liam > .user{}

/* 不推荐 */
.liam{ /* 1 */
  width:100%; /* 1 */
  box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc; /* 2 */
  color: rgba( 255,255,255,0.5 ); /* 4 */
  color: #ffffff; /* 5 */
  margin: 0px 10px; /* 6 */
}
.liam, .liam-logo { /* 3 */
  color: #ff0;
}.nav{ /* 3 */
  color: #fff;
}
.liam>.user{} /* 7 */
```

### 2.7 属性值引号

css属性值需要用到引号时，统一使用双引号

```css
/* 推荐 */
.liam {
  font-family: "Hiragino Sans GB";
}

/* 不推荐 */
.liam {
  font-family: 'Hiragino Sans GB';
}
```

## 3. 通用

### 3.1 选择器

CSS选择器的匹配是**从右向左**进行的，这一策略导致了不同种类的选择器之间的性能也存在差异。相比于#markdown-content-h3，显然使用#markdown .content h3时，浏览器生成渲染树（render-tree）所要花费的时间更多。因为后者需要先找到DOM中的所有h3元素，再过滤掉祖先元素不是.content的，最后过滤掉.content的祖先不是#markdown的。试想，如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高。

不过现代浏览器在这一方面做了很多优化，不同选择器的性能差别并不明显，甚至可以说差别甚微。此外不同选择器在不同浏览器中的性能表现也不完全统一，在编写CSS的时候无法兼顾每种浏览器。

**团队约定**：

+ 尽量少用通用选择器 *
+ 不使用 ID 选择器
+ 不要嵌套过多过于复杂的选择器
+ 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用
+ 不要使用类选择器和ID选择器修饰元素标签，如：h3#markdown，这样多此一举，还会降低效率
+ 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确
+ 除非是样式reset需要，禁止对纯元素选择器设置特定样式，避免样式污染

```css
/* 推荐 */
.liam {}
.liam li {}
.list > li > .item {}
.pro-list p {}
#username input {}
.comment .avatar {}

/* 不推荐 */
*{}
#liam {}
.container .list > li > p {}
p {}
.page .header .login #username input {}
.comment div * {}
```

更多内容了解[为什么CSS选择器是从右往左解析](https://blog.csdn.net/jinboker/article/details/52126021)

### 3.2 属性缩写

`margin、padding、border、font、background`等样式尽可能采用合并写法

```css
/* 推荐 */
.liam {
  margin: 10px 0 .8px;
  border: 1px solid #CCC;
}

/* 不推荐 */
.liam{
  margin: 10px 0px 0.8px;
  border-width: 1px;
  border-style: solid;
  border-color: #CCC;
}
```

### 3.2 属性书写顺序

建议遵循以下顺序：

+ 布局定位属性：display / position / float / clear / visibility / overflow
+ 自身属性：width / height / margin / padding / border / background
+ 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
+ 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```css
.liam {
  display: block;
  position: relative;
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 10px;
  padding: 20px 0;
  font-size: 18px;
  color: #333;
  background: rgba(0,0,0,.5);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

### 3.4 important

+ 尽量不使用 !important 声明。
+ 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 !important 定义样式。

必须注意的是，仅在设计上 确实不允许任何其它场景覆盖样式 时，才使用内联的 !important 样式。通常在第三方环境的应用中使用这种方案。下面的 z-index 章节是其中一个特殊场景的典型样例

### 3.5 z-index

+ 将 z-index 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。
  + 同层的多个元素，如多个由用户输入触发的 Dialog，在该层级内使用相同的 z-index 或递增 z-index。
  + 建议每层包含100个 z-index 来容纳足够的元素，如果每层元素较多，可以调整这个数值。
+ 在可控环境下，期望显示在最上层的元素，z-index 指定为 999999。
  + 可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。
  + 不建议取值为 2147483647。以便于自身产品线被其他产品线引用时，当遇到层级覆盖冲突的情况，留出向上调整的空间。
+ 在第三方环境下，期望显示在最上层的元素，通过标签内联和 !important，将 z-index 指定为 2147483647
  + 第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。

## 4. 值与单位

### 4.1 文本

本内容必须用双引号包围。

文本类型的内容可能在选择器、属性值等内容中

```css
/* 推荐 */
.liam {
  font-family: "Hiragino Sans GB";
}

/* 不推荐 */
.liam {
  font-family: 'Hiragino Sans GB';
}
```

### 4.2 数值

+ 当数值为 0 - 1 之间的小数时，省略整数部分的 0
+ 如果没有边框时，不要写成border:0;应该写成border:none

```css
/* 推荐 */
.liam {
  opacity: .8;
  border: none;
}

/* 不推荐 */
.liam {
  opacity: 0.8;
  border: 0;
}
```

### 4.3 url

+ url() 函数中的路径不加引号
+ url() 函数中的绝对路径可省去协议名

```css
/* 推荐 */
.liam {
  background: url(bg.png);
}
.liam {
  background: url(//baidu.com/img/bg.png) no-repeat 0 0;
}
```

### 4.4 颜色

+ RGB颜色值必须使用十六进制记号形式。不允许使用 rgb()
+ 颜色值可以缩写时，必须使用缩写形式
+ 颜色值不允许使用命名色值

```css
/* 推荐 */
.liam {
  border-color: #00FF00;
  background-color: #FFF;
  color: #FF0000;
}

/* 不推荐 */
.liam {
  border-color: rgb(0, 255, 0);
  background-color: #FFFFFF;
  color: red;
}
```

## 5. 文本编排

### 5.1 字体

+ font-family 属性中的字体族名称应使用字体的英文 Family Name，其中如有空格，须放置在引号中。
+ font-family 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( serif / sans-serif )
+ font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一

```css
/* 推荐 */
body {
  font-family: Arial, sans-serif;
}
h1 {
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

/* 不推荐 */
body {
  font-family: arial, sans-serif;
}
h1 {
  font-family: Arial, "Microsoft YaHei", sans-serif;
}
```

### 5.2 字体大小

**需要在 Windows 平台显示的中文内容，其字号应不小于 12px。**

由于 Windows 的字体渲染机制，小于 12px 的文字显示效果极差、难以辨认

### 5.3 字体风格

**需要在 Windows 平台显示的中文内容，不要使用除 normal 外的 font-style。其他平台也应慎用。**

由于中文字体没有 italic 风格的实现，所有浏览器下都会 fallback 到 obilique 实现 (自动拟合为斜体)，小字号下 (特别是 Windows 下会在小字号下使用点阵字体的情况下) 显示效果差，造成阅读困难。

### 5.4 字重

**font-weight 属性必须使用数值方式描述。**

CSS 的字重分 100 – 900 共九档，但目前受字体本身质量和浏览器的限制，实际上支持 400 和 700 两档，分别等价于关键词 normal 和 bold。

浏览器本身使用一系列启发式规则来进行匹配，在 <700 时一般匹配字体的 Regular 字重，>=700 时匹配 Bold 字重。

但已有浏览器开始支持 =600 时匹配 Semibold 字重 (见此表)，故使用数值描述增加了灵活性，也更简短。

### 5.5 行高

**line-height 在定义文本段落时，应使用数值。**

将 line-height 设置为数值，浏览器会基于当前元素设置的 font-size 进行再次计算。在不同字号的文本段落组合中，能达到较为舒适的行间间隔效果，避免在每个设置了 font-size 都需要设置 line-height。

当 line-height 用于控制垂直居中时，还是应该设置成与容器高度一致。

## 6. CSS注释

### 6.1 单行注释

注释内容第一个字符和最后一个字符都是一个空格字符，单独占一行，行与行之间相隔一行

```css
/* 推荐 */
.liam{}

/* 不推荐 */
.jdc {
  display: block;
}
.jdc {
  display: block; /* 不推荐 */
}
```

### 6.2 模块注释

注释内容第一个字符和最后一个字符都是一个空格字符，`/*` 与 模块信息描述占一行，多个横线分隔符 `-` 与 `*/` 占一行，行与行之间相隔两行

```css
/* 推荐
---------------------------------------------------------------- */
.mod_a {}

/* 不推荐 ---------------------------------------------------- */
.mod_a {}
```

### 6.3 文件信息注释

在样式文件编码声明 @charset 语句下面注明页面名称、作者、创建日期等信息

```css
@charset "UTF-8";
/**
* @desc File Info
* @author Author Name
* @date 2015-10-10
*/
```

## 7. 样式重置

### 7.1 H5移动端

```css
* { -webkit-tap-highlight-color: transparent; outline: 0; margin: 0; padding: 0; vertical-align: baseline; }
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin: 0; padding: 0; vertical-align: baseline; }
img { border: 0 none; vertical-align: top; }
i, em { font-style: normal; }
ol, ul { list-style: none; }
input, select, button, h1, h2, h3, h4, h5, h6 { font-size: 100%; font-family: inherit; }
table { border-collapse: collapse; border-spacing: 0; }
a { text-decoration: none; color: #666; }
body { margin: 0 auto; min-width: 320px; max-width: 640px; height: 100%; font-size: 14px; font-family: -apple-system, Helvetica,sans-serif; line-height: 1.5; color: #666; -webkit-text-size-adjust: 100% !important; text-size-adjust: 100% !important; }
input[type="text"], textarea { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
```

### 7.2 PC端

```css
html, body, div, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, ul, li, fieldset, form, label, input, legend, table, caption, tbody, tfoot, thead, tr, th, td, textarea, article, aside, audio, canvas, figure, footer, header, mark, menu, nav, section, time, video { margin: 0; padding: 0; }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal }
article, aside, dialog, figure, footer, header, hgroup, nav, section, blockquote { display: block; }
ul, ol { list-style: none; }
img { border: 0 none; vertical-align: top; }
blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: none; }
table { border-collapse: collapse; border-spacing: 0; }
strong, em, i { font-style: normal; font-weight: normal; }
ins { text-decoration: underline; }
del { text-decoration: line-through; }
mark { background: none; }
input::-ms-clear { display: none !important; }
body { font: 12px/1.5 \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, "Hiragino Sans GB", STHeiti, "WenQuanYi Micro Hei", "Droid Sans Fallback", SimSun, sans-serif; background: #fff; }
a { text-decoration: none; color: #333; }
a:hover { text-decoration: underline; }
```

### 7.3 媒体查询

```css
/* 判断设备横竖屏
---------------------------------------------------------------- */
/* 横屏 */
@media all and (orientation :landscape) {}

/* 竖屏 */
@media all and (orientation :portrait) {}


/* 判断设备宽高
---------------------------------------------------------------- */
/* 设备宽度大于 320px 小于 640px */
@media all and (min-width:320px) and (max-width:640px) {}

/* 判断设备像素比
---------------------------------------------------------------- */
/* 设备像素比为 1 */
@media only screen and (-webkit-min-device-pixel-ratio: 1), only screen and (min-device-pixel-ratio: 1) {}

/* 设备像素比为 1.5 */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {}

/* 设备像素比为 2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {}


/* 手机设陪适配示例
---------------------------------------------------------------- */
/* ----------- iPhone 6+ ----------- */
@media only screen
  and (min-device-width: 414px)
  and (max-device-width: 736px)
  and (-webkit-min-device-pixel-ratio: 3) {}
```

## 8. 其他

### 8.1 CSS3浏览器私有前缀写法

CSS3 浏览器私有前缀在前，标准前缀在后

```css
.liam {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

### 8.2 伪元素

伪元素是伪的，伪的意思就是说，你无法用js获取到这个伪元素，或者增、删、改一个伪元素，所以伪元素的优点就体现在这里了——你可以用伪元素制造视觉上的效果，但是不会增加JS查DOM的负担，它对JS是透明的。所以即使你给页面添加了很多伪元素，也不会影响查DOM的效率。同时，它不是一个实际的html标签，可以加快浏览器加载html文件，对SEO也是有帮助的。

使用伪元素场景推荐：

+ 没有语义化的标签可以通过伪元素实现
+ 一些符号、icon、清楚浮动等

### 8.3 其他原则

+ 利用html自身属性及样式继承原理减少代码量
+ 通过webpack打包压缩css文件代码
+ 书写代码前, 考虑并提高样式重复使用率
+ 在保存代码解耦的前提下，尽量合并重复的样式

## 9. 注意事项

本文暂未对【动画】、【适配】两个内容做规范要求，需要后续补充

## 10 参考

[前端代码规范](https://guide.aotu.io/docs/css/code.html)

[css编码规范](http://itmyhome.com/css/shu_xing_qian_zhui.html)

[CSS性能优化的8个技巧](https://juejin.im/post/5b6133a351882519d346853f#heading-6)
