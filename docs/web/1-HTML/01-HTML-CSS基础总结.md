---
meta:
- name: description
  content: HTML-CSS总结
- name: keywords
  content: CSS,CSS总结,CSS3,CSS基础知识,HTML,HTML总结,HTML基础知识
---

# HTML-CSS总结

## 1. link与@import区别

link | @import
--- | ---
属于XHTML标签，除了加载CSS外，还可以引入其他文件 | 属于CSS，只能加载CSS
在页面载入时同时加载 | 页面完全载入后再加载
无兼容问题 | 低版本浏览器不支持（ie5+）
支持使用JavaScript控制DOM去改变样式| 无

## 2. 页面上隐藏元素方法

### 占位

```js
visibility: hidden;
opacity: 0;
transform: scale(0);
position left/right/top/bottom: -9999px; // 让元素在视区外
```

### 不占位

```js
display: none;
width: 0; height: 0; overflow: hidden;
```

## 3. CSS选择器

选择器 | 描述 | 示例
--- | --- | ---
\* | * | 选择所有元素
element | span | 选择所有span元素
.class | .container | 选择 class="container" 的所有元素
\#id | #app | 选择 id="app" 的所有元素
element, element | div, p | 选择所有div元素和所有p元素
element element | div p | 选择div元素内部的所有p元素
element>element | div > p | 选择父元素为div元素的所有p元素
element+element | div + p | 选择紧接在div元素之后的p元素
element~element | div ~ p | 选择与div元素是同一个父元素且在div元素之后的所有p元素
[attribute] | [target] | 选择带有 target 属性所有元素
[attribute=value] | [target=_blank] | 选择 target="_blank" 的所有元素
[attribute~=value] | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素
[attribute\|=value] | [lang|=en] | 选择 lang 属性值以 "en" 开头的所有元素
[attribute^=value] | a[src^="https"] | 选择其 src 属性值以 "https" 开头的每个 元素
[attribute$=value] | a[src$=".pdf"] | 选择其 src 属性以 ".pdf" 结尾的所有 元素
[attribute*=value] | a[src*="abc"] | 选择其 src 属性中包含 "abc" 子串的每个 元素
:link | a:link | 选择所有未被访问的链接
:visited | a:visited | 选择所有已被访问的链接
:active | a:active | 选择活动链接
:hover | a:hover | 选择鼠标指针位于其上的链接
:focus | input:focus | 选择获得焦点的 input 元素
:first-letter | p:first-letter | 选择每个p元素的首字母
:first-line | p:first-line | 选择每个p元素的首行
:first-child | p:first-child | 选择属于父元素的第一个子元素的每个p元素
:before | p:before | 在每个p元素的内容之前插入内容
:after | p:after | 在每个p元素的内容之后插入内容
:lang(language) | p:lang(it) | 选择带有以 "it" 开头的 lang 属性值的每个p元素
:first-of-type | p:first-of-type | 表示一组兄弟元素中其类型的第一个元素
:last-of-type | p:last-of-type | 表示一组兄弟元素中其类型的最后一个元素
:only-of-type | p:only-of-type | 任意一个元素，这个元素没有其他相同类型的兄弟元素
:only-child | p:only-child | 选择属于其父元素的唯一子元素的每个p元素
:nth-child(n) | p:nth-child(2) | 选择属于其父元素的第二个子元素的每个p元素
:nth-last-child(n) | p:nth-last-child(2) | 同上，从最后一个子元素开始计数
:nth-of-type(n) | p:nth-of-type(2) | 选择属于其父元素第二个p元素的每个p元素
:nth-last-of-type(n) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数
:last-child | p:last-child | 选择属于其父元素最后一个子元素每个p元素
:root | :root | 选择文档的根元素
:empty | p:empty | 选择没有子元素的每个p元素（包括文本节点）
:target | #news:target | 选择当前活动的 #news 元素
:enabled | input:enabled | 选择每个启用的 元素
:disabled | input:disabled | 选择每个禁用的 元素
:checked | input:checked | 选择每个被选中的 元素
:not(selector) | :not(p) | 选择非p元素的每个元素
::selection | ::selection | 选择被用户选取的元素部分

[CSS 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)

## 4. HTML meta viewport属性说明

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">`

+ width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
+ height：和 width 相对应，指定高度
+ initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例
+ maximum-scale：允许用户缩放到的最大比例
+ minimum-scale：允许用户缩放到的最小比例
+ user-scalable：用户是否可以手动缩放

## 5. 超链接target属性的取值和作用

值 | 描述
--- | ---
_blank | 在新窗口中打开被链接文档
_self | 默认。在相同的框架中打开被链接文档
_parent | 在父框架集中打开被链接文档（在 frame 或者 iframe 中使用较多）
_top | 在整个窗口中打开被链接文档（在 frame 或者 iframe 中使用较多）
framename | 在指定的框架中打开被链接文档

## 6. CSS优先级

内联 > ID选择器 > 类选择器 > 标签选择器

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

+ 如果存在内联样式，那么 A = 1, 否则 A = 0;
+ B 的值等于 ID选择器 出现的次数;
+ C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
+ D 的值等于 标签选择器 和 伪元素 出现的总次数

`#nav-global > ul > li > a.nav-link` 套用上面的算法为（0, 1, 1, 3）

比较规则是: **从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的**

## 7. 伪元素和伪类的区别和作用

+ 伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```js
p::before {
  content: "test";
}
```

+ 伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```js
a:hover {
  color: #333;
}
```

**总结：**伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before、::after

## 8. 单行、多行文本溢出隐藏

+ 单行文本溢出

```js
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```

+ 多行文本溢出

```js
overflow: hidden;             // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
display: -webkit-box;         // 将对象作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式：从上到下垂直排列
-webkit-line-clamp: 3;        // 显示的行数
```

## 9. CSS布局单位

+ 像素（px）：页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS像素和物理像素：
  + CSS像素：为web开发者提供，在CSS中使用的一个抽象单位；
  + 物理像素：只与设备的硬件密度有关，任何设备的物理像素都是固定的
+ 百分比（%）：当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素
+ em： 文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(默认16px)。(相对父元素的字体大小倍数)
+ rem： rem是CSS3新增的一个相对单位，相对于根元素（html元素）的font-size的倍数。作用：利用rem可以实现简单的响应式布局，可以利用html元素中字体的大小与屏幕间的比值来设置font-size的值，以此实现当屏幕分辨率变化时让元素也随之变化
+ vw/vh是与视图窗口有关的单位，vw表示相对于视图窗口的宽度。相对于视窗的宽度，视窗宽度是100vw
+ calc(): CSS3中新增的一个函数, 用于动态计算宽/高, 语法非常简单，就像我们小时候学加 （+）、减（-）、乘（*）、除（/）一样，使用数学表达式来表示
  + 使用“+”、“-”、“*” 和 “/”四则运算；
  + 可以使用百分比、px、em、rem等单位；
  + 可以混合使用各种单位进行计算；
  + 表达式中有“+”和“-”时，其前后必须要有空格，如"width: calc(12%+5em)"这种没有空格的写法是错误的；
