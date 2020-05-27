// 配置文件
module.exports = {
  description: '霍雨浩的个人博客，每天进步一点点，加油！！！',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '../../logo.png' }], // 增加一个自定义的 favicon
    ['meta', { name: 'author', content: 'yuhoo' }],
    ['meta', { name: 'keywords', content: '前端 web 霍雨浩 个人博客' }],
    ["meta", { name: "apple-mobile-web-app-capable", content: 'yes' }]
  ],
  dest: './blog',    // 设置输出目录
  base: '/', // 设置站点根路径
  repo: 'https://github.com/huoyuhao/myArticle', // 添加 github 链接
  themeConfig: { // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: 'Js', link: '/js/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'HTML', link: '/html/' },
      { text: 'Linux', link: '/linux/' },
      { text: '网络', link: '/network/' },
      { text: '其他', link: '/other/' },
      { text: 'GitHub', link: 'https://github.com/huoyuhao/myArticle' },
    ],
  },
  markdown: { // md文档配置
    lineNumbers: false, // 代码块显示行号
  },
  plugins: {
    "vuepress-plugin-auto-sidebar": {},
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