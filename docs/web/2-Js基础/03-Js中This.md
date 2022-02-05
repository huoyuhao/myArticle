---
meta:
  - name: description
    content: JavaScript中This
  - name: keywords
    content: JavaScript中This,This,JavaScript,前端,学习,apply,call,bind
---
# JavaScript中This

## 1. 全局环境

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

## 2. 作为对象的方法调用

当一个函数被当作一个对象的方法调用的时候

```js
function test () {
  console.log(this.name)
}
let obj = {
  name: 'liam',
  foo: test
}
obj.foo() // liam
```

在 js 中一切都是对象，函数也是一个对象，对于 `test` ，它只是一个函数名，函数的引用，它指向这个函数，当 `foo = test`，`foo` 同样也指向了这个函数

```js
let obj = {
  name: 'liam',
  foo: function () {
    console.log(this)
  }
}
let test = obj.foo
test() // Window
```

当我们把 `test = obj.foo` ，`test` 直接指向了一个函数的引用，这时候，其实和 `obj` 这个对象没有关系了，所以，它是被当作一个普通函数来直接调用，因此，`this` 指向全局对象。

总结：**this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的**

## 3. 构造函数

```js
function Student (name) {
  this.name = name;
  console.log(this); // {name: '凉风'}
  // 相当于返回了
  // return this;
}
let result = new Student('凉风');
```

使用new操作符调用函数，会自动执行以下步骤

+ 创建了一个全新的对象
+ 这个对象会被执行[[Prototype]]（也就是__proto__）链接
+ 生成的新对象会绑定到函数调用的this
+ 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
+ 如果函数没有返回对象类型Object(包含Function, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象

由此可以知道：new操作符调用时，this指向生成的新对象

new调用时的返回值，如果没有显式返回对象或者函数，才是返回生成的新对象。

```js
function Student (name) {
  this.name = name;
  // return function f () {};
  // return {};
}
let result = new Student('凉风');
console.log(result); // { name: '凉风' }
// 如果返回函数f，则result是函数f，如果是对象{}，则result是对象{}
```

## 4. 事件绑定

事件绑定共有三种方式：行内绑定、动态绑定、事件监听；

行内绑定的两种情况：

```html
<input type="button" value="按钮" onclick="clickFun()">
<script>
  function clickFun () {
    console.log(this); // 此函数的运行环境在全局window对象下，因此this指向window;
  }
</script>​
<input type="button" value="按钮" onclick="this">
<!-- 运行环境在节点对象中，因此this指向本节点对象 -->
```

当事件触发时，属性值就会作为JS代码被执行，当前运行环境下没有clickFun函数，因此浏览器就需要跳出当前运行环境，在整个环境中寻找一个叫clickFun的函数并执行这个函数，所以函数内部的this就指向了全局对象window；如果不是一个函数调用，直接在当前节点对象环境下使用this，那么显然this就会指向当前节点对象；

动态绑定与事件监听：

```html
<button class="button">onclick</button>
<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  </ul>
<script>
  let button = document.querySelector('button');
  button.onclick = function (ev) {
    console.log(this);
    console.log(this === ev.currentTarget); // true
  }
  let list = document.querySelector('.list');
  list.addEventListener('click', function (ev) {
    console.log(this === list); // true
    console.log(this === ev.currentTarget); // true
    console.log(this);
    console.log(ev.target);
  }, false);
</script>
```

onclick 和 addEventListener 是指向绑定事件的元素。

顺便提下：面试官也经常考察ev.currentTarget和ev.target的区别。

+ ev.currentTarget是绑定事件的元素，而ev.target是当前触发事件的元素。比如这里的分别是ul和li
+ 但也可能点击的是ul，这时ev.currentTarget和ev.target就相等了

## 5. 定时函数

```js
let obj = {
  fun: function () {
    console.log(this);
  }
}
​
setInterval(obj.fun,1000); // this指向window对象
// 等价于
const extractedLogInfo = obj.fun;
setTimeout(extractedLogInfo);

setInterval('obj.fun()',1000); // this指向obj对象
```

setInterval() 是window对象下内置的一个方法，接受两个参数，第一个参数允许是一个函数或者是一段可执行的 JS 代码，第二个参数则是执行前面函数或者代码的时间间隔；

在上面的代码中，setInterval(obj.fun,1000) 的第一个参数是obj对象的fun ，因为 JS 中函数可以被当做值来做引用传递，实际就是将这个函数的地址当做参数传递给了 setInterval 方法，换句话说就是 setInterval 的第一参数接受了一个函数，那么此时1000毫秒后，函数的运行就已经是在window对象下了，也就是函数的调用者已经变成了window对象，所以其中的this则指向的全局window对象；

而在 setInterval('obj.fun()',1000) 中的第一个参数，实际则是传入的一段可执行的 JS 代码；1000毫秒后当 JS 引擎来执行这段代码时，则是通过 obj 对象来找到 fun 函数并调用执行，那么函数的运行环境依然在 对象 obj 内，所以函数内部的this也就指向了 obj 对象；

## 6. call/apply/bind

fun.call(thisArg, arg1, arg2, ...)

thisArg是在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。

返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。

apply和call类似。只是参数不一样。它的参数是数组（或者类数组）。

bind和call和apply类似，第一个参数也是修改this指向，只不过返回值是新函数，新函数也能当做构造函数（new）调用

## 7. 箭头函数

### 7.1 特点

+ 1、没有自己的this、super、arguments和new.target绑定
+ 2、不能使用new来调用
+ 3、没有原型对象
+ 4、不可以改变this的绑定
+ 5、形参名称不能重复

### 7.2 箭头函数this指向

箭头函数内部的this是词法作用域，由上下文确定，默认绑定外层this。

如果不确定，可以在箭头外声明`let that = this;`，箭头函数中的this就是指向that。

```js
let name = 'window';
let student = {
  name: '凉风',
  doSth: function () {
    // let self = this;
    let arrowDoSth = () => {
      // console.log(self.name);
      console.log(this.name);
    }
    arrowDoSth();
  },
  arrowDoSth2: () => {
    console.log(this.name);
  }
}
student.doSth(); // '凉风'
student.arrowDoSth2(); // 'window'
```

### 7.3 不能改变this

```js
let student = {
  name: '凉风',
  doSth: function(){
    console.log(this.name);
    return () => {
      console.log('arrowFn:', this.name);
    }
  }
}
let person = {
  name: 'person',
}
student.doSth().call(person); // '凉风'  'arrowFn:' '凉风'
student.doSth.call(person)(); // 'person' 'arrowFn:' 'person'
```

## 8. 参考

[JavaScript中的this](https://juejin.im/entry/5b8e6666518825430367172b)

[彻底搞懂JavaScript中的this指向问题](https://zhuanlan.zhihu.com/p/42145138)
