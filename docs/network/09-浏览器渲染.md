---
meta:
  - name: description
    content: 前端浏览器渲染原理
  - name: keywords
    content: 前端浏览器渲染原理,浏览器渲染,渲染过程,回流,重绘,async,defer
---
# 前端浏览器渲染原理

## 前端浏览器渲染过程

浏览器对内容的渲染，这一内容（渲染树构建、布局及绘制）主要包含下面几个部分：

+ 解析HTML，生成DOM树（DOM）

+ 解析CSS，生成CSSOM树（CSSOM）

+ 将DOM和CSSOM合并，生成渲染树（Render-Tree）

+ 计算渲染树的布局（Layout）

+ 将布局渲染到屏幕上（Paint）

## 构建DOM树

当浏览器接收到服务器响应来的HTML文档后，会遍历文档节点，生成DOM树，具体过程如下图：

![浏览器DOM构建过程](/img/浏览器DOM构建过程.png)

+ **转换：** 浏览器从磁盘或网络读取HTML的原始字节，并根据文件的指定编码（例如 UTF-8）将它们转换成字符串。在网络中传输的内容其实都是 0 和 1 这些字节数据。当浏览器接收到这些字节数据以后，它会将这些字节数据转换为字符串，也就是我们写的代码。

+ **令牌化：** 将字符串转换成Token，例如：`<html>、<body>`等。Token中会标识出当前Token是“开始标签”或是“结束标签”亦或是“文本”等信息

+ **词法分析：** 发出的令牌转换成定义其属性和规则的“对象”

+ **DOM构建：** 由于 HTML 标记定义不同标记之间的关系（一些标记包含在其他标记内），创建的对象链接在一个树数据结构内，此结构也会捕获原始标记中定义的父项-子项关系：HTML 对象是 body 对象的父项，body 是 paragraph 对象的父项，依此类推。

## 构建CSSOM规则树

与处理 HTML 时一样，我们需要将收到的 CSS 规则转换成某种浏览器能够理解和处理的东西。因此，我们会重复 HTML 过程，不过是为 CSS 而不是 HTML：

![浏览器CSSOM构建过程](/img/浏览器CSSOM构建过程-1.png)

CSS 字节转换成字符，接着转换成令牌和节点，最后链接到一个称为“CSS 对象模型”(CSSOM) 的树结构内

![浏览器CSSOM构建过程g](/img/浏览器CSSOM构建过程-2.png)

:::tip
浏览器解析css过程是阻塞的，浏览器需要解析完所有的css才会使用css样式(和浏览器的回流重绘一样)

CSS它只显示了我们决定在样式表中替换的样式。每个浏览器都提供一组默认样式（也称为User Agent 样式），即我们不提供任何自定义样式时所看到的样式，我们的样式只是替换这些默认样式（[例如默认 IE 样式](http://www.iecss.com/)）
:::

### CSS 的继承和层叠

**层叠性**
该层叠将获取给定元素上给定属性的声明值的无序列表，按声明的优先级对它们进行排序，并输出单个层叠值。

当多个相互冲突的CSS声明应用于同一个元素时，CSS层叠算法会根据一定的机制，从最高权重到最低权重的顺序列出著作权归作者所有，具体如下：

来源和重要性 -> 选择器权重 -> 出现的顺序 -> 初始和继承属性（默认值）

**继承性**
当元素的一个继承属性没有指定值时，则取父元素的同属性的计算值。只有文档根元素取该属性的概述中给定的初始值

color、 text-开头的、line-开头的、font-开头的样式可以被继承

## 构建渲染树

浏览器将 DOM 和 CSSOM 合并成一个“渲染树”，网罗网页上所有可见的 DOM 内容，以及每个节点的所有 CSSOM 样式信息

![浏览器渲染树构建过程](/img/浏览器渲染树构建过程.png)

为构建渲染树，浏览器大体上完成了下列工作：

1. 从 DOM 树的根节点开始遍历每个可见节点

    + 某些节点不可见（例如脚本标记、元标记等），因为它们不会体现在渲染输出中，所以会被忽略。
    + 某些节点通过 CSS 隐藏，因此在渲染树中也会被忽略，例如，上例中的 span 节点不会出现在渲染树中，因为有一个显式规则在该节点上设置了“display: none”属性

2. 对于每个可见节点，为其找到适配的 CSSOM 规则并应用它们

3. 发射可见节点，连同其内容和计算的样式

::: warning
请注意 visibility: hidden 与 display: none 是不一样的。前者隐藏元素，但元素仍占据着布局空间（即将其渲染成一个空框），而后者 (display: none) 将元素从渲染树中完全移除，元素既不可见，也不是布局的组成部分
:::

## 渲染树布局

布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小

### 分层

因为页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树

1. 拥有层叠上下文属性的元素会被提升为单独的一层

    ![层叠上下文示意图](/img/层叠上下文示意图.png)

    从图中可以看出，明确定位属性的元素、定义透明属性的元素、使用 CSS 滤镜的元素等，都拥有层叠上下文属性

2. 需要剪裁（clip）的地方也会被创建为图层
需要剪裁也就是说容器内容不足以显示页面内容，出现了滚动条，渲染引擎会为这部分单独创建一个层

## 渲染树绘制

在绘制阶段，遍历渲染树，调用渲染器的paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的UI后端组件完成的。

在完成图层树的构建之后，渲染引擎会对图层树中的每个图层进行绘制

### 栅格化(raster)

要明白栅格化，先要理解什么是图块和位图。

**图块(tile)**
图块是渲染进程即浏览器内核当中的合成线程将图层划分为大小512x512或者256x256的区块

![浏览器渲染栅格化](/img/浏览器渲染栅格化-1.png)

![浏览器渲染栅格化](/img/浏览器渲染栅格化-2.png)

**位图**
位图是栅格化的过程：合成线程会按照视口附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的，将图块转换为位图。

### 合成和显示

一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“DrawQuad”，然后将该命令提交给浏览器进程

浏览器进程里面有一个叫 viz 的组件，用来接收合成线程发过来的 DrawQuad 命令，然后根据 DrawQuad 命令，将其页面内容绘制到内存中，最后再将内存显示在屏幕上

## 渲染流水线总结

从HTML到DOM、样式计算、布局、图层、绘制、光栅化、合成和显示。下面一张图是总结下这整个渲染流程

![浏览器渲染进程总结](/img/浏览器渲染进程总结.png)

1. 渲染进程将HTML内容转换为能够读懂的`DOM树`结构。
2. 渲染引擎将CSS样式表转化为浏览器可以理解的`styleSheets`，计算出DOM节点的样式。
3. 创建`布局树`，并计算元素的布局信息。
4. 对布局树进行分层，并生成`分层树`。
5. 为每个图层生成`绘制列表`，并将其提交到合成线程。
6. 合成线程将图层分成`图块`，并在光栅化线程池中将图块转换成位图。
7. 合成线程发送绘制图块命令`DrawQuad`给浏览器进程。
8. 浏览器进程根据DrawQuad消息生成页面，并`显示`到显示器上。

## 回流与重绘

### 重排Reflow

意味着元件的几何尺寸变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout

![重排](/img/浏览器重排.png)

从上图可以看出，如果你通过 JavaScript 或者 CSS 修改元素的几何位置属性，例如改变元素的宽度、高度等，那么浏览器会触发重新布局，解析之后的一系列子阶段，这个过程就叫重排。无疑，**重排需要更新完整的渲染流水线，所以开销也是最大的。**

### 常见引起回流/重排属性的方法

+ 添加或者删除可见的DOM元素

+ 元素尺寸改变——边距、填充、边框、宽度和高度

+ 内容变化，比如用户在input框中输入文字

+ 浏览器窗口尺寸改变——resize事件发生时

+ 计算 offsetWidth 和 offsetHeight 属性

+ 设置 style 属性的值

具体内容如下

+ width/height
+ margin/padding/border
+ display/position/overflow
+ clientWidth/clientHeight
+ clientTop/clientLeft
+ offsetWidth/offsetHeight
+ offsetTop/offsetLeft
+ scrollWidth/scrollHeight
+ scrollTop/scrollLeft
+ scrollIntoView()
+ scrollTo()
+ getComputedStyle()
+ getBoundingClientRect()
+ scrollIntoViewIfNeeded()

### 重绘Repaint

当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，叫做重绘

![重绘](/img/浏览器重绘.png)
从图中可以看出，如果修改了元素的背景颜色，那么布局阶段将不会被执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段，这个过程就叫重绘。**相较于重排操作，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。**

#### 常见引起重绘属性的方法

+ visibility
+ color
+ border-style/border-radius
+ background/background-image/background-position/background-repeat/background-size
+ text-decoration
+ outline-color/outline/outline-style/outline-width
+ box-shadow

### 浏览器的渲染队列

当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作

**强制刷新队列**
因为队列中，可能会有影响到这些值的操作，为了给我们最精确的值，浏览器会立即重排+重绘

强制刷新队列的style样式请求：
`offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight、`
`scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
`clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
`getComputedStyle()`， 或者 IE的 `currentStyle`

我们在开发中，应该谨慎的使用这些style请求，注意上下文关系，避免一行代码一个重排，这对性能是个巨大的消耗

### 减少重绘重排优化

#### 1. 分离读写操作

```js
// bad 4次重排+重绘
div.style.left = '10px'
console.log(div.offsetLeft)
div.style.top = '10px'
console.log(div.offsetTop)
// good 一次重排
div.style.left = '10px'
div.style.top = '10px'
console.log(div.offsetLeft)
console.log(div.offsetTop)
```

#### 2. 样式集中改变

```js
// bad
var left = 10
var top = 10
el.style.left = left + "px"
el.style.top  = top  + "px"
// good
el.className += "className"
// good
el.style.cssText += "; left: " + left + "px; top: " + top + "px;"
```

#### 3. 离线改变dom

+ 隐藏要操作的dom

在要操作dom之前，通过display隐藏dom，当操作完成之后，才将元素的display属性为可见，因为不可见的元素不会触发重排和重绘

+ 将原始元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素

```js
const ul = document.getElementById('list')
const clone = ul.cloneNode(true)
appendDataToElement(clone, data)
ul.parentNode.replaceChild(clone, ul)
```

#### 4. 避免触发同步布局事件

当我们访问元素的一些属性的时候，会导致浏览器强制清空队列，强制刷新队列，所以避免使用这些属性

#### 5. 对于复杂动画效果，使用绝对定位让其脱离文档流

对于复杂动画效果，由于会经常的引起回流重绘，因此，我们可以使用绝对定位，让它脱离文档流。否则会引起父元素以及后续元素频繁的回流

##  load 与 DOMContentLoaded





### 参考文献

[渲染树构建、布局及绘制](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)

[十分钟读懂浏览器渲染流程](https://juejin.im/post/5a8e242c5188257a6b060000)

[图解Chrome：HTML/CSS/JS是如何在浏览器中，渲染成你看到的页面？](https://zhuanlan.51cto.com/art/201810/585450.htm)

[再谈 load 与 DOMContentLoaded](https://juejin.cn/post/6844903623583891469)
