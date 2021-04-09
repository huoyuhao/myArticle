---
meta:
  - name: description
    content: JavaScript深拷贝
  - name: keywords
    content: JavaScript深拷贝,Js深拷贝,JavaScript,前端,学习,浅拷贝,深拷贝
---
# JavaScript深拷贝

## 准备工作

### 数据类型判断

基本数据类型的特点：直接存储在栈(stack)中的数据

引用数据类型的特点：存储的是该对象在栈中引用，真实的数据存放在堆内存里

首先我们要确定哪些值是我们需要拷贝的内容，比如基础数据类型`number null undefined boolean string` 而引用数据类型是`Object`，具体的又包含`function object date regexp array`等（`error arguments`等暂不考虑 `symbol`作为新增数据类型单独介绍）

```js
// 数据类型判断函数
let isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}
let isNull = function (obj) { return obj === null }
let isUndefined = function (obj) { return obj === undefined }
let isBoolean = isType('Boolean')
let isString = isType('String')
let isNumber = isType('Number')
let isObject = isType('Object')
let isArray = Array.isArray || isType('Array')
let isFunction = isType('Function')
let isRegExp = isType('RegExp')
let isDate = isType('Date')
```

### 遍历属性操作

```js
var parent = Object.create(Object.prototype, {
  a: {
    value: 123,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
// parent继承自Object.prototype，有一个可枚举的属性a（enumerable:true）。

var child = Object.create(parent, {
  b: {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
  },
  c: {
    value: 3,
    writable: true,
    enumerable: false,
    configurable: true
  }
});
//child 继承自 parent ，b可枚举，c不可枚举
```

#### for in

for in 会遍历自身及**原型链上**的**可枚举**属性，如果只需要获取对象的实例属性，可以使用hasOwnProperty()进行过滤

```js
for (var key in child) {
  console.log(key);
}
// b a
```

使用for..in遍历数组它自动过滤掉了不存在的元素，对于存在的元素且值为undefined或者'null'仍然会有效输出

```js
var colors = ['red', 'green', 'blue'];
// 将数组长度变为10
colors.length = 10;
// 再添加一个元素的数组末尾
colors.push('yellow');

for (var i in colors) {
  console.log(i); // 0 1 2 10
}
```

#### Object.keys

Object.keys 会将对象自身的**可枚举**属性的key输出(相当for...in使用hasOwnProperty)

```js
console.log(Object.keys(child));
// ["b"]
```

#### Object.getOwnPropertyNames

Object.getOwnPropertyNames 会将对象自身所有的属性的key输出（包括不可枚举属性但不包括Symbol值作为名称的属性）

```js
console.log(Object.getOwnPropertyNames(child));
// ["b","c"]
```

#### 遍历方法汇总

方法 | 作用 |
--- | ---
for in | 对象自身及**原型链上**的**可枚举**属性
Object.keys | 对象自身的**可枚举**属性
Object.getOwnPropertyNames | 对象自身所有的属性（包括不可枚举的属性）
Object.hasOwnProperty | 判断某个对象是否含有指定的属性（不包含原型链上的继承属性）
Object.propertyIsEnumerable | 判断指定的属性名是否可枚举

## 浅拷贝介绍

浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

```js
var a1 = {b: {c: {}}

var a2 = shallowClone(a1) // 浅拷贝
a2.b.c === a1.b.c // true

var a3 = deepClone(a1) // 深拷贝
a3.b.c === a1.b.c // false
```

浅拷贝是按位拷贝对象，它会创建一个新对象，这个**对象有着原始对象属性值的一份精确拷贝**。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)，即只复制对象空间而不复制资源。

## 常用拷贝方法

### Object.assign

`Object.assign`方法用于对象的合并，将源对象（source）的所有**可枚举属性**，复制到目标对象。但是 Object.assign()进行的是**浅拷贝**，拷贝的是对象的属性的引用，而不是对象本身。

* Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
* 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性

```js
if (typeof Object.assign != 'function') {
  // 定义assign方法
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // 第一个参数为空，则抛错
        throw new TypeError('Cannot convert undefined or null to object');
      }
      let to = Object(target);
      // 遍历剩余所有参数
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        // 参数为空，则跳过，继续下一个
        if (nextSource != null) {
          for (let nextKey in nextSource) {
            // 如果不为空且可枚举，则直接浅拷贝赋值
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true, // 是否可以改变
    configurable: true // 属性是否配置，以及可否删除
  });
}
```

### Array.prototype.concat/slice

Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组

**原数组的元素会按照下述规则拷贝：**

* 对象引用（而不是实际对象）：`concat`将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
* 数据类型如字符串，数字和布尔（不是`String`，`Number`、`Boolean`对象）：`concat`将字符串和数字的值复制到新数组中。

```js
let a = [1, 2, {
  name: 'yuhoo'
}];
let b = a.concat();
b[2].name = 'tom';
console.log(a[2].name); // tom
```

## 深拷贝

### 深拷贝各种类型

### 总结
