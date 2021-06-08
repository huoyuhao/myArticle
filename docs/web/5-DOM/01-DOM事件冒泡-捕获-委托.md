---
meta:
  - name: description
    content: DOM事件
  - name: keywords
    content: DOM事件冒泡,事件冒泡,事件捕获,事件委托,DOM事件,
---
# DOM事件

## 1. DOM事件冒泡/捕获

### 1.1 DOM事件冒泡

当一个事件发生在一个元素上，它会首先运行在该元素上的处理程序，然后运行其父元素上的处理程序，然后一直向上到其他祖先上的处理程序

### 1.2 event.target与event.currentTarget区别

父元素上的处理程序始终可以获取事件实际发生位置的详细信息。

引发事件的那个嵌套层级最深的元素被称为目标元素，可以通过 `event.target` 访问。

注意与 `this（=event.currentTarget）`之间的区别：

+ event.target —— 是引发事件的“目标”元素，它在冒泡过程中不会发生变化。
+ this —— 是“当前”元素，其中有一个当前正在运行的处理程序。

例如，如果我们有一个处理程序 `form.onclick`，那么它可以“捕获”表单内的所有点击。无论点击发生在哪里，它都会冒泡到 `form` 并运行处理程序。

在 form.onclick 处理程序中：

+ `this（=event.currentTarget）`是 `form` 元素，因为处理程序在它上面运行。
+ `event.target` 是表单中实际被点击的元素

### 1.3 停止冒泡

冒泡事件从目标元素开始向上冒泡，但是任意处理程序都可以决定事件已经被完全处理，并停止冒泡。

用于停止冒泡的方法是 `event.stopPropagation()`

`event.stopImmediatePropagation()` 与 `event.stopPropagation()` 区别

+ stopPropagation可以阻止事件传播，但不会影响该事件的其他监听方法执行
+ stopImmediatePropagation不仅阻止事件传播，还会阻止该事件后面的监听方法执行

### 1.4 事件捕获

事件处理的另一个阶段被称为“捕获（capturing）”

DOM 事件标准描述了事件传播的 3 个阶段：

+ 捕获阶段（Capturing phase）—— 事件（从 Window）向下走近元素。
+ 目标阶段（Target phase）—— 事件到达目标元素。
+ 冒泡阶段（Bubbling phase）—— 事件从元素上开始冒泡

添加事件`element.addEventListener(event, function, useCapture)`

+ 第一个参数是需要绑定的事件
+ 第二个参数是触发事件后要执行的函数
+ 第三个参数默认值是false，表示在事件冒泡阶段调用事件处理函数；如果参数为true，则表示在事件捕获阶段调用处理函数

总结下来又如下特点：

+ 对于非target节点则先执行捕获在执行冒泡
+ 对于target节点则是先执行先注册的事件，无论冒泡还是捕获

```html
<div id="s1">s1
  <div id="s2">s2</div>
</div>
<script>
s1.addEventListener("click", function(e){
  console.log("s1 冒泡事件");         
}, false);
s2.addEventListener("click", function(e){
  console.log("s2 冒泡事件");
}, false);
        
s1.addEventListener("click", function(e){
  console.log("s1 捕获事件");
}, true);
  
s2.addEventListener("click", function(e){
  console.log("s2 捕获事件");
}, true);
// 输出结果："s1 捕获事件"、"s2 冒泡事件"、"s2 捕获事件"、"s1 冒泡事件"
// 因为到达s2元素是目标阶段，先注册的冒泡后注册的捕获，则先执行冒泡
</script>
```

## 2. DOM事件委托

捕获和冒泡允许我们实现一种被称为 事件委托 的强大的事件处理模式。通俗地来讲，就是把一个元素响应事件（`click...`）的函数委托到另一个元素

事件委托的优点：

+ 减少内存消耗 - 减少绑定事件
+ 动态绑定事件 - 新增资源素自动绑定事件

事件委托也是有一定局限性的；比如 `focus`、`blur` 之类的事件本身没有事件冒泡机制，所以无法委托； `mousemove`、`mouseout` 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的。

## 3. 参考文章

[冒泡和捕获](https://zh.javascript.info/bubbling-and-capturing)
