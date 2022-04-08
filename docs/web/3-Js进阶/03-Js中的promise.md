---
meta:
  - name: description
    content: JavaScript中的promise
  - name: keywords
    content: JavaScript中的promise,同步,异步,JavaScript,前端,学习,Promise,async
---
# JavaScript中的promise

## 1. 手写Promise

### 1.1 Promise声明

promise是一个类，它的构造函数接受一个函数，函数的两个参数也都是函数

```js
class MyPromise{
  // 构造器
  constructor(executor){
    let resolve = () => {};
    let reject = () => {};
    // 立即执行
    executor(resolve, reject);
  }
}
```

### 1.2 Promise状态

+ Promise存在三个状态（state）pending、fulfilled、rejected
+ pending: 一个promise在resolve或者reject前就处于这个状态。
+ fulfilled: 一个promise被resolve后就处于fulfilled状态，这个状态不能再改变，而且必须拥有一个不可变的值(value)。
+ rejected: 一个promise被reject后就处于rejected状态，这个状态也不能再改变，而且必须拥有一个不可变的拒绝原因(reason)

```js
class MyPromise{
  constructor(executor){
    // 初始化state为等待态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    let resolve = value => {
      // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled';
        // 储存成功的值
        this.value = value;
      }
    };
    let reject = reason => {
      // state改变,reject调用就会失败
      if (this.state === 'pending') {
        // reject调用后，state转化为失败态
        this.state = 'rejected';
        // 储存失败的原因
        this.reason = reason;
      }
    };
    // 如果executor执行报错，直接执行reject
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}
```

### 1.3 then方法

一个promise必须拥有一个then方法来访问他的值或者拒绝原因。then方法有两个参数：

promise.then(onFulfilled, onRejected)

```js
class MyPromise{
  constructor(executor) {...}
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
  }
}
```

```js
const test = new MyPromise((resolve, reject) => {
  resolve('成功')
}).then(res => console.log(res), err => console.log(err));
// 成功
```

### 1.4 解决异步实现

是当resolve在setTimeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们

```js
class MyPromise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
    // 当状态state为pending时
    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value);
      })
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}
```

```js
const test = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  });
}).then(res => console.log(res), err => console.log(err));
console.log('失败');
// 如果是1.4 由于立即执行函数，没有办法解决异步执行resolve代码，返回 失败
// 失败 -> 成功
```

### 1.5 解决链式调用

then 方法可以被同一个 promise 调用多次

+ 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
+ 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

then 方法必须返回一个 promise 对象。

+ 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行 Promise 解决过程：[[Resolve](promise2, x)](https://promisesaplus.com/#point-47) resolvePromise
+ 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
+ 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
+ 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因

```js
class MyPromise{
  constructor(executor) {...}
  then(onFulfilled, onRejected) {
    // 声明返回的promise2
    let promise2 = new MyPromise((resolve, reject)=>{
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        })
      }
    });
    // 返回promise，完成链式
    return promise2;
  }
}
```

### 1.6 resolvePromise函数

判断x

+ x 是对象或者函数（包括promise），let then = x.then
  + x 是普通值 直接resolve(x)
  + x 不能是null
+ 当x是对象或者函数（默认promise）声明了then
  + 如果取then报错，则走reject()
  + 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
  + 如果成功的回调还是 promise ，就递归继续解析
+ 成功和失败只能调用一个 所以设定一个called来防止多次调用

```js
function resolvePromise(promise2, x, resolve, reject){
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if(x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    // 2.3.2.1 如果x为pending状态，promise必须保持pending状态，直到x为fulfilled/rejected
    if (x.currentState === 'pending') {
      x.then(function(value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject);
      } else { // 但如果这个promise的状态已经确定了，那么它肯定有一个正常的值，而不是一个thenable，所以这里可以取它的状态
      x.then(resolve, reject);
    }
    return;
  }
  // 防止多次调用
  let called;
  // 规范 2.3.3，判断 x 是否为对象或函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范2.3.3.1 因为x.then可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 既要判断它的类型，又要调用它，这就是两次读取
      let then = x.then;
      // 规范2.3.3.3，如果 then 是函数，调用 x.then
      if (typeof then === 'function') { 
        // 规范 2.3.3.3
        // reject 或 reject 其中一个执行过的话，忽略其他的
        then.call(x, y => {
          // 规范 2.3.3.3.3，即这三处谁先执行就以谁的结果为准
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
```

### 1.7 其他问题

+ 规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略
  + onFulfilled返回一个普通的值，成功时直接等于 value => value
  + onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
+ 规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
  + 如果onFulfilled或onRejected报错，则直接返回reject()

```js
class MyPromise{
  constructor(executor) {...}
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 至于为什么用 setTimeout？因为我们模拟不了微任务，那就用宏任务去解决吧
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
}
```

### 1.8 测试Promise

我们使用Promise/A+官方的测试工具`nm i promises-aplus-tests -g`来对我们的MyPromise进行测试，要使用这个工具我们必须实现一个静态方法deferred，官方对这个方法的定义如下:

```js
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = MyPromise;
```

用npm将`promises-aplus-tests`下载下来，再配置下package.json就可以跑测试了:

```js
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  }
}
```

### 1.9 Promise.all

```js
MyPromise.all = function(promiseList) {
  var resPromise = new MyPromise(function(resolve, reject) {
    var count = 0;
    var result = [];
    var length = promiseList.length;

    if(length === 0) {
      return resolve(result);
    }

    promiseList.forEach(function(promise, index) {
      MyPromise.resolve(promise).then(function(value){
        count++;
        result[index] = value;
        if(count === length) {
          resolve(result);
        }
      }, function(reason){
        reject(reason);
      });
    });
  });

  return resPromise;
}
```

### 1.10 Promise.race

```js
MyPromise.race = function(promiseList) {
  var resPromise = new MyPromise(function(resolve, reject) {
    var length = promiseList.length;

    if (length === 0) {
      return resolve();
    } else {
      for(var i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(function(value) {
          return resolve(value);
        }, function(reason) {
          return reject(reason);
        });
      }
    }
  });
  return resPromise;
}
```

### 1.11 完整代码

```js
function resolvePromise(promise2, x, resolve, reject){
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if(x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    // 2.3.2.1 如果x为pending状态，promise必须保持pending状态，直到x为fulfilled/rejected
    if (x.currentState === 'pending') {
      x.then(function(value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject);
      } else { // 但如果这个promise的状态已经确定了，那么它肯定有一个正常的值，而不是一个thenable，所以这里可以取它的状态
      x.then(resolve, reject);
    }
    return;
  }
  // 防止多次调用
  let called;
  // 规范 2.3.3，判断 x 是否为对象或函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范2.3.3.1 因为x.then可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 既要判断它的类型，又要调用它，这就是两次读取
      let then = x.then;
      // 规范2.3.3.3，如果 then 是函数，调用 x.then
      if (typeof then === 'function') { 
        // 规范 2.3.3.3
        // reject 或 reject 其中一个执行过的话，忽略其他的
        then.call(x, y => {
          // 规范 2.3.3.3.3，即这三处谁先执行就以谁的结果为准
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
class MyPromise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 至于为什么用 setTimeout？因为我们模拟不了微任务，那就用宏任务去解决吧
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
}
MyPromise.resolve = function(val){
  return new MyPromise((resolve,reject)=>{
    resolve(val)
  });
}
MyPromise.reject = function(val){
  return new MyPromise((resolve,reject)=>{
    reject(val)
  });
}
MyPromise.race = function(promiseList) {
  var resPromise = new MyPromise(function(resolve, reject) {
    var length = promiseList.length;

    if(length === 0) {
      return resolve();
    } else {
      for(var i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(function(value) {
          return resolve(value);
        }, function(reason) {
          return reject(reason);
        });
      }
    }
  });
  return resPromise;
}
MyPromise.all = function(promiseList) {
  var resPromise = new MyPromise(function(resolve, reject) {
    var count = 0;
    var result = [];
    var length = promiseList.length;

    if(length === 0) {
      return resolve(result);
    }

    promiseList.forEach(function(promise, index) {
      MyPromise.resolve(promise).then(function(value){
        count++;
        result[index] = value;
        if(count === length) {
          resolve(result);
        }
      }, function(reason){
        reject(reason);
      });
    });
  });

  return resPromise;
}
```

## 2. Promise面试题

### 2.1 promise基础

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    reject('fail');
  }, 0);
  resolve();
  console.log(2);
})
promise.then(() => {
  console.log(3);
}).catch(() => {
  console.log(4);
});
console.log(5);
// 输出结果 1 2 5 3
// Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的
// 构造函数中的 resolve 或 reject 只有第一次执行有效，状态一旦改变则不能再变
```

### 2.2 promise 链式调用

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res);
    throw Error('Oh no!');
    return 2;
  })
  .then((res) => {
    // 由于报错跳过
    console.log(res);
    return 3;
  })
  .catch((err) => {
    console.log('fail', err);
    return 4;
  })
  .catch((err) => {
    // 由于返回 resolve 跳过
    console.log(err);
    return 5;
  })
  .then((res) => {
    console.log(res);
  }).then((res) => {
    console.log(res);
  });
// 输出结果 1 fail Error: Oh noes! 4 undefined
// promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用
// 如果当前步骤遇到错误，则任何后续的 .then  都将被跳过，直到遇到 .catch
```

```js
Promise.resolve()
  .then(() => {
    return new Error('Oh no!');
  })
  .then((res) => {
    console.log('then: ', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });
// 输出结果 then: Oh no!
// .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种
// return Promise.reject(new Error('Oh no!'))
// throw Error('Oh no!')
// 因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('Oh no!') 等价于 return Promise.resolve(new Error('Oh no!'))
```

```js
const promise = Promise.resolve()
  .then(() => {
    return promise;
  })
promise.catch(console.error);
// 输出结果 TypeError: Chaining cycle detected for promise
// .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
```

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);
// 1
// .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
```

+ Promise的状态一经改变就不能再改变
+ .then和.catch都会返回一个新的Promise
+ catch不管被连接到哪里，都能捕获上层未捕捉过的错误
+ 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
+ Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。
+ .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获
+ .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
+ .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传
+ .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法
+ .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数

```js
Promise.resolve('1')
  .then(res => {
    console.log(res);
    return 2;
  })
  .then(res => {
    console.log(res);
    return 3;
  })
  .finally(() => {
    console.log('finally');
  });
Promise.resolve('4')
  .then(res => {
    console.log('finally2', res);
    return 5;
  })
  .finally(() => {
    console.log('finally2');
    return 6;
  })
  .then(res => {
    console.log('finally2', res);
  });
// 1 finally2 4  2  finally2  finally finally2 5
// finally与then和catch相同，都是返回promise，都是微任务
```

### 2.3 setTimeout相关

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once');
    resolve('success');
  }, 1000);
})
const start = Date.now();
promise.then((res) => {
  console.log(res, Date.now() - start);
})
promise.then((res) => {
  console.log(res, Date.now() - start);
});
// once success 1005 success 1007
// promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
```

### 2.4 race all等

```js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
// 1 'result: ' 1 2 3
// 使用.race()方法，它只会获取最先执行完成的那个结果，其它的异步任务虽然也会继续进行下去，不过race已经不管那些任务的结果了
```

### 2.5 async/await

```js
async function async1 () {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2 () {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
// async1 start => async2 => start => async1 end => timer2 => timer3 => timer1
```

```js
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res));
// 'async2'  => Uncaught (in promise) error
// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行
```

### 2.6 综合

```js
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
// script start => async1 => promise1 => script end => 1 => timer2 => timer1
// async函数中await的new Promise要是没有返回值的话则不执行后面的内容
// .then函数中的参数期待的是函数，如果不是函数的话会发生透传
// 注意定时器的延迟时间
```

## 3. 参考文章

[BAT前端经典面试问题：史上最最最详细的手写Promise教程](https://juejin.cn/post/6844903625769091079)

[手写PromiseA+](http://dennisgo.cn/Articles/JavaScript/Promise.html)

[Promise 必知必会（十道题）](https://juejin.cn/post/6844903509934997511)

[【建议星星】要就来45道Promise面试题一次爽到底(1.1w字用心整理](https://juejin.cn/post/6844904077537574919)