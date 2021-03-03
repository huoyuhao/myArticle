// 配置文件
module.exports = {
  description: '霍雨浩的个人博客，每天进步一点点，加油！！！',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }], // 增加一个自定义的 favicon
    ['meta', { name: 'author', content: 'yuhoo' }],
    ['meta', { name: 'keywords', content: '前端 web 霍雨浩 个人博客' }],
    ["meta", { name: "apple-mobile-web-app-capable", content: 'yes' }]
  ],
  dest: './blog', // 设置输出目录
  base: '/', // 设置站点根路径
  repo: 'https://github.com/huoyuhao/myArticle', // 添加 github 链接
  themeConfig: { // 导航栏配置
    logo: '/header-logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'Js', link: '/js/Js基础/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Network', link: '/network/' },
      { text: 'Tool', link: '/tool/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'GitHub', link: 'https://github.com/huoyuhao/myArticle' },
    ],
    sidebar: 
    {"/html/":[{"title":"CSS代码规范","path":"/html/00-CSS代码规范.md"},{"title":"HTML代码规范","path":"/html/00-HTML代码规范.md"},{"title":"HTML-CSS基础总结","path":"/html/01-HTML-CSS基础总结.md"},{"title":"CSS画图总结","path":"/html/02-CSS画图总结.md"},{"title":"CSS之Flex布局","path":"/html/03-CSS之Flex布局.md"}],"/js/":[{"title":"Js基础","sidebarDepth":2,"path":"/js/Js基础/","children":[{"title":"Js代码规范","path":"/js/Js基础/00-Js代码规范.md"},{"title":"Js基础总结","path":"/js/Js基础/00-Js基础总结.md"},{"title":"Js基础数据类型","path":"/js/Js基础/01-Js基础数据类型.md"},{"title":"Js数组","path":"/js/Js基础/01-Js数组.md"},{"title":"Js正则表达式","path":"/js/Js基础/01-Js正则表达式.md"},{"title":"Js执行机制","path":"/js/Js基础/02-Js执行机制.md"},{"title":"Js中This","path":"/js/Js基础/03-Js中This.md"},{"title":"Js中的call方法","path":"/js/Js基础/03-Js中的call方法.md"},{"title":"Js中的new操作符","path":"/js/Js基础/03-Js中的new操作符.md"},{"title":"Js原型链","path":"/js/Js基础/04-Js原型链.md"}]},{"title":"Js安全","sidebarDepth":2,"path":"/js/Js安全/","children":[{"title":"XSS","path":"/js/Js安全/01-XSS.md"},{"title":"CSRF","path":"/js/Js安全/02-CSRF.md"}]},{"title":"Js进阶","sidebarDepth":2,"path":"/js/Js进阶/","children":[{"title":"Js事件循环机制","path":"/js/Js进阶/00-Js事件循环机制.md"}]}],"/linux/":[{"title":"Linux常用命令","path":"/linux/00-Linux常用命令.md"},{"title":"升级服务器","path":"/linux/01-升级服务器.md"},{"title":"Node命令","path":"/linux/02-Node命令.md"}],"/network/":[{"title":"browser","sidebarDepth":2,"path":"/network/browser/","children":[{"title":"浏览器内核","path":"/network/browser/01-浏览器内核.md"},{"title":"浏览器DNS解析","path":"/network/browser/02-浏览器DNS解析.md"},{"title":"DNS预解析","path":"/network/browser/03-DNS预解析.md"},{"title":"跨域","path":"/network/browser/03-跨域.md"},{"title":"Cookie","path":"/network/browser/04-Cookie.md"},{"title":"浏览器缓存","path":"/network/browser/05-浏览器缓存.md"}]},{"title":"network","sidebarDepth":2,"path":"/network/network/","children":[{"title":"TCP与UDP协议","path":"/network/network/01-TCP与UDP协议.md"},{"title":"TCP三次握手和四次挥手","path":"/network/network/02-TCP三次握手和四次挥手.md"},{"title":"常见HTTP状态码","path":"/network/network/03-常见HTTP状态码.md"},{"title":"HTTP发展历程","path":"/network/network/04-HTTP发展历程.md"},{"title":"HTTPS","path":"/network/network/05-HTTPS.md"},{"title":"GET与POST","path":"/network/network/06-GET与POST.md"}]}],"/tool/":[{"title":"vscode插件","path":"/tool/01-vscode插件.md"},{"title":"vscode远程连接","path":"/tool/01-vscode远程连接.md"},{"title":"git","path":"/tool/02-git.md"},{"title":"fiddler","path":"/tool/03-fiddler.md"},{"title":"docker","path":"/tool/04-docker.md"},{"title":"eslint","path":"/tool/05-eslint.md"},{"title":"npm使用","path":"/tool/06-npm使用.md"}],"/vue/":[{"title":"NPM发布模块到NPM上","path":"/vue/09-NPM发布模块到NPM上.md"}]},
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  markdown: { // md文档配置
    lineNumbers: true, // 代码块显示行号
  },
  plugins: {
    // "vuepress-plugin-auto-sidebar": {},
    '@vuepress/active-header-links': {},
    '@vuepress/back-to-top': {}, // 返回顶部
    '@vuepress/google-analytics': {
      'ga': 'UA-165864510-1'
    },
    '@vuepress/medium-zoom': {
      selector: 'img',
      options: {
        margin: 16
      }
    }
  }
}