# My Article



18年毕业以来一直在简书上写个人博客，主要是觉得自己的技术还没有达标，现在准备对自己一年半的学习进行总结，并且输出为文章。

主要规划是以下几个主题
+ XSS 攻击 如何避免
+ csrf攻击 




+ http 3
+ https为什么加载缓慢，解决方案
+ get post请求区别 https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/




2、网站优化
+ dns预解析
+ 通过正确设置响应头来缓存JavaScript文件
+ 合并文件（减少http请求），将script标签放在body尾部（减少页面css，html的下载阻塞，减少界面的空白时间（浏览器在解析到script标签之前，不会渲染页面的任何部分））
+ 可通过CSS Sprite（又称CSS雪碧）—将多个图片整合到一个图片中
+ Minify把CSS和JS压缩和削减(Minify：去掉空格回车符等)
+ 按需加载：将不影响首屏的资源和当前屏幕资源不用的资源放到用户需要时才加载，可以大大提升重要资源的显示速度和降低总体流量
+ defer和async属性：都是并行下载，下载过程不阻塞，区别在于执行时机，async是下载完成后立即执行；defer是等页面加载完成后再执行。defer仅当src属性声明时才生效（HTML5的规范）
+ 控制 JavaScript 包的大小，面向移动设备时尤其要注意。较小的包可提升下载速度、降低内存使用率并减少 CPU 开销
+ 不要只做一个大包；如果你的包大小超过 50-100kB，就把它拆分成几个小包。（通过 HTTP/2 多路复用可以同时传输多个请求和响应消息，从而减少额外请求的开销。）
+ 通过正确设置响应头来缓存JavaScript文件
+ 减少重绘和重排： 在修改样式的过程中，最好避免使用下面的属性,因为它们会刷新渲染队列，尽量少查询下列属性
+ 合并多次对DOM和样式的修改
+ 
+ 
+ cookie httponly
+ 
+ 
+ 使用for循环
+ 若我们要访问最外层的变量（全局变量），则相比直接访问内部的变量而言，会带来比较大的性能损耗。因此，我们可以将经常使用的全局变量引用储存在一个局部变量里
+ 避免使用with，try-catch，eval等动态作用域语句
+ 使用事件委托来减少事件处理器的数量
+ 把递归算法改用迭代算法实现是避免调用栈溢出错误的解决方法之一
+ 免重复性工作，手动实现缓存（Vue源码中就有很多缓存）
+ 避免使用闭包
+ 
+ 使用http2
+ 服务器PWA service worker
+ Web Worker
+ WebAssembly
+ 服务器渲染
+ 图片懒加载
+ 骨架屏

3、Js基础
+ 闭包
+ 原型链 https://juejin.im/post/5bcb2e295188255c55472db0
+ 继承
+ 作用域
+ 作用域链
+ new
+ call bind apply
+ 跨域 https://blog.csdn.net/u010430495/article/details/79131498
+ this、原型、一些设计模式
+ 宏任务 微任务 https://www.jianshu.com/p/4f91b492c0d9

4、css
+ 使用css画一个扇形
https://github.com/haizlin/fe-interview/issues/527

5、ES6
+ 箭头函数 this指向
+ + let const区别
+ promise\await
+ 多个请求，在每个请求返回后每隔5s发送下一个请求
+ 多个请求发送，10s后停止 https://juejin.im/post/5a32705a6fb9a045117127fa
+ post请求数据类型 json
+ input 文件 引用

编程题：
+ js实现类似于add(1,2)(3)(4,5)调用方式的方法
+ 硬币找零问题：有面额为d1...dn的硬币，和要找零的钱数，找出所需最小硬币个数的方案，例如，美国有以下面额(硬币）：d1=1, d2=5, d3=10, d4=25，如果要找36美分的零钱，所需最少硬币是 [1, 10, 25]，即满足如下输出：
const minCoinChange = new MinCoinChange([1, 5, 10, 25])
console.log(minCoinChange.makeChange(36)) // [1, 10, 25]
const minCoinChange2 = new MinCoinChange([1, 3, 4]);
console.log(minCoinChange2.makeChange(6)) // [3, 3]

1、颗粒化
2、函数式编程

Node.js（如Koa、Express）开发经验者优先
typescript
WebSocket
单元测试
PWA

vue
diff
订阅观察
双向绑定
手动实现脚手架
生命周期
key（除了v-for循环使用、）


<!-- 职业规划 -->
1、0-3年，熟练掌握常用开发技能；
2、3-5年，能带领团队，进行一定规模的前端项目开发，同时负责技术攻关；
3、5+年，从产品、逻辑、交互的层面上，进行前端架构的设计。