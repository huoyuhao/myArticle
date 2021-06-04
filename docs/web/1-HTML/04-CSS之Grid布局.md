---
meta:
- name: description
  content: Grid布局
- name: keywords
  content: CSS,CSS布局,Grid,grid,grid布局
---

# Grid布局

## 1. Grid布局概述

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

![Grid兼容性](/img/Grid兼容性.png)

## 2. 容器属性

### 2.1 display

+ display: grid 指定一个容器采用网格布局
+ display: inline-grid 容器元素为行内元素
+ 设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效

### 2.2 grid-template-columns/grid-template-rows

+ 容器指定了网格布局以后，接着就要划分行和列。
+ grid-template-columns属性定义每一列的列宽
+ grid-template-rows属性定义每一行的行高

#### 2.2.1 repeat

接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值

```css
.container {
  display: grid;
  /* 一共六列、三行 */
  grid-template-columns: repeat(2, 100px 20px 80px);
  grid-template-rows: repeat(3, 33.33%);
}
```

#### 2.2.2 auto-fill

单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充

`grid-template-columns: repeat(auto-fill, 100px);` 每列宽度100px，然后自动填充，直到容器不能放置更多的列

#### 2.2.3 fr

单位代表网格容器中可用空间的一等份。

`grid-template-columns: 200px 1fr 2fr` 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3

#### 2.2.4 minmax

有时候想给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。

它接受两个参数，分别为最小值和最大值。

`grid-template-columns: 1fr 1fr minmax(300px, 2fr)` 意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍

#### 2.2.5 auto

由浏览器决定长度。通过 auto 关键字，我们可以轻易实现三列或者两列布局。

`grid-template-columns: 100px auto 100px` 表示第一第三列为 100px，中间由浏览器决定长度

### 2.3 row-gap/column-gap/gap

+ row-gap 属性设置行与行的间隔（行间距）
+ column-gap 属性设置列与列的间隔（列间距）
+ gap 属性是 column-gap 和 row-gap的合并简写形式
+ 如果 gap 省略了第二个值，浏览器认为第二个值等于第一个值

### 2.4 grid-template-areas

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域

```css
.container {
  display: grid;
  /* 顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar */
  grid-template-areas: "header header header"
                       "main main sidebar"
                       "footer footer footer";
}
```

### 2.5 grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。

+ 默认值是row，即"先行后列"
+ column，"先列后行"
+ row dense和column dense，表示尽可能紧密填满，尽量不出现空格

### 2.6 justify-items/align-items/place-items

+ justify-items属性设置单元格内容的水平位置（左中右）
+ align-items属性设置单元格内容的垂直位置（上中下）
+ place-items属性是align-items属性和justify-items属性的合并简写形式

取值相同如下：

+ start：对齐单元格的起始边缘。
+ end：对齐单元格的结束边缘。
+ center：单元格内部居中。
+ stretch：拉伸，占满单元格的整个宽度（默认值

### 2.7 justify-content/align-content/place-content

+ justify-content属性是整个内容区域在容器里面的水平位置（左中右）
+ align-content属性是整个内容区域的垂直位置（上中下）
+ place-content属性是align-content属性和justify-content属性的合并简写形式

取值如下：

+ start - 对齐容器的起始边框
+ end - 对齐容器的结束边框
+ center - 容器内部居中
+ stretch - 项目大小没有指定时，拉伸占据整个网格容器
+ space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
+ space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
+ space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔

### 2.8 grid-auto-columns/grid-auto-rows

+ grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。
+ 它们的写法与grid-template-columns和grid-template-rows完全相同。
+ 如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

## 3. 项目属性

### 3.1 grid-column-start/grid-column-end/grid-row-start/grid-row-end

+ grid-column-start 属性：左边框所在的垂直网格线
+ grid-column-end 属性：右边框所在的垂直网格线
+ grid-row-start 属性：上边框所在的水平网格线
+ grid-row-end 属性：下边框所在的水平网格线
+ 这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格
+ grid-column属性是grid-column-start和grid-column-end的合并简写形式
+ grid-row属性是grid-row-start属性和grid-row-end的合并简写形式

```css
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
  grid-row-start: 2;
  grid-row-end: 4;
  /* grid-row-end: span 2; */
}
```

### 3.2 grid-area

+ grid-area属性指定项目放在哪一个区域
+ grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置
+ 例如：`grid-area: 1 / 1 / 3 / 3;`

### 3.3 justify-self/align-self/place-self

+ justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
+ align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目
+ place-self属性是align-self属性和justify-self属性的合并简写形式

## 4. 参考文档

[CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

[最强大的 CSS 布局 —— Grid 布局](https://juejin.cn/post/6854573220306255880#heading-17)
