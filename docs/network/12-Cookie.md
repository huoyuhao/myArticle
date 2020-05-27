---
meta:
  - name: description
    content: 前端Cookie
  - name: keywords
    content: 前端Cookie,Cookie,前端,
---
# 前端Cookie

## 介绍

Cookie 是一小段文本信息，伴随着用户请求和页面在 Web 服务器和浏览器之间传递。Cookie 包含每次用户访问站点时 Web 应用程序都可以读取的信息。
Cookie是存储在用户本地的，可持久化一段时间（可以自行设定）。

## 原理

![浏览器cookie](/img/浏览器cookie.png)

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将cookie放入到响应请求中，在浏览器第二次发请求的时候，会把cookie带过去，服务端会辨别用户身份，当然服务器也可以修改cookie内容

## 参数说

| 参数  | 描述 |
| --- | --- |
| name  | 必需。规定 cookie 的名称。 |
| value  | 必需。规定 cookie 的值。 |
| size  | cookie大小。 |
| expire| 可选。规定 cookie 的有效期。 |
| path  | 可选。规定 cookie 的服务器路径。 |
| domain| 可选。规定 cookie 的域名。 |
| secure| 可选。规定是否通过安全的 HTTPS 连接来传输 cookie。 |
| HttpOnly | 可选。规定无法通过 `JS 脚本` 读取到该 cookie 的信息，只有在http请求头中会带有此cookie的信息 |

:::tip
secure：安全设置，指明必须通过 安全的通信通道来传输（https) 才能获得 cookie，true 不安全，默认值；false 安全，必须通过 https 来访问。
:::

## 同源

### 顶级域名

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名等等，否则cookie无法生成

比如`huoyuhao.com`能设置domain为`huoyuhao.com`或者`www.huoyuhao.com`，但不能设置domain为`blog.huoyuhao.com`，这样cookie不会生成。

:::tip
cookie不可跨域

顶级域名设置的cookie可以共享【需要指定domain主域名的host】给二级域名，也可以自己私有【不指定domain】
:::

### 二级域名

设置cookie的话只能在本域名下或者domain级别高于自身的域名下才会生效

### 读取COOKIE

+ 二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。例如：要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。

+ 顶级域名只能获取到domain设置为顶级域名的cookie，domain设置为其他子级域名的无法获取。

## 使用

```js
let getCookie = function (key) {
  let r = new RegExp('(?:^|;+|\\s+)' + key + '=([^;]*)')
  let m = document.cookie.match(r)
  return (!m ? '' : m[1])
}
let setCookie = function (name, value, expires, path, domain, secure) { // 写入COOKIES
  let exp = new Date()
  expires = arguments[2] || null
  path = arguments[3] || "/"
  domain = arguments[4] || null
  secure = arguments[5] || false
  expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : ""
  document.cookie = name + '=' + escape(value) + ( expires ? ';expires=' + exp.toGMTString() : '') + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '')
}
let delCookie = function(name, path, domain, secure) { // 删除cookie
  let value = getCookie(name)
  if (value != null) {
    let exp = new Date()
    exp.setMinutes(exp.getMinutes() - 1000)
    path = path || "/"
    document.cookie = name + '=;expires=' + exp.toGMTString() + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '')
  }
}
```

## 参考文章

[Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
