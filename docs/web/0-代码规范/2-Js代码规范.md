---
meta:
- name: description
  content: 前端Js代码规范
- name: keywords
  content: 前端规范,前端JavaScript代码规范,JavaScript,前端,规范,命名规范,Js规范,JavaScript
---
# JavaScript代码规范

## 1. 语言规范

### 1.1 类型

#### 1.1.1 Eslint

```js
{
  'no-const-assign': 2, // 禁止修改const声明的变量
  'prefer-const': 1, // 如果一个变量不会被重新赋值，最好使用const进行声明
  'no-var': 2, // 要求使用 let 或 const 而不是 var
}
```

#### 1.1.2 【可选】 const 和 let 都是块级作用域，var 是函数级作用域

```js
{
  let a = 1;
  let b = {};
}

console.log(a); // Uncaught ReferenceError
console.log(a); // Uncaught ReferenceError
```

#### 1.1.3 【必须】 使用 const 定义你的所有引用，避免使用 var

```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```

#### 1.1.4 【必须】 如果引用是可变动的，则使用 let

```js
// bad
var count = 1;
if (count < 10) {
  count += 1;
}

// good
let count = 1;
if (count < 10) {
  count += 1;
}
```

#### 1.1.5 【必须】 请注意使用symbols

符号（Symbols）不能完全的被 polyfill，因此在不能原生支持symbol类型的浏览器或环境中，不应该使用symbol类型

### 1.2 对象

#### 1.2.1 Eslint

```js
{
  'no-new-object': 2, // 禁止使用 Object 构造函数
  'object-shorthand': 2, // 要求对象字面量简写语法
  'quote-props':[2, 'as-needed'], // 要求对象字面量属性名称使用引号
  'no-prototype-builtins': 2, // 禁止直接使用 Object.prototypes 的内置属性
}
```

#### 1.2.2 【必须】 请使用字面量值创建对象

```js
// bad
const a = new Object{};

// good
const a = {};
```

#### 1.2.3 【推荐】 请使用对象方法/属性值的简写方式

```js
// bad
const values = 1;
const a = {
  values: values,
  addValue: function (val) {
    return item.values + val;
  },
};

// good
const values = 1;
const a = {
  values,
  addValue (val) {
    return item.values + val;
  },
};
```

#### 1.2.4 【推荐】 对象属性值的简写方式要和声明式的方式分组

声明对象时，将简写的属性放在前面

```js
const job = 'web';
const department = 'ios';

// bad
const a = {
  sex: 'male',
  job,
  age: 25,
  department,
}

// good
const a = {
  job,
  department,
  sex: 'male',
  age: 25,
}
```

#### 1.2.5 【必须】 只使用引号标注无效标识符的属性

```js
// bad
const a = {
  'age': 25,
  'first-name': 'huo',
}

// good
const a = {
  age: 25,
  'first-name': 'huo',
}
```

#### 1.2.6 【推荐】 别使用保留字作为对象的键值，这样在 IE8 下不会运行

```js
// bad
const a = {
  default: {}, // default 是保留字
  common: {},
};

// good
const a = {
  defaults: {},
  common: {},
};
```

#### 1.2.7 【推荐】 不能直接调用 Object.prototype 的方法，如： hasOwnProperty/propertyIsEnumerable/isPrototypeOf

原因：这些方法可能被有问题的对象上的属性覆盖 - 如 { hasOwnProperty: false } - 或者，对象是一个空对象 (Object.create(null))。

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const hasProperty = Object.prototype.hasOwnProperty;
console.log(hasProperty.call(object, key));

/* or */
import { hasProperty } from 'until';
console.log(hasProperty(object, key));
```

#### 1.2.8 【推荐】 使用对象扩展操作符（spread operator）浅拷贝对象，而不是用 Object.assign 方法

```js
// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

### 1.3 数组

#### 1.3.1 Eslint

```js
{
  'no-array-constructor': 2, // 禁用 Array 构造函数
  'array-callback-return': 2, // 强制数组方法的回调函数中有 return 语句
}
```

#### 1.3.2 【必须】 使用字面量语法创建数组

```js
// bad
const a = new Array();

// good
const a = [];
```

#### 1.3.3 【必须】 向数组中添加元素时，请使用 push 方法

```js
const a = [];
// bad
a[a.length] = 'test';

// good
a.push('test');
```

#### 1.3.4 【必须】 使用拓展运算符 ... 复制数组

```js
const items = [1, 2];
const itemsCopy = [];

// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

#### 1.3.5 【推荐】 使用展开符 ... 代替 Array.from，将一个可迭代对象转换成一个数组

```js
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

#### 1.3.6 【必须】 使用 Array.from 将一个 类数组（array-like）对象/伪数组对象 转换成一个数组

```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

#### 1.3.7 【必须】 使用 Array.from 代替展开符 ... 映射迭代器，因为它避免了创建一个中间数组

```js
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```

#### 1.3.8 【推荐】 使用数组的 map 等方法时，请使用 return 声明，如果是单一声明语句的情况，可省略 return

```js
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);
```

#### 1.3.9 【推荐】 如果数组有多行，则在数组开始括号 [ 的时候换行，然后在数组结束括号 ] 的时候换行

```js
// bad
const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

// good
const objectInArray = [
  {
    id: 1,
  }, {
    id: 2,
  },
];
```

### 1.4 解构赋值

#### 1.4.1 Eslint

```js
{
  'prefer-destructuring': 2, // 优先使用数组和对象解构
}
```

#### 1.4.2 【推荐】 在访问和使用对象的多个属性时使用对象解构

原因: 解构可以避免为这些属性创建临时引用

```js
// bad
function getFullName (user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}

// good
function getFullName (user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName ({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

#### 1.4.3 【推荐】 当需要使用数组的多个值时，请同样使用解构赋值

```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

#### 1.4.4 【必须】 函数需要回传多个值时，请使用对象的解构，而不是数组的解构

原因： 你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方

```js
// bad
function processInput () {
  return [top, right, bottom, left];
}
// 如果是数组解构，那么在调用时就需要考虑数据的顺序
const [top, xx, xxx, left] = processInput();

// good
function processInput () {
  return { top, right, bottom, left };
}
// 此时不需要考虑数据的顺序
const { top, left } = processInput();
```

### 1.5 字符串

#### 1.5.1 Eslint

```js
{
  'quotes': [2 'single'], // 强制使用一致的单引号
  'template-curly-spacing': 2, // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
  'prefer-template': 2, // 建议使用模板字面量而非字符串连接
  'no-eval': 2, // 禁用 eval()
  'no-useless-escape': 2, // 禁用不必要的转义字符
}
```

#### 1.5.2 【推荐】 使用单引号 '' 定义字符串

```js
// bad
const name = "liam";

// good
const name = 'liam';
```

#### 1.5.3 【必须】 不应该用字符串跨行连接符的格式来跨行编写,这样会使当前行长度超过100个字符

原因 断开的字符串维护起来很痛苦，并且会提高索引难度。

```js
// bad
const str = '这是一个字符串 这是一个字符串 \
这是一个字符串 这是一个字符串 \
这是一个字符串';

// bad
const str = '这是一个字符串 这是一个字符串 ' +
'这是一个字符串 这是一个字符串 ' +
'这是一个字符串';

// good
const str = '这是一个字符串 这是一个字符串 这是一个字符串 这是一个字符串 这是一个字符串 这是一个字符串';
```

#### 1.5.4 【必须】 构建字符串时，使用字符串模板代替字符串拼接

原因 字符串模板为您提供了一种可读的、简洁的语法，具有正确的换行和字符串插值特性

```js
const test = 'test';

// bad
const str = ['a', 'b', test].join();

// bad
const str = 'a' + 'b' + test;

// bad
const str = `ab${ test }`;

// good
const str = `ab${test}`;
```

#### 1.5.5 【必须】 永远不要使用 eval() 执行放在字符串中的代码，它导致了太多的漏洞

#### 1.5.6 【必须】 不要在字符串中转义不必要的字符

原因 反斜杠损害了可读性，因此只有在必要的时候才可以出现。

```js
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

### 1.6 函数

#### 1.6.1 Eslint

```js
{
  'func-style': [2, 'expression'], // 强制一致地使用 function 声明或表达式
  'wrap-iife': [2, 'inside'], // 要求 IIFE 使用括号括起来
  'no-loop-func': 2, // 禁止在循环语句中出现包含不安全引用的函数声明
  'prefer-rest-params': 2, // 要求使用剩余参数而不是 arguments
  'no-new-func': 2, // 禁止对 Function 对象使用 new 操作符
  'space-before-function-paren': 2, // 要求或禁止函数圆括号之前有一个空格
  'space-before-blocks': 2, // 强制在块之前使用一致的空格
  'no-param-reassign': 2, // 禁止对 function 的参数进行重新赋值
  'prefer-spread': 2, // 要求使用扩展运算符而非 .apply()
}
```

#### 1.6.2 【可选】 使用命名的函数表达式代替函数声明

原因 函数声明时作用域被提前了，这意味着在一个文件里函数很容易（太容易了）在其定义之前被引用。这样伤害了代码可读性和可维护性。如果你发现一个函数又大又复杂，并且它干扰了对这个文件其他部分的理解，那么是时候把这个函数单独抽成一个模块了！别忘了给表达式显式的命名，不用管这个名字是不是由一个确定的变量推断出来的（这在现代浏览器和类似babel编译器中很常见）。这消除了由匿名函数在错误调用栈产生的所有假设。 * (Discussion)

```js
// bad
function foo () {
}

// good
const foo = function () {
};

// good
const short = function longUniqueMoreDescriptiveLexicalFoo () {
};
```

#### 1.6.3 【必须】 把立即执行函数包裹在圆括号里

原因 立即调用的函数表达式是个独立的单元 - 将它和它的调用括号还有入参包装在一起可以非常清晰的表明这一点

```js
(function () {
  console.log('Hello!');
}());
```

#### 1.6.4 【必须】 切记不要在非功能块中声明函数 (if, while, 等)

请将函数赋值给变量。浏览器允许你这样做，但是不同浏览器会有不同的行为，这并不是什么好事

#### 1.6.5 【必须】 ECMA-262 将 block 定义为语句列表。 而函数声明并不是语句

```js
// bad
if (currentUser) {
  function test () {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

#### 1.6.6 【必须】 永远不要给一个参数命名为 arguments

这将会覆盖函数默认的 arguments 对象

```js
// bad
function foo (name, options, arguments) {
}

// good
function foo (name, options, args) {
}
```

#### 1.6.7 【推荐】 使用 rest 语法 ... 代替 arguments

原因 ... 明确了你想要拉取什么参数。 而且, rest 参数是一个真正的数组，而不仅仅是类数组的 arguments 。

```js
// bad
function concatenateAll () {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll (...args) {
  return args.join('');
}
```

#### 1.6.8 【推荐】 使用默认的参数语法，而不是改变函数参数

```js
// really bad
function handleThings (opts) {
  // 不应该修改参数。
  // 更加错误的是： 如果 opts 是一个 '非正值'（falsy）它将被设置成一个对象
  opts = opts || {};
  // ...
}

// still bad
function handleThings (opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings (opts = {}) {
  // ...
}
```

#### 1.6.9 【推荐】 总是把默认参数放在最后

```js
// bad
function handleThings (opts = {}, name) {
  // ...
}

// good
function handleThings (name, opts = {}) {
  // ...
}
```

#### 1.6.10 【推荐】 永远不要使用函数构造器来创建一个新函数

原因 以这种方式创建一个函数跟 eval() 差不多，将会导致漏洞。

```js
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

#### 1.6.11 【必须】 函数声明语句中需要空格

原因 一致性很好，在删除或添加名称时不需要添加或删除空格。

```js
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a () {};
```

#### 1.6.12 【推荐】 不要改变入参

原因 操作入参对象会导致原始调用位置出现意想不到的副作用。

```js
// bad
function f1 (obj) {
  obj.key = 1;
}

// good
function f2 (obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key')  obj.key : 1;
}
```

#### 1.6.13 【推荐】 不要对入参重新赋值

原因 重新赋值参数会导致意外的行为，尤其是在访问 arguments 对象的时候。 它还可能导致性能优化问题，尤其是在 V8 中。

```js
// bad
function f1 (a) {
  a = 1;
  // ...
}

function f2 (a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3 (a) {
  const b = a || 1;
  // ...
}

function f4 (a = 1) {
  // ...
}
```

#### 1.6.14 【推荐】 优先使用扩展运算符 ... 来调用可变参数函数

原因 它更加清晰，你不需要提供上下文，并且能比用 apply 来执行可变参数的 new 操作更容易些。

```js
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```

### 1.7 箭头函数

#### 1.7.1 Eslint

```js
{
  'prefer-arrow-callback': 2, // 要求使用箭头函数作为回调
  'arrow-spacing': 2, // 强制箭头函数的箭头前后使用一致的空格
  'arrow-body-style': 2, // 要求箭头函数体使用大括号
  'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
  'no-confusing-arrow': 2, // 禁止在可能与比较操作符相混淆的地方使用箭头函数
  'implicit-arrow-linebreak': 2, // 强制隐式返回的箭头函数体的位置
}
```

#### 1.7.2 【推荐】 当你必须使用匿名函数时 (当传递内联函数时)， 使用箭头函数

原因 它创建了一个在 this 上下文中执行的函数版本，它通常是你想要的，并且是一个更简洁的语法。

什么时候不适用? 如果你有一个相当复杂的函数，你可能会把这些逻辑转移到它自己的命名函数表达式里。

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

#### 1.7.3 【推荐】 如果函数体由一个没有副作用的 表达式 语句组成，删除大括号和 return。否则，保留括号并继续使用 return 语句

原因 语法糖。 多个函数被链接在一起时，提高可读性。

```js
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number + 1}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// 没有副作用的隐式返回
function foo(callback) {
  const val = callback();
  if (val === true) {
  // 如果回调返回 true 执行
  }
}

let bool = false;

// bad
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
```

#### 1.7.4 【推荐】 如果表达式跨越多个行，用括号将其括起来，以获得更好的可读性

原因 它清楚地表明了函数的起点和终点。

```js
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));
```

#### 1.7.5 【推荐】 如果你的函数只有一个参数并且函数体没有大括号，就删除圆括号。 否则，为了保证清晰和一致性，请给参数加上括号

注意：总是使用括号是可以接受的

原因 让代码看上去不那么乱。

```js
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

#### 1.7.6 【推荐】 避免搞混箭头函数符号 (=>) 和比较运算符 (<=, >=)

```js
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```

#### 1.7.7 【推荐】 在箭头函数用隐式 return 时强制将函数体的位置约束在箭头后

```js
// bad
(foo) =>
  bar;

(foo) =>
  (bar);

// good
(foo) => bar;
(foo) => (bar);
(foo) => (
  bar
);
```

### 1.8 模块

#### 1.8.1 Eslint

```js
{
  'no-duplicate-imports': 2, // 禁止重复模块导入
}
```

#### 1.8.2 【可选】 使用ES6的模块 (import/export) 语法来定义模块

```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

#### 1.8.3 【推荐】 不要使用import * 通配符

原因 这确保你有单个默认的导出。

```js
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

#### 1.8.4 【推荐】 不要在import语句中直接export

原因 虽然写在一行很简洁，但是有一个明确的导入和一个明确的导出能够保证一致性。

```js
// bad
export { es6 as default } from './AirbnbStyleGuide';

// good
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

#### 1.8.5 【必须】 对于同一个路径，只在一个地方引入所有需要的东西

eslint: no-duplicate-imports

```js
// bad
import foo from 'foo';
// … 其他导入 … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';
```

#### 1.8.6 【推荐】 在只有单一导出的模块里，用 export default 更好

原因 鼓励更多的模块只做单一导出，会增强代码的可读性和可维护性。

```js
// bad
export function foo () {}

// good
export default function foo () {}
```

#### 1.8.7 【必须】 将所有的 imports 语句放在其他语句之前

原因 将所有的 imports 提到顶部，可以防止某些诡异行为的发生。

```js
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

### 1.9 迭代器

#### 1.9.1 Eslint

```js
{
  'no-iterator': 2, // 禁用迭代器 __iterator__ 属性
  'generator-star-spacing': 2, //强制 generator 函数中 * 号周围使用一致的空格
}
```

#### 1.9.2 【推荐】 不要使用迭代器。 推荐使用 JavaScript 的高阶函数代替 for-in 或者 for-of

eslint: no-iterator no-restricted-syntax

原因 这有助于不可变性原则。 使用带有返回值的纯函数比使用那些带有副作用的方法，更具有可读性。

使用 map() / every() / filter() / find() / findIndex() / reduce() / some() / ... 遍历数组， 和使用 Object.keys() / Object.values() / Object.entries() 迭代你的对象生成数组。

```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map(num => num + 1);
```

#### 1.9.3 【可选】 现在不要使用generator

原因 它们不能很好的转译为 ES5。但可以在Nodejs中使用

#### 1.9.4 【推荐】 如果你必须要使用generator，请确保正确使用空格

eslint: generator-star-spacing

原因 function 和 *是同一个概念关键字的一部分，*不是 function 的修饰符， function* 是一个不同于 function 的构造器。

```js
// bad
function * foo () {
  // ...
}

// bad
const bar = function *() {
  // ...
};

// bad
const baz = function * () {
  // ...
};

// bad
const qu = function*() {
  // ...
};

// bad
function*foo() {
  // ...
}

// bad
function *foo() {
  // ...
}

// good
function* foo () {
  // ...
}

// good
const foo = function* () {
  // ...
};
```

### 1.10 对象属性

#### 1.10.1 Eslint

```js
{
  'dot-notation': 2, // 强制尽可能地使用点号
}
```

#### 1.10.2 【推荐】 访问属性时使用点符号

eslint: dot-notation

```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

#### 1.10.3 【可选】 使用变量访问属性时，用 []表示法

```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

### 1.11 变量声明

#### 1.11.1 Eslint

```js
{
  'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
  'one-var': [2, 'never'], // 强制函数中的变量在一起声明或分开声明
  'no-multi-assign': 2, // 禁止连续赋值
  'no-plusplus': [2, { 'allowForLoopAfterthoughts': true }], // 禁止使用一元操作符 ++ 和 -- 允许在 for 循环的最后一个表达式中使用 ++ 和 --
  'no-unused-vars': 2, // 禁止出现未使用过的变量
}
```

#### 1.11.2 【必须】 变量应先声明再使用，禁止引用任何未声明的变量，除非你明确知道引用的变量存在于当前作用域链上。禁止不带任何关键词定义变量，这样做将会创建一个全局变量，污染全局命名空间，造成程序意料之外的错误

eslint: no-undef prefer-const

```js
// bad, 这会创建一个全局变量
superPower = new SuperPower();

// bad, 容易污染外部变量
let superPower = 'a';
(function() {
  superPower = 'b';
})();
console.log(superPower);

// good
let superPower = 'a';
(function() {
  let superPower = 'b';
})();
console.log(superPower);

// bad, 更常见的情况是这样的，在 for 循环里的 i 将会污染外部的变量 i
let i = 1;
(function() {
  for (i = 0; i < 10; i++) {
    console.log('inside', i);
  }
  console.log('outside', i)
})();
console.log('global', i);

// good
let i = 1;
(function() {
  // i 的作用域在 for 循环内
  for (let i = 0; i < 10; i++) {
    console.log('inside i', i);
  }
  // 如果真的需要在 for 循环外使用循环变量，应该先定义在外部
  let j;
  for (j = 0; j < 10; j++) {
    console.log('inside j:', j);
  }
  console.log('outside j', j);
})();
console.log('global', i);
```

#### 1.11.3 【推荐】 声明多个变量应该分开声明，避免一次声明多个变量

eslint: one-var

原因 这样更容易添加新的变量声明，不必担心是使用 ; 还是使用 , 所带来的代码差异。使用版本管理工具如 git ，最后那行的 ; 就不会被标记为修改成 ,。 并且可以通过 debugger 逐步查看每个声明，而不是立即跳过所有声明。

```js
// bad
const items = getItems(),
  goSportsTeam = true,
  ball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const ball = 'z';
```

#### 1.11.4 【推荐】 把 const 声明语句放在一起，把 let 声明语句放在一起

原因 这在后边如果需要根据前边的赋值变量指定一个变量时很有用，且更容易知道哪些变量是不希望被修改的。

```js
// bad
let i;
const items = getItems();
let ball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let ball;
let i;
let length;
```

#### 1.11.5 【推荐】 在你真正需要使用到变量的代码块内定义变量

原因 let 和 const 是块级作用域而不是函数作用域，不存在变量提升的情况。

```js
// bad, 不必要的函数调用
function checkName (hasName) {
  const name = getName();
  if (hasName === 'test') {
    return false;
  }
  if (name === 'test') {
    this.setName('');
    return false;
  }
  return name;
}

// good
function checkName (hasName) {
  if (hasName === 'test') {
    return false;
  }
  const name = getName();
  if (name === 'test') {
    this.setName('');
    return false;
  }
  return name;
}
```

#### 1.11.6 【必须】 不要链式变量赋值

eslint: no-multi-assign

原因 链式变量赋值会创建隐式全局变量。

```js
// bad
(function example() {
  /**
  * JavaScript 把它解释为
  * let a = ( b = ( c = 1 ) );
  * let 关键词只适用于变量 a，变量 b 和变量 c 则变成了全局变量。
  */
  let a = b = c = 1;
}());

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());
```

#### 1.11.7 【必须】 避免使用不必要的递增和递减操作符 (++, --)

eslint no-plusplus

原因 在eslint文档中，一元操作符 ++ 和 --会自动添加分号，不同的空白可能会改变源代码的语义。建议使用 num += 1 这样的语句来做递增和递减，而不是使用 num++ 或 num ++ 。同时 ++num 和 num++ 的差异也使代码的可读性变差。不必要的增量和减量语句会导致无法预先明确递增/预递减值，这可能会导致程序中的意外行为。

但目前依然允许在 for loop 中使用 ++、-- 的语法，但依然建议尽快迁移到 += 1、-= 1 的语法。 #22

```js
// bad
const array = [1, 2, 3];
let num = 1;
num++;
--num;

// good
const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;
```

#### 1.11.8 【必须】 禁止定义了变量却不使用它

eslint: no-unused-vars

原因 在代码里到处定义变量却没有使用它，不完整的代码结构看起来像是个代码错误。即使没有使用，但是定义变量仍然需要消耗资源，并且对阅读代码的人也会造成困惑，不知道这些变量是要做什么的。

```js
// bad
let some_unused_var = 42;

// bad，定义了变量不意味着就是使用了
let y = 10;
y = 5;

// bad，对自身的操作并不意味着使用了
let z = 0;
z = z + 1;

// bad, 未使用的函数参数
function getX (x, y) {
  return x;
}

// good
function getXPlusY (x, y) {
  return x + y;
}

let x = 1;
let y = a + 2;

alert(getXPlusY(x, y));

/**
* 有时候我们想要提取某个对象排除了某个属性外的其他属性，会用 rest 参数解构对象
* 这时候 type 虽然未使用，但是仍然被定义和赋值，这也是一种空间的浪费
* type 的值是 'a'
* coords 的值是 data 对象，但是没有 type 属性 { example1: 'b', example2: 'c' }
*/
let data = { type: 'a', example1: 'b', example2: 'c' }
let { type, ...coords } = data;
```

### 1.12 变量提升

#### 1.12.1 Eslint

```js
{}
```

#### 1.12.2 【可选】 var 定义的变量会被提升到函数作用域范围内的最顶部，但是对它的赋值是不会被提升的，因此在函数顶部相当于定义了变量，但是值是 undefined。const 和 let 声明的变量受到一个称之为 "暂时性死区" (Temporal Dead Zones ，简称 TDZ) 的新概念保护，因此在 "暂时性死区" 内部的 const 和 let 变量，都需要先声明再使用，否则会报错

```js
// notDefined 未定义 (假设没有定义的同名全局变量)
function example () {
  // => throws a ReferenceError
  console.log(notDefined);
}

/**
* 函数体内部因存在 var 变量声明，因此在引用变量的语句之前，变量提升就已经起作用了
* 注意: 真正的值 `true` 不会被提升。
*/
function example () {
  // => undefined
  console.log(declaredButNotAssigned);
  var declaredButNotAssigned = true;
}

/**
* 解释器将变量提升到函数的顶部
* 这意味着我们可以将上边的例子重写为：
*/
function example () {
  let declaredButNotAssigned;
  // => undefined
  console.log(declaredButNotAssigned);
  declaredButNotAssigned = true;
}

// 使用 const 和 let
function example () {
  // => throws a ReferenceError
  console.log(declaredButNotAssigned);
  // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned);
  const declaredButNotAssigned = true;
}
```

#### 1.12.3 【可选】 匿名函数赋值表达式提升变量名，而不是函数赋值

```js
function example () {
  // => undefined
  console.log(anonymous);

  // => TypeError anonymous is not a function
  anonymous();

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}
```

#### 1.12.4 【可选】 命名函数表达式提升的是变量名，而不是函数名或者函数体

```js
function example () {
  // => undefined
  console.log(named);

  // => TypeError named is not a function
  named();

  // => ReferenceError superPower is not defined
  superPower();

  var named = function superPower () {
    console.log('Flying');
  };
}

// 当函数名和变量名相同时也是如此。
function example () {
  // => undefined
  console.log(named);

  // => TypeError named is not a function
  named();

  var named = function named () {
    console.log('named');
  };
}
```

#### 1.12.5 【可选】 函数声明提升其名称和函数体

```js
function example() {
  // => Flying
  superPower();

  function superPower() {
  console.log('Flying');
  }
}
```

### 1.13 比较运算符和等号

#### 1.13.1 Eslint

```js
{
  'eqeqeq': 2, // 要求使用 === 和 !==
  'no-case-declarations': 2, // 不允许在 case 子句中使用词法声明
  'no-nested-ternary': 2, // 禁用嵌套的三元表达式
  'no-unneeded-ternary': 2, // 禁止可以在有更简单的可替代的表达式时使用三元操作符
  'no-mixed-operators': 2, // 禁止混合使用不同的操作符
}
```

#### 1.13.2 【推荐】 使用 === 和 !== 而不是 == 和 !=

eslint: eqeqeq

原因 == 和 != 存在类型转换，会得到和 ===、!== 不一样的结果

```js
// bad, true
undefined == null
// good, false
undefined === null

// bad, true
'0' == 0
// good, false
'0' === 0

// bad, true
0 == false
// good, false
0 === false

// bad, true
'' == false
// good, false
'' === false
```

#### 1.13.3 【推荐】 对于布尔值（在明确知道是布尔值的情况下）使用简写，但是对于字符串和数字进行显式比较

```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}
```

#### 1.13.4 【必须】 在 case 和 default 的子句中，如果存在声明 (例如. let, const, function, 和 class)，使用大括号来创建块级作用域

eslint: no-case-declarations

原因 变量声明的作用域在整个 switch 语句内，但是只有在 case 条件为真时变量才会被初始化。 当多个 case 语句定义相同的变量时，就会导致变量覆盖的问题。

```js
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
        // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
        // ...
    }
    break;
  }
  default: {
    class C {}
  }
}
```

#### 1.13.5 【推荐】 三元表达式不应该嵌套，通常是单行表达式，如果确实需要多行表达式，那么应该考虑使用条件语句

eslint: no-nested-ternary

```js
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// better 分离为两个三元表达式
const maybeNull = value1 > value2 ? 'baz' : null;
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

#### 1.13.6 【推荐】 避免不必要的三元表达式

eslint: no-unneeded-ternary

```js
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

#### 1.13.7 【必须】 使用混合运算符时，使用小括号括起来需要一起计算的部分，只要觉得有必要，那么尽可能地用括号让代码的优先级更明显

eslint: no-mixed-operators

原因 这能提高可读性并且表明开发人员的意图。

```js
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad, 可能陷入一种 (a || b) && c 的思考
if (a || b && c) {
  return d;
}

// good
const foo = (a && b < 0) || (c > 0) || (d + 1 === 0);

// good
const bar = (a ** b) - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + (b / c * d);
```

### 1.14 代码块

#### 1.14.1 Eslint

```js
{
  'nonblock-statement-body-position': 2, // 强制单个语句的位置
  'brace-style': 2, // 强制在代码块中使用一致的大括号风格
  'no-else-return': 2, // 禁止 if 语句中 return 语句之后有 else 块
}
```

#### 1.14.2 【必须】 当有多行代码块的时候，应使用大括号包裹

eslint: nonblock-statement-body-position

```js
// bad
if (test)
  return false;

// bad
let condition = true;
let test = 1;
// 在缩进不规范的时候，容易造成误解
if (condition)
  condition = false;
  test = 2;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo () { return false; }

// good
function bar () {
  return false;
}
```

#### 1.14.3 【必须】 如果你使用的是 if 和 else 的多行代码块，则将 else 语句放在 if 块闭括号同一行的位置

eslint: brace-style

```js
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

#### 1.14.4 【推荐】 如果一个 if 块总是会执行 return 语句，那么接下来的 else 块就没有必要了。 如果一个包含 return 语句的 else if 块，在一个包含了 return 语句的 if 块之后，那么可以拆成多个 if 块

eslint: no-else-return

```js
// bad
function foo () {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats () {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs () {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo () {
  if (x) {
    return x;
  }
  return y;
}

// good
function cats () {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// good
function dogs (x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```

### 1.15 注释

#### 1.15.1 Eslint

```js
{
  'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
}
```

#### 1.15.2 【必须】 使用 /** ... */ 来进行多行注释

```js
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make () {
}

// good
/**
 * make() returns a new element
  * based on the passed-in tag name
  */
function make () {
}
```

#### 1.15.3 【推荐】 使用 // 进行单行注释。 将单行注释放在需要注释的行的上方新行。 建议在注释之前放一个空行，除非它在块的第一行。但如果一段代码每行都包含注释，允许不加分行

```js
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';
  return type;
}
```

#### 1.15.4 【必须】 用一个空格开始所有的注释，使它更容易阅读

eslint: spaced-comment

```js
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make () {
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make () {
}
```

#### 1.15.5 【推荐】 使用 FIXME 或者 TODO 开始你的注释可以帮助其他开发人员快速了解相应代码，如果你提出了一个需要重新讨论的问题，或者你对需要解决的问题提出的解决方案。 这些不同于其他普通注释，因为它们是可操作的。 这些操作是 FIXME: -- 需要解决这个问题 或者 TODO: -- 需要被实现

#### 1.15.6 【推荐】 使用 // FIXME: 注释问题

```js
class Calculator extends Abacus {
  constructor() {
  super();

  // FIXME: 这里不应该使用全局变量
  total = 0;
  }
}
```

#### 1.15.7 【推荐】 使用 // TODO: 注释解决问题的方法

```js
class Calculator extends Abacus {
  constructor() {
  super();

  // TODO: total 应该由一个 param 的选项配置
  this.total = 0;
  }
}
```

### 1.16 其他

#### 1.16.1 Eslint

```js
{
  'no-with': 2, // 禁用 with 语句
  'guard-for-in': 2, // 要求 for-in 循环中有一个 if 语句
}
```

#### 1.16.2 【推荐】禁用with

由于 with 方法会产生神奇的作用域，所以我们也是禁止使用该方法的

#### 1.16.3 【推荐】for-in 循环

eslint: guard-for-in

在对对象进行 for in 操作时，容易忘了检测 hasOwnProperty(key)，所以我们启用了 ESLint 的 guard-for-in 选项

对数组进行 for in 的时候，顺序是不固定的

```js
// bad
for (key in foo) {
  doSomething(key);
}

// good
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

## 2. 编码规范

### 2.1 空白

#### 2.1.1 Eslint

```js
{
  'indent': [2, 2], // 强制使用一致的缩进
  'space-before-blocks': 2, // 强制在块之前使用一致的空格
  'keyword-spacing': 2, // 强制在关键字前后使用一致的空格
  'space-infix-ops': 2, // 要求操作符周围有空格
  'eol-last': 2, // 要求或禁止文件末尾存在空行
  'newline-per-chained-call': 2, // 要求方法链中每个调用都有一个换行符
  'no-whitespace-before-property': 2, // 禁止属性前有空白
  'padded-blocks': [2, 'never'], // 要求或禁止块内填充
  'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 }], // 禁止出现多行空行
  'space-in-parens': 2, // 强制在圆括号内使用一致的空格
  'array-bracket-spacing': 2, // 禁止或强制在括号内使用空格
  'object-curly-spacing': [2, "always"], // 强制在大括号中使用一致的空格
  'max-len': 2, // 强制行的最大长度
  'block-spacing': 2, // 禁止或强制在代码块中开括号前和闭括号后有空格
  'comma-spacing': 2, // 强制在逗号周围使用空格
  'computed-property-spacing': 2, //强制在计算的属性的方括号中使用一致的空格
  'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
  'key-spacing' 2, // 强制在对象字面量的属性中键和值之间使用一致的间距
  'no-trailing-spaces': 2, // 禁用行尾空格
}
```

#### 2.1.2 【推荐】 使用 tabs (空格字符) 设置为2个空格

eslint: indent

代码保持一致的缩进，是作为工程师的职业素养。但缩进用两个空格，还是四个空格，是用 Tab 还是空格呢？这样的争论太多了，也得不出答案。本规范结合了市面上优秀的开源项目，姑且约定使用 空格 来缩进，而且缩进使用两个空格。

那是不是不能使用 Tab 进行缩进了？我们可以通过配置 .editorconfig ，将 Tab 自动转换为空格。

```js
// bad
function foo () {
∙∙∙∙let name;
}

// bad
function bar () {
∙let name;
}

// good
function baz () {
∙∙let name;
}
```

#### 2.1.3 【推荐】 在花括号前放置一个空格

eslint: space-before-blocks

```js
// bad
function test (){
  console.log('test');
}

// good
function test () {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```

#### 2.1.4 【必须】 在控制语句中的左括号前放置1个空格（if，while等）。在函数调用和声明中，参数列表和函数名之间不能留空格

eslint: keyword-spacing

```js
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight() {
  console.log ('Liam!');
}

// good
function fight () {
  console.log('Liam!');
}
```

#### 2.1.5 【必须】 运算符左右设置各设置一个空格

eslint: space-infix-ops

```js
// bad
const x=y+5;

// good
const x = y + 5;
```

#### 2.1.6 【必须】 在文件的结尾需要保留一个空行

eslint: eol-last

```js
// bad
import { es6 } from './AirbnbStyleGuide';
// ...
export default es6;
// good
import { es6 } from './AirbnbStyleGuide';
// ...
export default es6;↵
```

#### 2.1.7 【推荐】 在编写多个方法链式调用(超过两个方法链式调用)时。 使用前导点，强调这行是一个方法调用，而不是一个语句

eslint: newline-per-chained-call no-whitespace-before-property

当方法链发生改变，它提高了差异的清晰度

```js
// bad
const result = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
  .attr('width', (radius + margin) * 2).append('svg:g')
  .attr('transform', `translate(${radius + margin},${radius + margin})`)
  .call(tron.led);

// good
const result = stage.selectAll('.led')
  .data(data)
  .enter().append('svg:svg')
  .classed('led', true)
  .attr('width', (radius + margin) * 2)
  .append('svg:g')
  .attr('transform', `translate(${radius + margin},${radius + margin})`)
  .call(tron.led);
```

#### 2.1.8 【推荐】 在块和下一个语句之前留下一空白行

```js
// bad
const obj = {
  foo () {
  },
  bar () {
  },
};
return obj;

// good
const obj = {
  foo () {
  },

  bar () {
  },
};

return obj;
```

#### 2.1.9 【必须】 不要在块的开头使用空白行

eslint: padded-blocks

```js
// bad
function bar() {

  console.log(foo);

}

// good
function bar() {
  console.log(foo);
}
```

#### 2.1.10 【必须】 不要使用多个空行填充代码

eslint: no-multiple-empty-lines

```js
// bad
class Person {
  constructor(fullName, email, birthday) {
  this.fullName = fullName;


  this.email = email;

  getAge(today, birthday) {
  // ..
  }
}

// good
class Person {
  constructor(fullName, email, birthday) {
  this.fullName = fullName;
  this.email = email;

  getAge(today, birthday) {
  // ..
  }
}
```

#### 2.1.11 【必须】 不要在括号内添加空格

eslint: space-in-parens

```js
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}
```

#### 2.1.12 【必须】 不要在中括号中添加空格

eslint: array-bracket-spacing

```js
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

#### 2.1.13 【推荐】 在花括号内添加空格

eslint: object-curly-spacing

```js
// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };
```

#### 2.1.14 【必须】 避免让你的代码行超过120个字符(包括空格)。 注意：根据上边的规则，长字符串编写可不受该规则约束，不应该被分解

eslint: max-len

原因 这样能够提升代码可读性和可维护性。

```js
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.qu && jsonData.foo.bar.baz.qu.test;

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.qu
  && jsonData.foo.bar.baz.qu.test;

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

#### 2.1.15 【必须】 要求打开的块标志和同一行上的标志拥有一致的间距。此规则还会在同一行关闭的块标记和前边的标记强制实施一致的间距

eslint: block-spacing

```js
// bad
function foo () {return true;}
if (foo) { bar = 0;}

// good
function foo () { return true; }
if (foo) { bar = 0; }
```

#### 2.1.16 【必须】 逗号之前避免使用空格，逗号之后需要使用空格

eslint: comma-spacing

逗号前后的空格可以提高列表项的可读性。对于大多数语言的代码风格来说一般是在逗号之后而不是之前添加一个空格

```js
// bad
const arr = [1 , 2];

// good
const arr = [1, 2];
```

#### 2.1.17 【推荐】 不要在计算属性括号内插入空格

eslint: computed-property-spacing

```js
// bad
obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

// good
obj[foo]
obj['foo']
var x = { [b]: a }
obj[foo[bar]]
```

#### 2.1.18 【必须】 避免在函数名及其入参括号之间插入空格

eslint: func-call-spacing

```js
// bad
func ();

func
();

// good
func();
```

#### 2.1.19 【必须】 在对象的属性和值之间的冒号前不加空格，冒号后加空格

eslint: key-spacing

```js
// bad
var obj = { foo : 42 };
var obj2 = { foo:42 };

// good
var obj = { foo: 42 };
```

#### 2.1.20 【必须】 避免在行尾添加空格

eslint: no-trailing-spaces

#### 2.1.21 【必须】 在代码开始处不允许存在空行，行间避免出现多个空行，而结尾处必须保留一个空行

eslint: no-multiple-empty-lines

```js
// bad
const x = 1;


const y = 2;

// good
const x = 1;

const y = 2;
```

#### 2.1.22【推荐】 推荐使用 Unix 的 LF 作为换行符，而不是 Windows 的 CRLF，这样可以统一文件的换行符，避免因为换行符导致的格式混乱

### 2.2 逗号

#### 2.2.1 Eslint

```js
{
  'comma-style': 2, // 强制使用一致的逗号风格
  'comma-dangle': [2, 'always-multiline'], // 要求或禁止末尾逗号
}
```

#### 2.2.2 【必须】 逗号不能前置

eslint: comma-style

```js
// bad
const story = [
  once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];
```

#### 2.2.3 【推荐】 添加尾随逗号

eslint: comma-dangle

原因 在 git diff 时能够更加清晰地查看改动。 另外，像Babel这样的编译器，会在转译时删除代码中的尾逗号，这意味着你不必担心旧版浏览器中的尾随逗号问题

注意 在 ECMAScript5 里面，对象字面量中的拖尾逗号是合法的，但在 IE8（非 IE8 文档模式）下，当出现拖尾逗号，则会抛出错误

因为拖尾逗号有好也有不好，所以团队约定允许在最后一个元素或属性与闭括号 ] 或 } 在不同行时，可以（但不要求）使用拖尾逗号。当在同一行时，禁止使用拖尾逗号。

```js
// bad - 没有尾随逗号的 git 差异
const hero = {
      firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};

// good - 有尾随逗号的 git 差异
const hero = {
      firstName: 'Florence',
      lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};

// bad
function createHero(
  firstName,
  lastName,
  inventorOf
) {
  // does nothing
}

// good
function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // does nothing
}

// good (注意逗号不能出现在 "rest" 元素后边)
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // does nothing
}
```

### 2.3 类型转换和强制类型转换

#### 2.3.1 Eslint

```js
{
  'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
  'radix': 2, // 强制在 parseInt() 使用基数参数
}
```

#### 2.3.2 【推荐】 使用 String() 函数将变量转成字符串，比较保险

eslint: no-new-wrappers

```js
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```

#### 2.3.3 【推荐】 数字类型转换推荐用 Number() 或者 parseInt() 函数，其中 parseInt() 需显式标明底数

eslint: radix no-new-wrappers

```js
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad 2次取反 数值过大 溢出
const val = ~~inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

#### 2.3.4 【可选】 如果你对性能有极高的要求，觉得 parseInt 性能太低 ，可以使用位运算，但请用注释说明代码含义，否则很难看懂

```js
// good
/**
 * parseInt 使我的代码变慢。
  * 位运算将一个字符串转换成数字更快。
  */
const val = inputValue >> 0;
```

#### 2.3.5 【可选】 谨慎使用位运算符。 在js里，数字的最大值是64位 ，但位运算只能返回32位的整数 (来源)。 对于大于 32 位的数值，位运算无法得到预期结果

最大的 32 位整数是： 2,147,483,647

```js
2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647
```

#### 2.3.6 【推荐】 用两个叹号来转换布尔类型

eslint: no-new-wrappers

```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;
```

### 2.4 命名规范

#### 2.4.1 Eslint

```js
{
  'camelcase': 2, // 要求使用骆驼拼写法
  'new-cap': 2, // 要求构造函数首字母大写
  'no-underscore-dangle': 2, // 禁止标识符中有悬空下划线
}
```

#### 2.4.2 【可选】 避免用单个字母来命名函数或变量。 尽量让名字具有可读性

补充说明：由于eslint的 id-length 规则会把for(let i=0; i < len; i++)这种情况也报错，这不太符合我们的习惯，因此在配置中暂时去掉id-length检查。

```js
// bad
function q () {
}

// good
function query () {
}
```

#### 2.4.3 【必须】 使用驼峰命名法（camelCase）命名对象、函数和实例

eslint: camelcase

```js
// bad
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

#### 2.4.4 【必须】 只有在命名构造器或者类的时候，才用帕斯卡拼命名法（PascalCase），即首字母大写

eslint: new-cap

```js
// bad
function user (options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor (options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

#### 2.4.5 【推荐】 变量命名时不要使用前置或者后置下划线

eslint: no-underscore-dangle

悬空下划线是在标识符的开头或末尾的下划线

因为在 Javascript 里属性和方法没有私有成员一说。 虽然前置下划线通常表示这是私有成员，但实际上还是公开的。 你无法阻止外部调用这类方法。 并且，开发人员容易误以为修改这类函数不需要知会调用方或者不需要测试。 简而言之，如果你想定义私有成员，必须使其不可见。

```js
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';

// 好，在 WeakMap 可用的环境中。 参考 https://kangax.github.io/compat-table/es6/#test-WeakMap
const firstNames = new WeakMap();
firstNames.set(this, 'Panda');
```

#### 2.4.6 【推荐】 不要保存 this 的引用，请使用箭头函数或者 函数#bind

```js
// bad
function foo () {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

#### 2.4.7 【可选】 文件名应该和默认导出的名称保持一致（文件名建议使用 kebab-case，后缀为小写）

```js
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './check-box'; // kebab-case export/import/filename
import fortyTwo from './forty-two'; // kebab-case export/import/filename
import insideDirectory from './inside-directory'; // kebab-case export/import/directory name/implicit "index"
// ^ supports both inside-directory.js and inside-directory/index.js
```

#### 2.4.8 【必须】 导出默认函数时使用驼峰命名法，并且文件名应该和方法名相同。文件名建议使用 kebab-case，后缀为小写

```js
function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;
```

#### 2.4.9 【必须】 当导出构造器 / 类 / 单例 / 函数库 / 对象时应该使用帕斯卡命名法（首字母大写）

```js
const TencentStyleGuide = {
  es6: {
  },
};

export default TencentStyleGuide;
```

#### 2.4.10 【推荐】 缩略词和缩写都必须是全部大写或者全部小写，可读性更好

```js
// bad
const HttpRequests = [
  // ...
];

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
const requests = [
  // ...
];
```

#### 2.4.11 【可选】 对于export的常量，可以用全大写命名，但模块内部的常量名不需要全大写（用驼峰试命名可读性更好）

UPPERCASE_VARIABLES 全大写变量可以让开发者知道这是个常量。 但注意在常量对象内的属性名不需要全大写(如 EXPORTED_OBJECT.key)。

```js
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// 允许，但是不提供语义值
export const apiKey = 'liam';

// 多数情况下，很好
export const API_KEY = 'liam';

// ---

// bad - 不必要大写 key 没有增加语义值
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value'
};
```

### 2.5 存取器

#### 2.5.1 【可选】 如果没有特殊需要，类属性存取器其实是没有必要的

#### 2.5.2 【可选】 不要使用 JavaScript 的 getters/setters 方法，因为它们会导致意外的副作用，并且更加难以测试、维护和推敲。 相应的，如果你需要处理存取过程的时候可以使用函数 getVal() 和 setVal('hello') 实现

```js
// bad
class Dragon {
  get age() {
  // ...
  }

  set age(value) {
  // ...
  }
}

// good
class Dragon {
  getAge() {
  // ...
  }

  setAge(value) {
  // ...
  }
}
```

#### 2.5.3 【推荐】 如果属性/方法是一个 boolean 值，使用 isVal() 或者 hasVal()

```js
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
```

#### 2.5.4 【可选】 可以创建 get() 和 set() 方法，但是要保证一致性

```js
class Jedi {
  constructor(options = {}) {
    const lightSaber = options.lightSaber || 'blue';
    this.set('lightSaber', lightSaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
```

### 2.6 分号

#### 2.6.1 Eslint

```js
{
  'no-extra-semi': 2, // 禁止不必要的分号
  'semi': 2, //要求或禁止使用分号代替 ASI
}
```

#### 2.6.2 【必须】 要加分号

eslint: semi

原因 当 JavaScript 解析器解析到没有分号的单行代码时，它会使用一个叫做 自动分号插入算法（Automatic Semicolon Insertion） 来确定是否应该以换行符视为语句的结束，如果判断为语句结束，会在代码中断前插入一个分号到代码中。 但是，ASI 包含了一些奇怪的行为，如果 JavaScript 错误的解释了你的换行符，你的代码将会中断。 随着越来越多的新特性成为 JavaScript 的一部分，这些规则将变得更加复杂。明确地终止你的语句，并配置你的 linter 以捕获缺少分号的代码行，将有助于预防此类问题。

```js
// bad - 可能异常
const obj = {}
['liam', 'luke'].some((name) => {
  obj[name] = true
  return true
})

// bad - 可能异常
const reaction = "No! That's impossible!"
(async function meanwhileOnTheFalcon () {
  // handle `liam`, `luke`, `tom`, `r2`, `c3p0`
  // ...
}())

// bad - 返回 `undefined` 而不是下一行的值 - 当 `return` 单独一行的时候 ASI 总是会发生
function foo () {
  return
  'search your feelings, you know it to be foo'
}

// good
const obj = {};
['liam', 'luke'].some((name) => {
  obj[name] = true;
  return true;
});
```
