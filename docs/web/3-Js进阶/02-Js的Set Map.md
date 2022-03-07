---
meta:
  - name: description
    content: JavaScript的Set-Map
  - name: keywords
    content: JavaScript的Set-Map,Set,Map,WeakMap,weakSet,前端,
---
# JavaScript的Set-Map

## 1. Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

### 1.1 Set属性 方法

+ new Set(iterable) 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中
+ size 返回集合所包含元素的数量
+ add(value) 添加某个值，返回 Set 结构本身(可以链式调用)
+ delete(value) 删除某个值，删除成功返回 true，否则返回 false
+ has(value) 返回一个布尔值，表示该值是否为 Set 的成员
+ clear() 清除所有成员，没有返回值

### 1.2 Set遍历方法

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回键值对的遍历器。
+ forEach()：使用回调函数遍历每个成员

```js
let set = new Set(['red', 'green', 'blue'])

for (let item of set.keys()) {
  console.log(item)
}
// red green blue

for (let item of set.values()) {
  console.log(item)
}
// red green blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 1.3 Array Set对比

+ Array 的 indexOf 方法比 Set 的 has 方法效率低下
+ Set 不含有重复值（可以利用这个特性实现对一个数组的去重）
+ Set 通过 delete 方法删除某个值，而 Array 只能通过 splice。两者的使用方便程度前者更优
+ Array 的很多新方法 map、filter、some、every 等是 Set 没有的（但是通过两者可以互相转换来使用）

### 1.4 WeakSet

WeakSet结构与 Set 类似，也是不重复的值的集合

成员都是数组和类似数组的对象，若调用 add() 方法时传入了非数组和类似数组的对象的参数，就会抛出错误。

```js
const b = [1, 2, [1, 2]];
new WeakSet(b); // Uncaught TypeError: Invalid value used in weak set
```

**成员都是弱引用，可以被垃圾回收机制回收**，可以用来保存 DOM 节点，不容易造成内存泄漏。

WeakSet 不可迭代，因此不能被用在 for-of 等循环中
WeakSet 没有 size 属性

### 1.5 Map相关应用

#### 1.5.1 Array.from

`Array.from` 方法可以将 Set 结构转为数组

```js
const items = new Set([1, 2, 3, 4, 5])
const array = Array.from(items)
```

#### 1.5.2 数组去重

```js
// 去除数组的重复成员
[...new Set(array)]

Array.from(new Set(array))
```

#### 1.5.3 实现并集 (Union)、交集 (Intersect) 和差集

```js
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))
// set {2, 3}

// 差集
let difference = new Set([...a].filter((x) => !b.has(x)))
// Set {1}
```

## 2. Map

### 2.1 Map属性 方法

+ new Map(iterable) 创建 map，如果提供了一个 iterable 对象（通常是二维数组），将会从数组里面复制值到 map 中
+ size 返回当前元素个数
+ set(key, val) 向Map中添加新元素
+ get(key) 通过键值查找特定的数值并返回
+ has(key) 判断Map对象中是否有Key所对应的值，有返回true,否则返回false
+ delete(key) 通过键值从Map中移除对应的数据
+ clear() 将这个Map中的所有元素删除

```js
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得普通的 Object 吗? 它会将键转化为字符串
// Map 则会保留键的类型，所以下面这两个结果不同：
console.log(map.get(1));    // 'num1'
console.log(map.get('1'));  // 'str1'
console.log(map.size);      // 3
```

Map 使用 SameValueZero 算法来比较键是否相等。它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN。所以 NaN 也可以被用作键。

这个算法不能被改变或者自定义。

### 2.2 Map遍历方法

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回键值对的遍历器。
+ forEach()：使用回调函数遍历每个成员

```js
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion', 50],
]);

// 遍历所有的键（vegetables）
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// 遍历所有的值（amounts）
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// 遍历所有的实体 [key, value]
for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
  console.log(entry); // cucumber,500 (and so on)
}
```

### 2.3 Map Object对比

+ Map中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
+ Map的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
+ Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

### 2.4 WeakMap

WeakMap结构与 Map 类似，也是不重复的值的集合

只接受对象作为键名（null 除外），不接受其他类型的值作为键名

**键名是弱引用，键值可以是任意的**，键名所指向的对象可以被垃圾回收，此时键名是无效的

不能遍历，方法有 get、set、has、delete

### 2.5 Map相关应用

#### 2.5.1 Object.entries 从对象创建 Map

该方法返回对象的键/值对数组

```js
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

console.log(map.get('name')); // John
```

#### 2.5.2 Object.fromEntries 从 Map 创建对象

Object.fromEntries 方法的作用是给定一个具有 [key, value] 键值对的数组，它会根据给定数组创建一个对象

```js
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // 创建一个普通对象（plain object）(*)

// obj = { banana: 1, orange: 2, meat: 4 }

console.log(obj.orange); // 2
```

## 3. 参考文章

[Map and Set（映射和集合）](https://zh.javascript.info/map-set)

[彻底弄懂ES6中的Map和Set](https://juejin.cn/post/6844903855302377486)

[你真的了解ES6的Set，WeakSet，Map和WeakMap吗？](https://juejin.cn/post/6844904191610060814)
