---
meta:
  - name: description
    content: JavaScript中This
  - name: keywords
    content: JavaScript中This,This,JavaScript,前端,学习,apply,call,bind
---
# JavaScript中This

## this指向问题

`this`就是一个指针，指向我们调用函数的对象

### 全局环境

除了在声明的对象内被调用, this 在 严格模式下 永远是 undefined。

注意我提到的是严格模式。如果不是在严格模式下 (在js的头部，你没有明确的添加`'use strict'`关键字)，那么你就处在非严格模式的状态下，this 在这个环境下，除了我下面提到的特殊案例外，this指代的是全局对象的值。

在浏览器的上下文环境中，这个值就是`window`，node 中是 `global`

```js
(function () {
  "use strict"
  console.log(this)
})();
(function () {
  // 不使用严格模式
  console.log(this)
})()
```

### 作为对象的方法调用

当一个函数被当作一个对象的方法调用的时候

```js
function test () {
  console.log(this.name)
}
var obj = {
  name: 'yuhoo',
  foo: test
}
obj.foo() // yuhoo
```

在 js 中一切都是对象，函数也是一个对象，对于 `test` ，它只是一个函数名，函数的引用，它指向这个函数，当 `foo = test`，`foo` 同样也指向了这个函数

```js
var obj = {
  name: 'yuhoo',
  foo: function () {
    console.log(this)
  }
}
var test = obj.foo
test() // Window
```

当我们把 `test = obj.foo` ，`test` 直接指向了一个函数的引用，这时候，其实和 `obj` 这个对象没有关系了，所以，它是被当作一个普通函数来直接调用，因此，`this` 指向全局对象。

## call/bind/apply

### 区别

### call实现










## 箭头函数

### this指向

### es5语法实现




## 参考

[JavaScript中的this](https://juejin.im/entry/5b8e6666518825430367172b)