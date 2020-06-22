# HTML代码规范

## HTML规范






















### HTML的命名

#### 1. HTML文件命名

+ 引文件统一使用index.htm index.html index.asp文件名（小写）
+ 各子页命名的原则首先应该以栏目名的英语翻译取单一单词为名称。例如：
+ 如果栏目名称多而复杂并不好以英文单词命名，则统一使用该栏目名称拼音或拼音的首字母表示；

```code
关于我们 \ about
信息反馈 \ feedback
产 品 \ product
```

#### 2. 标签自定义属性命名

标签的自定义属性以data-开头，后面跟小写单词，多单词使用下划线连接如：`<a data-goods_num='18' href="javascript:;" ></a>`

### 图片的命名

图片的名称分为头尾两部分，用下划线隔开，头部分表示此图片的大类性质
例如：广告、标志、菜单、按钮等等。

+ 放置在页面顶部的广告、装饰图案等长方形的图片取名： banner
+ 标志性的图片取名为： logo
+ 在页面上位置不固定并且带有链接的小图片我们取名为 button
+ 在页面上某一个位置连续出现，性质相同的链接栏目的图片我们取名： menu
+ 装饰用的照片我们取名： pic
+ 不带链接表示标题的图片我们取名： title

范例：`banner_news.gif banner_intro.gif menu_about.gif menu_job.gif title_news.gif logo_police.gif logo_national.gif pic_people.jpg`

### javascript的命名

#### 1. 变量命名

+ JS变量要求是纯英文小写字母，下划线分割，如：my_name
+ 常量采用全大写方式， 以下划线分隔；eg：MAX_COUNT
+ 要求变量集中声明，避免全局变量

#### 2. 类命名

首字母大写，驼峰式命名，如：MyStudent

#### 3. 函数命名

+ 函数名采用驼峰命名，以动词开始。getName()
+ 返回类型是布尔类型，一般以is开头，eg: isEnable()
+ 变量和函数命名，不要担心长度，一定要语义化合乎逻辑。eg: saveImageToPhotosAlbum()

#### 4. 命名语义化，尽可能利用英文单词或其缩写

### CSS命名

#### 1. class与id命名

+ id命名使用小驼峰命名，如：`userID`
+ class命名使用由 小写英文和 - 来组合命名, 如：`banner-container`
+ 避免使用中文拼音, 尽量使用简易的单词组合， 命名要语义化, 简明化.

#### 2. 规避class与id命名

a, 通过从属写法规避, 示例见d;

b, 取父级元素id/class命名部分命名, 示例见d;

c, 重复使用率高的命名, 请以自己代号加中划线起始, 如：yuhoo-banner-container;

d, a,b两条, 适用于在2中已建好框架的页面, 如：要在2中已建好框架的页面代码`<div id="myCard"></div>`中加入新的div元素

按a命名法则: `<div id="myCard"><div class="first-card">...</div></div>`

按b命名法则: `<div id="myCard"><div class="my-first-card">...</div></div>`

## 文件存放位置命名

+ 图片文件：images
+ 存放javascript 脚本：script
+ 存放css 文件：css

## HTML规范

### 1. 文档类型、语言、编码、关键字等声明

必须设置文档类型、语言 language 和编码 charset格式

+ 不声明文档类型，会进入怪异模式，浏览器按照自己的方式解析页面，不同浏览器渲染样式不同
+ [HTML 设置 lang 属性的意义](https://ayaka.shn.hk/langtag/)
+ 不声明编码，浏览器会根据自己默认解码格式解析文档，可能照成乱码（也有可能是编码与编码声明格式不同造成乱码）
+ 网站作者、描述、关键字等信息有利于seo
+ 请尽量统一写成标准的 “UTF-8”，不要写成 “utf-8” 或 “utf8” 或 “UTF8”。而 UTF8 或 utf8 的写法只是出现在某些编程系统中，如 .NET framework 的类 System.Text.Encoding 中的一个属性名就叫 UTF8

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

### 2. CSS放首部、Js放尾部

非特殊情况下CSS文件放在body部分 meta 标签后。非特殊情况下大部分JS文件放在 body 标签尾部（如果需要界面未加载前执行的代码可以放在head标签后）避免行内JS和CSS代码。

因为css阻塞js执行，js阻塞dom解析

### 3. HTML编码规则

所有编码需要遵循html（XML）标准

+ 且所有标签必须闭合，包括br()，hr()等
+ 属性值用双引号
+ 书写时利用IDE实现层次分明的缩进（默认缩进4空格）
+ 所有具有开始标签和结束标签的元素都要写上起止标签，某些允许省略开始标签或和束标签的元素亦都要写上。
+ 空元素标签都不加 “/” 字符

```html
<div>
    <h1>我是h1标题</h1>
    <p>我是一段文字，我有始有终，浏览器能正确解析</p>
</div>
<br>
```

### 4. 引入库文件/插件

引入JS库文件，文件名须包含库名称及版本号及是否为压缩版。比如 `jquery-1.4.1.min.js`

引入插件，文件名格式为库名称+插件名称。比如 `jQuery.bootstrap.js`

### 5. 书写页面过程中，请考虑向后扩展性

class&id参见css书写规范

### 6. a标签

+ 使用a标签作为JS事件处理时，统一使用 href="javascript:;" 伪协议

更多[html中的a标签详解](https://juejin.im/post/5de781ea518825126204e6b5)

### 7. 语义化html

如标题根据重要性用h*(同一页面只能有一个h1)，段落标记用p，列表用ul，内联元素中不可嵌套块级元素，还有`header/footer/section/nav/article`等标签。

便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO。

### 8. 标签的使用尽量简洁，减少不必要的标签

尽可能少地渲染元素，因为这将有助于您使用css设置样式

```html
<!-- Not well -->
<p class="title">我是标题</p>
<span class="avatar">
    <img src="...">
</span>

<!-- Better -->
<h3>我是标题</h3>
<img class="avatar" src="...">
```

### 9. 链接地址

+ 书写链接地址时，必须避免重定向，例如：href="http://myVue.com/"，即须在URL地址后面加上“/”
+ 链接最好不声明协议名称（http/https），这样会默认使用当前页面的协议，以后升级协议减少不必要的麻烦

### 10. 
### 11. img标签与CSS背景

+ 根据语义化选择实现方式
+ 如下场景使用img标签比较合适：
  + 1、使用IMG(alt文本)图像有一个重要的语义时，比如一个警告图标。这将确保图像的意义可以很好的和user-agents沟通，包括屏幕阅读器
  + 2、如果你依赖于浏览器缩放图像比例并且可以呈现不错的效果时使用IMG（缩放图片请先将图片脱离正常文档流）
  + 3、如果配合 z-index 伸展背景图像来填补它的整个窗口时使用IMG
  + 4、使用img代替有背景图像可以显著提高性能的动画背景
+ 如下场景使用background-image属性比较合适：
  + 1、如果图像不是内容的一部分时使用 background-image
  + 2、当图像代替文本使用时使用 background-image（避免出现无语义化标签）
  + 3、如果需要缩短下载时间通过CSS sprites 时使用 background-image

1、css中的图片以背景图形式存在，写在html中的图片以标签形式存在。而在网页加载过程中，以css背景存在的图片会等到html结构加载完成才开始加载，而html中的img标签是网页结构（内容）的一部分会在加载结构的过程中加载。

2、图片作为背景，在图片没有加载或者加载失败时，不会有个图片的占位标记，不会出现红叉。

### 12. 避免空的src和href

当link标签的href属性为空、script标签的src属性为空的时候，浏览器渲染的时候会把当前页面的URL作为它们的属性值，从而把页面的内容加载进来作为它们的值，不同浏览器表现如下：

+ IE 向页面所在的目录发送请求；
+ Safari、Chrome、Firefox 向页面本身发送请求；
+ Opera 不执行任何操作。

空 src 产生请求的后果：

+ 给服务器造成意外的流量负担，尤其时日 PV 较大时；
+ 浪费服务器计算资源；
+ 可能产生报错。

空的 href 属性也存在类似问题。用户点击空链接时，浏览器也会向服务器发送 HTTP 请求，可以通过 JavaScript 阻止空链接的默认的行为
