---
meta:
  - name: description
    content: JavaScript中apply,call,bind方法
  - name: keywords
    content: JavaScript中apply/call/bind方法,apply,call,bind,JavaScript,前端,学习,模拟实现
---
# JavaScript中call等方法

## 1. call

### 1.1 call原型

Function.prototype.call()

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

function.call(thisArg, arg1, arg2, ...)

参数

+ thisArg：可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装
+ arg1, arg2, ...：指定的参数列表

返回值：使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

```js
function Product (name, price) {
  this.name = name;
  this.price = price;
}

function Food (name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
```

### 1.2 模拟实现call

#### 1.2.1 实现主要功能

+ call 改变了 this 的指向，指向到 第一个参数
+ 函数执行了

```js
// 第一版
Function.prototype.newCall = function (context) {
  context.fn = this;
  context.fn();
  delete context.fn;
}
```

#### 1.2.2 增加执行时的参数

```js
// 第二版
Function.prototype.newCall = function (context, ...args) {
  context.fn = this;
  context.fn(...args);
  delete context.fn;
}
```

#### 1.2.3 this 参数可以传 null，当为 null 的时候，视为指向 window

```js
// 第三版
Function.prototype.newCall = function (context = window, ...args) {
  context = context || window;
  context.fn = this;
  context.fn(...args);
  delete context.fn;
}
```

#### 1.2.4 数是可以有返回值的

```js
// 第四版
Function.prototype.newCall = function (context = window, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}
```

#### 1.2.5 key属性原本已存在（我们用的是fn属性）

+ 使用symbol
+ 使用随机生成，然后原属性值取出，使用并删除后，再复制回来

```js
// 第五版
Function.prototype.newCall = function (context = window, ...args) {
  context = context || window;
  const fn = Symbol('fn');
  // 先存储一份，删除后，再恢复该值
  // const originalVal = context[fn];
  // const hasOriginalVal = context.hasOwnProperty(fn);
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  // if (hasOriginalVal) {
  //   context[fn] = originalVal;
  // }
  return result;
}
```

#### 1.2.6 容错处理

```js
// 第六版
Function.prototype.newCall = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
```

## 2. apply

### 2.1 apply原型

Function.prototype.apply()

apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

### 2.2 模拟实现apply

```js
// 第六版
Function.prototype.newApply = function (context = window, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  // 如果 args传入值为 null 或 undefined
  args = args || [];
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
```

## 3. bind

### 3.1 bind原型

Function.prototype.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

function.bind(thisArg[, arg1[, arg2[, ...]]])

thisArg：调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg

arg1, arg2, ...：当目标函数被调用时，被预置入绑定函数的参数列表中的参数

返回值：返回一个原函数的拷贝，并拥有指定的 this 值和初始参数

```js
var value = 2;

var foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18'); // undefined daisy 18
console.log(obj.habit); // shopping
console.log(obj.friend); // kevin
```

### 3.2 模拟实现bind

```js
Function.prototype.newBind = function (context = window, ...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error');
  }
  const _this = this;
  return function F (...args2) {
    // 判断是否用于构造函数 如果是则使用new调用当前函数
    if (this instanceof F) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2));
  }
}
```
