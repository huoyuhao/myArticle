---
meta:
  - name: description
    content: exports
  - name: keywords
    content: require,import,module.exports,module,互相导入,exports,
---
# import、require、export、module.export 区别

## 1. CommonJS规范

`exports`、`module.exports`、`module`、`require`属于CommonJS规范

### 1.1 介绍

```js
const { run, eat } = require('./dog.js');
```

`CommonJS`使用`require`引入模块的方式是动态的，所谓动态就是上面代码在被执行的时候，才会引入`dog.js`模块，而且引入的是完整的一个对象，并不只是`run`和`eat`两个方法。所以上面这段代码也可以和下面的代码等同

```js
const dog = require('./dog.js');
const run = dog.run;
const eat = dog.eat;
```

### 1.2 module

在`CommonJS`中，一个文件就是一个`模块`，`module`就表示当前模块的引用（module是一个对象）。`module`作为一个对象自然也就有关于当前模块信息的属性。常见的有：`module.exports`、`module.children`、`module.parent`等等，这里只需要关注`module.exports`就行。

### 1.3 module.exports

`module.exports`也是一个对象，该对象由系统创建，在外部文件引入此模块时实际就是引入了`exports`对象。一般我们都采用`module.exports.xxx`的方式导出数据，也可以使用直接给`exports`赋值的方式导出数据。

```js
// 导出dog.js
module.exports.eat = function (data) { console.log(data); }
//引入
const { eat } = require('./dog.js');


// 直接赋值给exports进行导出
module.exports = function (data) { console.log(data); }
// 引入
const eat = require('./dog.js');
```

### 1.4 exports

`exports`是个值得注意的地方。它的使用方法和`module.exports`是一样的，类似于`module.exports`的快捷方式。非常要注意的是不要直接给`exports`赋值，只能使用.对exports的属性进行赋值，如果使用=直接给exports赋值会导致数据不能导出。

```js
// 正确使用 等同于module.exports.eat
exports.eat = function (data) { console.log(data); }

// 无法导出
exports = 123
```

### 1.5 require

`require()`用于引入模块、JSON、本地文件，这里只对引入模块做说明。其参数可以是模块名，也可以是文件路径。如果直接使用模块名，则会在node_modules中或者内置模块中进行引入。如果引入的是模块，该方法的返回值就是`module.exports`对象




## 2. ES6的模块规范介绍

`import`、`import()`、`export`、`export default`属于ES6的模块规范

`ES6`采用`import`的方式引入模块，这种方式和`CommonJS`正好相反，它是静态的引入模块，即在代码编译的时候就已经把`run`和`eat`方法引入了。所以在效率上会比`CommonJS`的`require`方法效率更高

### 2.1 export

注意和`CommonJS`中`exports`进行区别，`export`在ES6中是个关键字，`exports`在CommonJS中是一个对象或属性。也就是说`exports`必须使用=对自身的属性进行赋值，而`export`则使用声明的方式导出变量。

```js
// CommonJS
exports.eat = function () {}
// ES6
export function eat () {} 
```

`export`用于暴露模块对外的接口。这里需要注意`export暴露的是变量而不是值`。注意这两者的区别，下面代码对变量和值进行了解释。（个人理解import取得是当前变量的引用，所以必须是变量而不是值）

```js
// 报错，导出的是1，并非a，1是值，export不能直接导出值 
const a = 1;
export a; // SyntaxError: Invalid or unexpected token

// 正确，导出的是b
export const b = 1;
// 正确，导出的是一个对象
export { a };
// 报错 export必须导出具有对应关系的变量
function eat () {}
export eat;
// 正确
export function eat () {}
export { eat };
```

### 2.2 export default

`export default`用于直接导出`值`，比如直接导出数值、字符串、对象、数组、方法等。在使用`import`引入的时候，直接给导出的值一个变量就行了

```js
// dog.js
export default 1;

// test.js
import dog from 'dog.js';
console.log(dog); // 1
```

### 2.3 import

`import`是输入接口，用来引入外部模块暴露出来的变量或者值，接口是只读的不可以被改变，如果接口是对象则可以更改对象的属性，但是不建议这样做。所有输入进来的东西我们不应该去更改它的原始值。

```js
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

### 2.4 import 变量提升

```js
// a.js
console.log('a.js')
import { foo } from './b.js';
console.log(foo);

// b.js
console.log('b.js')
export let foo = 1;
// 运行 node -r esm a.js
// b.js  a.js 1
```

预编译 a.js -> 发现关键词 import -> 预编译 b.js -> 执行 b.js -> 执行 a.js

```js
// a.js
console.log('a.js');
var b = require('./b');
console.log(b.foo);

// b.js
console.log('b.js')
let foo = 1;
module.exports = { foo };

// 运行 node a.js
// a.js b.js 1

// 对 a.js 预编译时，只会把变量 b 的声明提前，a.js & b.js 预编译后的执行顺序如下
// a.js
var b;
console.log('I am a.js...')
b = require('./b');
console.log(b.foo);
```

import命令只能在模块顶层使用，不能在函数、判断语句等代码块之中引用；require可以。

### 2.5 node 中运行 es6

```js
npm install esm
node -r esm xxx.js // xxx.js 中使用 ES6 模块规范
node xxx.js        // xxx.js 中使用 CommonJS 规范
```

## 3. CommonJS和ES6的差异

| 类型 | CommonJS | ES6 |
| --- | --- | ---|
| 引入 | `require` | `import`、`import()` |
| 导出 | `exports`、`module.exports` | `export`、`export default` |
| 加载模块 | 运行阶段去加载模块 | 预编译阶段去加载模块 |
| 加载方式 | 同步加载 | 异步加载 |
| 基础数据类型 | 复制该变量 | 只是对该变量的动态只读引用 |
| 复杂数据类型 | 浅拷贝该对象 | 只是对该变量的动态只读引用 |

目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

```js
// b.js
let count = 0;
setTimeout(() => {
  console.log("base.count：", ++count);
}, 500);
module.exports.count = count;

// a.js
const { count } = require('./b');
setTimeout(() => {
  console.log("count in commonjs is", count);
}, 1000);
// base.count： 1
// count in commonjs is 0

// b.js
let count = { a: 1 };
setTimeout(() => {
  count.b = 2;
  count.a++;
  console.log("base.count：", count);
}, 500);
module.exports.count = count;
// a.js
const { count } = require('./b');
setTimeout(() => {
  console.log("count in es6 is", count);
}, 1000);
// base.count： { a: 2, b: 2 }
// count in es6 is { a: 2, b: 2 }
```

```js
// b.js
let count = 0;
setTimeout(() => {
  console.log("base.count：", ++count);
}, 500);
export { count };

// a.js
import { count } from './b';
setTimeout(() => {
  console.log("count in es6 is", count);
}, 1000);
// base.count： 1
// count in es6 is 1
```

## 4. 循环引入

### 4.1 require加载原理

当Node遇到require(X)时，会按照下面顺序处理

+ 如果X是内置模块，比如require('http')，返回该模块，不在继续执行
+ 如果X以“./”、"/"、“../”开头，根据X所在的父模块，确定X的绝对路径，随后将X当成文件一次查找x、x.js、x.json、x.node，只要存在其中一个，就返回该文件
+ 如果X不戴路径，根据X所在的父模块，确定X可能的安装目录，在每个目录中，将X当成文件名或者目录加载
+ 抛出“not found”

CommonJS的一个模块就是一个脚本文件，require命令第一次加载该脚本，就会执行整个脚本，随后在内存中生成一个对象

```js
{
  id: '...', // 模块名
  exports: { ... }, // 模块输出的各个接口
  loaded: true, // 布尔值，表示该模块的脚本是否执行完毕
  ...
}
```

以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值

```js
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');

//main.js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);

// node a.js
// main starting
// a starting
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a done
// in main, a.done = true, b.done = true
```

### 4.2 ES6循环加载

ES6模块是动态引用，不存在缓存值的问题，它遇到模块加载命令import时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。

```js
// a.js
import { b } from './b';
var counter = 0;
export function a (n) {
  counter ++;
  console.log(counter);
  return n == 0 || b(n-1);
}

// b.js
import { a } from './a.js';

export function b (n) {
  return n != 0 && a(n-1);
}

// main.js
import * as m from './a.js';
var x = m.a(5);
console.log(x);
var y = m.a(4);
console.log(y);

// node main.js
// 1 2 3 false 4 5 6 true
```

可以看出counter的值是累加的，ES6是动态引用。

## 5. 参考资料

[理解import、export、module.exports、require等](https://juejin.cn/post/6844904168818229261)

[ES6 import/export 静态编译](https://juejin.cn/post/6844904039822393358)

[javascript模块循环加载](https://juejin.cn/post/7039283969501691918)