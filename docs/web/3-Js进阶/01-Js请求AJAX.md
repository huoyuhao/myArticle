---
meta:
  - name: description
    content: JavaScript请求AJAX
  - name: keywords
    content: JavaScript请求AJAX,AJAX,JavaScript,前端,AJAX请求,
---
# AJAX请求

## 1. 发送http请求

AJAX是异步的JavaScript和XML（Asynchronous JavaScript And XML）。简单点说，就是使用 XMLHttpRequest 对象与服务器通信。

### 1.1 new XMLHttpRequest

该构造函数用于初始化一个 XMLHttpRequest 实例对象

```js
let xhr = null;
// Old compatibility code, no longer needed.
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```

### 1.2 XMLHttpRequest.setRequestHeader()

XMLHttpRequest.setRequestHeader() 是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send() 之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。

```js
xhr.setRequestHeader(header, value);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```

### 1.3 XMLHttpRequest.open()

`xhrReq.open(method, url, async, user, password);` 方法初始化一个请求。

+ method：要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略
+ url：一个DOMString表示要向其发送请求的URL
+ async：可选，一个可选的布尔参数，表示是否异步执行操作，默认为true。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用
+ user：可选，可选的用户名用于认证用途
+ password：可选，可选的密码用于认证用途

### 1.4 XMLHttpRequest.send()

XMLHttpRequest.send(prams) 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。

### 1.5 XMLHttpRequest.onreadystatechange

`XMLHttpRequest.onreadystatechange = callback;`当 readyState 的值改变的时候，callback 函数会被调用

### 1.6 属性名

属性名 | 含义
---|---
responseText|服务端返回的文本信息
responseXML|服务端返回的XML DOM文档
status|HTTP状态码
statusText|HTTP状态码说明
readyState|xhr对象的请求响应阶段

readyState 属性一共有5个值，分别表示不同的请求响应阶段：

+ 0： 还未创建请求，即未调用 open() 方法
+ 1： 已调用 open() 方法，但未发送 send() 方法
+ 2： 已调用 send() 方法，但未接收到响应
+ 3： 已接收到部分响应
+ 4： 已接收到全部的响应

## 2. 事例

### 2.1 发送GET请求

```js
let xhr = new XMLHttpRequest();
xhr.open('get', 'www.example.php?query=test');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200){
      console.log(xhr.responseText);
    }
  }
}
```

### 2.2 发送POST请求

```js
let xhr = new XMLHttpRequest();
xhr.open('post', 'www.example.php?query=test');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('query=test');
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200){
      console.log(JSON.parse(xhr.responseText));
    }
  }
}
```

## 3. 封装AJAX

```js
const ajax = (options) => {
  let { url } = options;
  const method = options.method.toLocaleLowerCase() || 'get';
  const async = options.async !== false; // default is true
  const { data } = options;
  const xhr = new XMLHttpRequest();

  if (options.timeout && options.timeout > 0) {
    // 设置超时时间
    xhr.timeout = options.timeout;
  }
  return new Promise((resolve, reject) => {
    xhr.ontimeout = () => {
      return reject && reject('请求超时');
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve && resolve(xhr.responseText);
        } else {
          reject && reject();
        }
      }
    };
    xhr.onerror = (err) => {
      return reject && reject(err);
    };

    const paramArr = [];
    let encodeData;
    if (data instanceof Object) {
      Object.keys(data).forEach((key) => {
        paramArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
      });
      encodeData = paramArr.join('&');
    }

    if (method === 'get') {
      // 检测 url 中是否已存在 ? 及其位置
      const index = url.indexOf('?');
      if (index === -1) url += '?';
      else if (index !== url.length - 1) url += '&';
      // 拼接 url
      url += encodeData;
    }

    xhr.open(method, url, async);
    if (method === 'get') xhr.send(null);
    else {
      // post 方式需要设置请求头
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      xhr.send(encodeData);
    }
  });
};
```
