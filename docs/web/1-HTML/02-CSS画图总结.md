---
meta:
- name: description
  content: CSS画图总结
- name: keywords
  content: CSS,CSS画图,CSS3,画图
---

# CSS画图总结

## 1. 三角形

+ 宽高设为0
+ 四个边框设置border-width，border-style，border-color即可
+ 如果某个三角要变为透明，设置border-color为transparent

其他：

+ 直角三角形可以用两个边拼起来
+ 矩形可以是width不为0

[code - 三角形](https://codepen.io/lanxingyuhoo/pen/WNobKeO)

## 2. 扇形

+ 画一个圆
+ 画另外两个半圆，绝对定位（使用border-radius）
+ 通过transform: rotate(90reg);旋转相应角度（transform-origin旋转基点）

[code - 扇形](https://codepen.io/lanxingyuhoo/pen/YzpKYrR)

## 3. 平行四边形

+ 画一个长方形
+ 使用transform的skew 2D 倾斜转换

[code - 平行四边形](https://codepen.io/lanxingyuhoo/pen/MWboZPd)

## 4. 参考

[用CSS画出一个任意角度的扇形，可以写多种实现的方法](https://github.com/haizlin/fe-interview/issues/527)
