---
meta:
  - name: description
    content: JavaScript中New
  - name: keywords
    content: JavaScript中New,New,JavaScript,前端,学习,模拟实现
---
# JavaScript中New

## 1. new发生了什么

用new调用一个函数发生了这些事：

+ 新建一个对象 `instance = new Object();`
+ 设置原型链 `instance.__proto__ = F.prototype`;
+ 让F中的this指向instance，执行F的函数体
+ 判断F的返回值类型：如果是值类型，就丢弃它，还是返回instance。如果是引用类型，就返回这个引用类型的对象，替换掉instance

```js
function newOperator(ctor, ...rest){
  // 基于obj的原型创建一个新的对象
  const newObj = Object.create(ctor.prototype);

  // 添加属性到新创建的newObj上, 并获取obj函数执行的结果.
  const result = ctor.apply(newObj, rest);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === 'object' ? result : newObj;
}
```

## 2. 模拟实现

```js
/**
 * 模拟实现 new 操作符
 * @return { Object|Function|Regex|Date|Error }      [返回结果]
 */
function newOperator (ctor, ...rest) {
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  // ES6 new.target 是指向构造函数
  newOperator.target = ctor;
  // 1.创建一个全新的对象，
  // 2.并且执行[[Prototype]]链接
  // 通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
  let newObj = Object.create(ctor.prototype);

  // let newObj = new Object();
  // newObj.__proto__ = ctor.prototype;

  // 3.生成的新对象会绑定到函数调用的`this`。
  // 获取到ctor函数返回结果
  let ctorReturnResult = ctor.apply(newObj, rest);
  // 4.中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  let isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
  let isFunction = typeof ctorReturnResult === 'function';
  if(isObject || isFunction){
    return ctorReturnResult;
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Function`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj;
}
```

```js
// 在函数中区分是否使用new进行调用
function User() {
  console.log(new.target);
}

// 不带 "new"：
User(); // undefined
// 带 "new"：
new User(); // function User { ... }
```
