# CSS代码规范

## CSS规范

### 样式加载

CSS样式由四种加载方式：

#### 1. 行内样式

直接对HTML标签引入style=""设置样式；这样的方式会使得html不干净且省去了CSS渲染树的构建查找等工作，但是代码冗余不利于维护。

`<div style="border:1px red solid;">yuhoo</div>`

#### 2. 内嵌样式--内部样式表

在head标签之间用`<style></style>`标签声明。css代码会随着html文件一起下载，不会出现资源加载失败或者css资源延迟响应照成的页面只有文字。内嵌样式会随着页面下在一起下载，在DOM解析过程中同时进行CSS解析，无需经过发送请求、三次握手后获取到CSS资源文件，有利于页面快速加载，避免CSS资源加载失败，照成整体样式丢失。但是，在多个页面的项目中，会照成代码冗余，不利于维护（模板文件除外）。而且不能够被浏览器缓存（html文件一般不会设置缓存请求头信息）。

```html
<style type="text/css">
div{ margin : 0; padding: 0; border: 1px red solid; }
</style>
```

#### 3. 链入外部样式表—在head部分加入

链接样式使用最多，推荐使用的一种方法，在`<head></head>`标签之间用`<link ...../>`引入css文件。

`<link rel="stylesheet" type="text/class" href="my.css" media="all"/>`

#### 4. 导入外部样式表—在head部分加入

导入方式指的是使用 CSS 规则引入外部 CSS 文件。

```html
<style>
@import url(style.css);
</style>
```

**链接方式和导入方式**比较

+ link 属于 HTML，通过 `<link>` 标签中的 href 属性来引入外部文件，而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件；
+ @import 是 CSS2.1 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；
+ 当 HTML 文件被加载时，link 引用的文件会同时被加载，而 @import 引用的文件则会等页面全部下载完毕再被加载；

**团队约定**：

+ 在页面中尽量避免使用style属性，即style="…"。
+ 首屏关键CSS样式可以使用嵌入式样式加载
+ 非关键CSS样式使用外链形式加载

内联样式虽然省去了CSS渲染树的构建查找等工作，但是CSS外链形式可以进行缓存的。而且不符合结构与表象分离的思想。

非关键样式通过外链形式（或者[异步下载方式](https://juejin.im/post/5b6133a351882519d346853f#heading-1)）进行加载，可以通过浏览器进行缓存，减少加载时间，同时异步下载，减少源文件（html）大小

更多内容查看[内联和外链脚本的性能实验](https://harttle.land/2017/05/05/external-scripts-vs-inline.html)

### 编码格式

+ 样式文件必须写上 @charset 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”
+ 字符 @charset “”; 都用小写字母，不能出现转义符，编码名允许大小混写

```css
@charset "UTF-8";

.yuhoo{}
```

### 代码格式化

样式书写一般有两种：

```css
/* 一种是紧凑格式 (Compact) */
.yuhoo{ display: block; width: 50px; }

/* 一种是展开格式（Expanded）*/
.yuhoo{
    display: block;
    width: 50px;
}
```

**团队约定**:
统一使用展开格式书写样式

### 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

```css
/* 推荐 */
.yuhoo{
    display: block;
}

/* 不推荐 */
.yuhoo{
    DISPLAY: BLOCK;
}
```

### 代码缩进

统一使用两个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```css
.yuhoo {
    width: 100%;
    height: 100%;
}
```

### 空格&分号

1. 左括号与类名之间一个空格，冒号与属性值之间一个空格
2. 逗号分隔的取值，逗号之后一个空格
3. 为单个css选择器或新申明开启新行
4. 颜色值 rgb() rgba() hsl() hsla() rect() 中每个逗号后必需有空格，且取值不要带有不必要的 0
5. 属性值十六进制数值能用简写的尽量用简写
6. 不要为 0 指明单位

```css
/* 推荐 */
.yuhoo {
    width: 100%;
    box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
    color: rgba(255, 255, 255, .5);
    color: #fff;
    margin: 0 10px;
}

.yuhoo,
.yuhoo-logo {
    color: #ff0;
}

/* 不推荐 */
.yuhoo{ /* 1 */
    width:100%; /* 1 */
    box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc; /* 2 */
    color: rgba( 255,255,255,0.5 ); /* 4 */
    color: #ffffff; /* 5 */
    margin: 0px 10px; /* 6 */
}
.yuhoo, .yuhoo-logo { /* 3 */
    color: #ff0;
}.nav{ /* 3 */
    color: #fff;
}
```

### 属性值引号

css属性值需要用到引号时，统一使用单引号

```css
/* 推荐 */
.yuhoo {
    font-family: 'Hiragino Sans GB';
}

/* 不推荐 */
.yuhoo {
    font-family: "Hiragino Sans GB";
}
```

### 属性书写顺序

建议遵循以下顺序：

1. 布局定位属性：display / position / float / clear / visibility / overflow
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```css
.yuhoo {
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

### CSS3浏览器私有前缀写法

CSS3 浏览器私有前缀在前，标准前缀在后

```css
.yuhoo {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

### 推荐使用伪元素

伪元素是伪的，伪的意思就是说，你无法用js获取到这个伪元素，或者增、删、改一个伪元素，所以伪元素的优点就体现在这里了——你可以用伪元素制造视觉上的效果，但是不会增加JS查DOM的负担，它对JS是透明的。所以即使你给页面添加了很多伪元素，也不会影响查DOM的效率。同时，它不是一个实际的html标签，可以加快浏览器加载html文件，对SEO也是有帮助的。

使用伪元素场景推荐：

+ 没有语义化的标签可以通过伪元素实现
+ 一些符号、icon、清楚浮动等

### CSS代码规范基础

1. 尽量少用通用选择器 *
2. 不使用 ID 选择器
3. 禁止使用层级过深的选择器，最多3级
4. 除非是样式reset需要，禁止对纯元素选择器设置特定样式，避免样式污染

    ```css
    /* 推荐 1-4 */
    .yuhoo {}
    .yuhoo li {}
    .list > li > .item {}
    .pro-list p {}

    /* 不推荐 1-4 */
    *{}
    #yuhoo {}
    .container .list > li > p {}
    p {}
    ```

5. 0后面不需要单独，比如0px可以省略成0，0.8px可以省略成.8px
6. `margin、padding、border、font、background`等样式尽可能采用合并写法
7. 最外层统一使用双引号；url的内容要用引号；属性选择器中的属性值需要引号
8. 如果没有边框时，不要写成border:0;应该写成border:none
9. 如果可以颜色尽量用三位字符表示，比如#ccc，颜色值不允许使用命名色值。

    ```css
    /* 推荐 5-9 */
    .yuhoo {
        margin: 10px 0 .8px;
        border: 1px solid #CCC;
        background: url("./img/...") no-repeat;
        border: none;
        color: #AAA;
    }

    /* 不推荐 5-9 */
    .yuhoo{
        margin: 10px 0px 0.8px;
        border-width: 1px;
        border-style: solid;
        border-color: #CCC;
        background: url('./img/...') no-repeat;
        border: 0;
        color: #aaa;
    }
    ```

10. 利用html自身属性及样式继承原理减少代码量
11. 通过webpack打包压缩css文件代码
12. 书写代码前, 考虑并提高样式重复使用率
13. 在保存代码解耦的前提下，尽量合并重复的样式

### css选择器使用

CSS选择器的匹配是**从右向左**进行的，这一策略导致了不同种类的选择器之间的性能也存在差异。相比于#markdown-content-h3，显然使用#markdown .content h3时，浏览器生成渲染树（render-tree）所要花费的时间更多。因为后者需要先找到DOM中的所有h3元素，再过滤掉祖先元素不是.content的，最后过滤掉.content的祖先不是#markdown的。试想，如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高。

不过现代浏览器在这一方面做了很多优化，不同选择器的性能差别并不明显，甚至可以说差别甚微。此外不同选择器在不同浏览器中的性能表现也不完全统一，在编写CSS的时候无法兼顾每种浏览器。

**团队约定**：

+ 不要嵌套过多过于复杂的选择器
+ 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用
+ 不要使用类选择器和ID选择器修饰元素标签，如：h3#markdown，这样多此一举，还会降低效率
+ 不要为了追求速度而放弃可读性与可维护性

更多内容了解[为什么CSS选择器是从右往左解析](https://blog.csdn.net/jinboker/article/details/52126021)

### 样式表中中文字体名

样式表中中文字体名, 请转码成unicode码或者使用其英文名称，以避免编码错误时乱码

乱码产生原因是css资源文件编码格式没有声明或者不是'utf-8'，造成解析汉字错误，所以建议使用unicode码或者英文名称

```css
.yuhoo{
    font-family: "Microsoft YaHei";
    /* 不推荐
    * font-family: "微软雅黑";
    */
}
```
