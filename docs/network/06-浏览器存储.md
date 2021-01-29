---
meta:
  - name: description
    content: 前端浏览器数据存储
  - name: keywords
    content: 浏览器数据存储,数据存储,存储,cookie,localStorage,sessionStorage
---

# 前端浏览器数据存储

## cookie

## sessionStorage

## localStorage

## indexedDB

## 其他

### sessionStorage数据共享

```html
<!-- 使用一个新标签页打开自身，并设置一个 sessionStorage -->
<a href="index.html" target="_blank" onclick="sessionStorage.setItem('name', 'liam')">open myself</a>
```

1. 在浏览器中打开这个 index.html，我们称之为标签页 A。注意：需要用 http 协议打开！例如 http://localhost/index.html
2. 点击页面上的链接，此时会弹出来标签页 B。
3. 在标签页 B 中打开控制台并执行 sessionStorage.getItem('j')
4. 控制台输出's'，这说明标签页 A 和 B 共享了 sessionStorage 中的数据
5. 接下来，先关闭这两个标签页，然后再打开一个标签页 C，再读取一下 j 的值，得到的是 null

但是如果进行如下操作发现表现与预期不符合：

1. 在浏览器中打开这个 index.html，我们称之为标签页 A。注意：需要用 http 协议打开！例如 http://localhost/index.html
2. 点击页面上的链接，此时会弹出来标签页 B。
3. 在标签页 B 中打开控制台并执行 sessionStorage.getItem('j')，得到 's'
4. 新建一个新标签页 D，然后在地址栏内输入 http://localhost/index.html 打开同样的页面， 然后执行 sessionStorage.getItem('j')
5. 按照我的预期，标签页 D 得到的应该还是 's'，毕竟我认为 sessionStorage 的数据是在同一网站的多个标签页之间共享的。但是我错了，得到的结果是 null

标签页 B 和标签页 D 之间唯一的不同就是它们被打开的方式：标签页 B 是通过在标签页 A 中点击链接打开的，但标签页 D 是在浏览器地址栏输入地址打开的

通过点击链接（或者用了 window.open）打开的新标签页之间是属于同一个 session 的（因为她们共用了同一个浏览器的进程），但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session

[sessionStorage 的数据会在同一网站的多个标签页之间共享吗？这取决于标签页如何打开](https://github.com/lmk123/blog/issues/66)
