---
meta:
- name: description
  content: 前端HTML代码规范
- name: keywords
  content: 前端规范,前端HTML代码规范,HTML,前端,规范,命名规范,HTML规范
---

# HTML代码规范

## 1. 代码风格

### 1.1 缩进&换行

+ 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符
+ 每行不得超过 120 个字符

**解释：**过长的代码不容易阅读与维护。但是考虑到 HTML 的特殊性，不做硬性要求。

### 1.2 命名

#### 1.2.1 HTML文件命名

+ 引文件统一使用index.htm index.html index.asp文件名（小写）
+ 各子页命名的原则首先应该以栏目名的英语翻译取单一单词为名称
+ 如果栏目名称多而复杂并不好以英文单词命名，则统一使用该栏目名称拼音或拼音的首字母表示

#### 1.2.2 标签自定义属性命名

标签的自定义属性以data-开头，后面跟小写单词，多单词使用 - 连接如：`<a data-product-num='18' href="javascript:;"></a>`

#### 1.2.3 name 与 id

同一页面，应避免使用相同的 **name 与 id**

**解释：**IE 浏览器会混淆元素的 id 和 name 属性， document.getElementById 可能获得不期望的元素。所以在对元素的 id 与 name 属性的命名需要非常小心

一个比较好的实践是，为 id 和 name 使用不同的命名法

```html
<input name="foo">
<div id="foo"></div>
<script>
// IE6 将显示 INPUT
alert(document.getElementById('foo').tagName)
</script>
```

#### 1.2.4 文件存放位置命名

+ 图片文件：img
+ 存放javascript js
+ 存放css 文件：css

#### 1.2.5 引入库文件/插件

引入JS库文件，文件名须包含库名称及版本号及是否为压缩版。比如 `jquery-1.4.1.min.js`

引入插件，文件名格式为库名称+插件名称。比如 `jQuery.bootstrap.js`

### 1.3 标签

#### 1.3.1 标签名必须使用小写字母

#### 1.3.2 对于无需自闭合的标签，不允许自闭合

常见无需自闭合标签有input、br、img、hr等

```html
<!-- 推荐 -->
<input type="text" name="title">

<!-- 不推荐 -->
<input type="text" name="title" />
```

#### 1.3.3 对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签

```html
<!-- 推荐 -->
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<!-- 不推荐 -->
<ul>
  <li>first
  <li>second
</ul>
```

#### 1.3.4 标签使用必须符合标签嵌套规则

+ ul,li/ol,li/dl,dt,dd拥有父子级关系的标签；ul、ol下都只能跟li，dl下只能跟dt.dd
+ p,dt,h标签里面不能嵌套块元素
+ a标签不能嵌套a
+ 行内元素不能嵌套块元素

#### 1.3.5 HTML 标签的使用应该遵循标签的语义

下面是常见标签语义

p - 段落
h1,h2,h3,h4,h5,h6 - 层级标题
strong,em - 强调
ins - 插入
del - 删除
abbr - 缩写
code - 代码标识
cite - 引述来源作品的标题
q - 引用
blockquote - 一段或长篇引用
ul - 无序列表
ol - 有序列表
dl,dt,dd - 定义列表

```html
<!-- 推荐 -->
<p>Esprima serves as an important <strong>building block</strong> for some JavaScript language tools.</p>

<!-- 不推荐 -->
<div>Esprima serves as an important <span class="strong">building block</span> for some JavaScript language tools.</div>
```

便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO

#### 1.3.6 在 CSS 可以实现相同需求的情况下不得使用表格进行布局

在兼容性允许的情况下应尽量保持语义正确性。对网格对齐和拉伸性有严格要求的场景允许例外，如多列复杂表单。

#### 1.3.7 标签的使用应尽量简洁，减少不必要的标签

```html
<!-- 推荐 -->
<img class="avatar" src="image.png">

<!-- 不推荐 -->
<span class="avatar">
  <img src="image.png">
</span>
```

#### 1.3.8 使用a标签作为JS事件处理时，统一使用 href="javascript:;" 伪协议

更多[html中的a标签详解](https://juejin.im/post/5de781ea518825126204e6b5)

### 1.4 属性

#### 1.4.1 属性名必须使用小写字母

```html
<!-- 推荐 -->
<table cellspacing="0">...</table>

<!-- 不推荐 -->
<table cellSpacing="0">...</table>
```

#### 1.4.2 属性值必须用双引号包围

不允许使用单引号，不允许不使用引号

```html
<!-- 推荐 -->
<script src="esl.js"></script>

<!-- 不推荐 -->
<script src='esl.js'></script>
<script src=esl.js></script>
```

#### 1.4.3 布尔类型的属性，建议不添加属性值

```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
```

#### 1.4.4 自定义属性建议以 xxx- 为前缀，推荐使用 data-

使用前缀有助于区分自定义属性和标准定义的属性

```html
<ol data-ui-type="Select"></ol>
```

#### 1.4.5 属性顺序

属性应该按照特定的顺序出现以保证易读性；

+ class
+ id
+ name
+ data-*
+ src, for, type, href, value , max-length, max, min, pattern
+ placeholder, title, alt
+ aria-*, role
+ required, readonly, disabled

class是为高可复用组件设计的，所以应处在第一位；

id更加具体且应该尽量少使用，所以将它放在第二位

```html
<a class="..." id="..." data-modal="toggle" href="#">Example link</a>

<input class="form-control" type="text">

<img src="..." alt="...">
```

## 2. 通用

### 2.1. DOCTYPE

#### 2.1.1 使用 HTML5 的 doctype 来启用标准模式，建议使用大写的 DOCTYPE

```html
<!DOCTYPE html>
```

不声明文档类型，会进入怪异模式，浏览器按照自己的方式解析页面，不同浏览器渲染样式不同

#### 2.1.2 启用 IE Edge 模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

#### 2.1.3 在 html 标签上设置正确的 lang 属性

有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等

```html
<html lang="zh-CN">
```

### 2.2 编码

#### 2.2.1 页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素

`<meta charset="UTF-8">`

不声明编码，浏览器会根据自己默认解码格式解析文档，可能照成乱码（也有可能是编码与编码声明格式不同造成乱码）

请尽量统一写成标准的 “UTF-8”，不要写成 “utf-8” 或 “utf8” 或 “UTF8”。而 UTF8 或 utf8 的写法只是出现在某些编程系统中，如 .NET framework 的类 System.Text.Encoding 中的一个属性名就叫 UTF8

#### 2.2.2 HTML 文件使用无 BOM 的 UTF-8 编码

UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰

### 2.3 CSS和JavaScript引入

#### 2.3.1 不需要为 CSS、JS 指定类型属性，HTML5 中默认已包含

```html
<!-- 推荐 -->
<link rel="stylesheet" href="" >
<script src=""></script>

<!-- 不推荐 -->
<link rel="stylesheet" type="text/css" href="" >
<script type="text/javascript" src="" ></script>
```

#### 2.3.2 展现定义放置于外部 CSS 中，行为定义放置于外部 JavaScript 中

结构-样式-行为的代码分离，对于提高代码的可阅读性和维护性都有好处

#### 2.3.3 在 head 中引入页面需要的所有 CSS 资源

在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。而且css阻塞js执行

#### 2.3.4 JavaScript 应当放在页面末尾，或采用异步加载

将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议

#### 2.3.5 移动环境或只针对现代浏览器设计的 Web 应用，如果引用外部资源的 URL 协议部分与页面相同，建议省略协议前缀

使用 protocol-relative URL 引入 CSS，在 IE7/8 下，会发两次请求。是否使用 protocol-relative URL 应充分考虑页面针对的环境。

`<script src="//huoyuhao.net/jquery-1.10.2.min.js"></script>`

链接不声明协议名称（http/https），这样会默认使用当前页面的协议，以后升级协议减少不必要的麻烦

#### 2.3.6 书写链接地址时，必须避免重定向，在URL地址后面加上“/”

书写链接地址时，必须避免重定向，即须在URL地址后面加上“/”，例如：href="http://huoyuhao.net/"

#### 2.3.7 避免空的src和href

当link标签的href属性为空、script标签的src属性为空的时候，浏览器渲染的时候会把当前页面的URL作为它们的属性值，从而把页面的内容加载进来作为它们的值，不同浏览器表现如下：

+ IE 向页面所在的目录发送请求；
+ Safari、Chrome、Firefox 向页面本身发送请求；
+ Opera 不执行任何操作。

空 src 产生请求的后果：

+ 给服务器造成意外的流量负担，尤其时日 PV 较大时；
+ 浪费服务器计算资源；
+ 可能产生报错。

空的 href 属性也存在类似问题。用户点击空链接时，浏览器也会向服务器发送 HTTP 请求，可以通过 JavaScript 阻止空链接的默认的行为

## 3. Head

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>title</title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <!-- Edge：始终以最新的文档模式来渲染页面。忽略文档类型声明。对于IE8，始终以IE8标准模式渲染页面。IE9亦如此。 -->
  <meta name="keywords" content=""/>
  <meta name="description" content=""/>
</head>
<body>
</body>
</html>
```

### 3.1 SEO

+ 页面必须包含 title 标签声明标题
+ title 必须作为 head 的直接子元素，并紧随 charset 声明之后

### 3.2 DNS预解析

DNS 预读取是一项使浏览器主动去执行域名解析的功能，其范围包括文档的所有链接，无论是图片的，CSS 的，还是 JavaScript 等其他用户能够点击的 URL，减少用户点击链接时的延迟

```html
<!-- 打开和关闭DNS预解析 -->
<meta http-equiv="x-dns-prefetch-control" content="on">
<!-- 手动添加接卸 -->
<link rel="dns-prefetch" href="http://www.google.com">
```

更多内容了解[X-DNS-Prefetch-Control](https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching)

### 3.3 favicon

保证 favicon 可访问

在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证favicon可访问，避免404，必须遵循以下两种方法之一：

在 Web Server 根目录放置 favicon.ico 文件。
使用 link 指定 favicon

`<link rel="shortcut icon" href="/favicon.ico">`

### 3.4 viewport

若页面欲对移动设备友好，需指定页面的 viewport。

viewport meta tag可以设置可视区域的宽度和初始缩放大小，避免在移动设备上出现页面展示不正常。

比如，在页面宽度小于 980px 时，若需 iOS 设备友好，应当设置 viewport 的 width 值来适应你的页面宽度。同时因为不同移动设备分辨率不同，在设置时，应当使用 device-width 和 device-height 变量。

另外，为了使 viewport 正常工作，在页面内容样式布局设计上也要做相应调整，如避免绝对定位等。关于 viewport 的更多介绍，可以参见 [Safari Web Content Guide](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW26)的介绍

### 3.5 lang

[HTML 设置 lang 属性的意义](https://ayaka.shn.hk/langtag/)

更多关于 lang 属性的知识可以从 [此规范](http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element) 中了解。

Sitepoint 站点上 给出了一份[语言代码表](https://www.sitepoint.com/iso-2-letter-language-codes/)

## 4. 图片

### 4.1 src不为空

禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src

src 取值为空，会导致部分浏览器重新加载一次当前页面，参考：[更多](https://developer.yahoo.com/performance/rules.html#emptysrc)

### 4.2 title 属性

避免为 img 添加不必要的 title 属性

多余的 title 影响看图体验，并且增加了页面尺寸

### 4.3 alt 属性

为重要图片添加 alt 属性

可以提高图片加载失败时的用户体验。

### 4.4 width 和 height 属性

添加 width 和 height 属性，以避免页面抖动

### 4.5 img标签与CSS背景

根据语义化选择实现方式

如下场景使用img标签比较合适：

+ 使用IMG(alt文本)图像有一个重要的语义时，比如一个警告图标。这将确保图像的意义可以很好的和user-agents沟通，包括屏幕阅读器
+ 如果你依赖于浏览器缩放图像比例并且可以呈现不错的效果时使用IMG（缩放图片请先将图片脱离正常文档流）
+ 如果配合 z-index 伸展背景图像来填补它的整个窗口时使用IMG
+ 使用img代替有背景图像可以显著提高性能的动画背景

如下场景使用background-image属性比较合适：

+ 如果图像不是内容的一部分时使用 background-image
+ 当图像代替文本使用时使用 background-image（避免出现无语义化标签）
+ 如果需要缩短下载时间通过CSS sprites 时使用 background-image

css中的图片以背景图形式存在，写在html中的图片以标签形式存在。而在网页加载过程中，以css背景存在的图片会等到html结构加载完成才开始加载，而html中的img标签是网页结构（内容）的一部分会在加载结构的过程中加载。

图片作为背景，在图片没有加载或者加载失败时，不会有个图片的占位标记，不会出现红叉。

产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。

无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现

## 5. 多媒体

### 5.1 媒体格式

当在现代浏览器中使用 audio 以及 video 标签来播放音频、视频时，应当注意格式

音频应尽可能覆盖到如下格式：

MP3/WAV/Ogg

视频应尽可能覆盖到如下格式：

MP4/WebM/Ogg

### 5.2 audio 和 video

在支持 HTML5 的浏览器中优先使用 audio 和 video 标签来定义音视频元素

### 5.3 优雅降级

使用退化到插件的方式来对多浏览器进行支持

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  <object width="100" height="50" data="audio.mp3">
    <embed width="100" height="50" src="audio.swf">
  </object>
</audio>

<video width="100" height="50" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.ogg" type="video/ogg">
  <object width="100" height="50" data="video.mp4">
    <embed width="100" height="50" src="video.swf">
  </object>
</video>
```

### 5.4 自动播放

只在必要的时候开启音视频的自动播放

### 5.5 容错说明

在 object 标签内部提供指示浏览器不支持该标签的说明

`<object width="100" height="50" data="something.swf">DO NOT SUPPORT THIS TAG</object>`

## 6. 参考

[HTML编码规范](https://github.com/fex-team/styleguide/blob/master/html.md)
