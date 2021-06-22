---
meta:
  - name: description
    content: DOM操作方法
  - name: keywords
    content: 原生JS DOM操作方法汇总,DOM操作方法,原生JS,DOM操作,
---

# DOM操作方法汇总

## 1. 创建节点

### 1.1 document.createElement()

创建一个由tagName决定的HTML元素

### 1.2 document.createTextNode()

创建一个文本节点，文本内容为data

### 1.3 document.createDocumentFragment()

创建一个空白的文档片段。文档片段是 DocumentFragment 对象的引用。是DOM节点，但并不是主DOM树的一部分。一般利用文档片段创建一个临时节点，将需要添加到DOM树中的节点先添加到文档片段中，再将文档片段添加到DOM树中，这个时候文档片段中的子元素会替换文档片段。

由于文档片段是存在于内存中的，所以将子元素添加到文档片段中不会引起 reflow(回流) 。能够起到性能优化的效果。

## 2. 通过节点关系获取节点

### 2.1 Node.parentNode

返回指定节点在DOM树中的父节点。

### 2.2 Node.parentElement

返回指定节点在DOM树中的父元素节点，如果没有父元素或者父元素不是一个元素节点，则返回null。

### 2.3 Node.childNodes

返回指定节点的所有子元素的集合。包括文本节点等。

### 2.4 Node.children

返回指定节点的所有子元素的集合。只包含元素节点。

### 2.5 Node.nextSibling

返回指定节点的下一个兄弟节点。包括文本节点等。

### 2.6 Node.nextElementSibling

返回指定节点的下一个兄弟元素节点。

### 2.7 Node.previousSibling

返回指定节点的上一个兄弟节点。包括文本节点等。

### 2.8 Node.previousElementSibling

返回指定节点的上一个兄弟元素节点。

### 2.9 Node.firstChild

返回指定节点的第一个子节点。包括文本节点等。

### 2.10 Node.firstElementChild

返回指定节点的第一个子元素节点。

### 2.11 Node.lastChild

返回指定节点的最后一个子节点。包括文本节点等。

### 2.12 Node.lastElementChild

返回指定节点的最后一个子元素节点。

## 3. 节点操作

### 3.1 Node.appendChild()

将一个节点添加到指定节点的子节点列表的末尾。

### 3.2 Node.removeChild()

将一个节点从DOM树中移除。移除后还存在于内存中，还可以继续添加到DOM树中。

```js
let oldChild = node.removeChild(child);
// node child的父节点
// child 要移除的子节点
// oldChild 保存对移除子节点child的引用。可以继续将其添加到DOM树中
```

### 3.3 Node.insertBefore()

在当前节点的某个子节点之前再插入一个子节点。

```js
let insertedElement = parentElement.insertBefore(newElement, referenceElement);
// 如果referenceElement为空，则插入到parentElement的子节点末尾。
// insertedElement 插入的子节点，即newElement
// parentElement 新插入节点的父节点
// newElement 新插入的节点
// referenceElement 在该节点之前插入newElement。可以通过将referenceElement改为referenceElement.nextElementSibling方式让newElement插入到referenceElement之后。实现类似insertAfter方法。
```

### 3.4 Node.replaceChild()

用指定节点替换当前节点的一个子节点，返回被替换掉的节点。

```js
let replacedChild = parentNode.replaceChild(newChild, oldChild);
// newChild 会替换掉 oldChild。如果newChild已经存在于DOM树中，则会从DOM树中删除
// oldChild 被替换掉的节点。
// replacedChild 等于 oldChild
```

## 4. 节点选择

### 4.1 document.querySelector()

入参selectors 是一个字符串，包含一个或多个css选择器。返回获取到的元素。

### 4.2 document.querySelectorAll()

和querySelector用法类似，只是返回值为NodeList对象。

### 4.3 document.getElementById()

根据元素ID获取元素。

### 4.4 document.getElementsByTagName()

根据元素标签名获取元素，返回值为HTMLCollection集合。

### 4.5 document.getElementsByName()

根据元素name属性获取元素，返回值为NodeList对象。

### 4.6 document.getElementsByClassName()

根据元素类名获取元素，返回值为HTMLCollection集合。

## 5. 属性操作

### 5.1 element.setAttribute()

参数：name /*属性名*/, value /*属性值*/

给元素设置属性。如果该属性已存在，则更新。

### 5.2 element.removeAttribute()

参数：attrName /*要删除的属性名*/

删除元素的某个属性。

### 5.3 element.getAttribute(attrName)

获取元素上属性名为attrName属性的值。如果该属性名不存在则放回null或者 ''空字符串。

### 5.4 element.hasAttribute(attrName)

检测该元素上是否有该属性。返回值为true or false。

## 6. DOM事件

### 6.1 element.addEventListener()

参数：type, listener, [, options]

给元素添加指定事件type以及响应该事件的回调函数listener。

### 6.2 element.removeEventListener()

参数：type, listener, [, options]

移除元素上指定事件，如果元素上分别在捕获和冒泡阶段都注册了事件，需要分别移除。

### 6.3 document.createEvent()

创建一个自定义事件，随后必须使用init进行初始化。

### 6.4 element.dispatchEvent(event)

对指定元素触发一个事件。

```js
elem.dispatchEvent(new Event('click'));
// 在elem上模拟一次单击事件
```

## 7.元素样式尺寸

### 7.1 window.getComputedStyle(elem)

获取elem所有应用了css后的属性值。返回一个实时的 CSSStyleDeclaration 对象。

### 7.2 elem.getBoundingClientRect()

返回元素的大小以及相对于视口的位置。返回一个DOMRect对象。包括元素的 left right top bottom width height x y 属性值。

## 8. 参考文章

[原生JS DOM操作方法汇总](https://juejin.cn/post/6844903546136035342)

[总结js常用的dom操作](https://www.haorooms.com/post/js_dom_api)
