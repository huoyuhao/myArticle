---
meta:
  - name: description
    content: 前端vscode使用
  - name: keywords
    content: 前端vscode插件,JavaScript,前端,vscode插件,插件,vscode
---
# 前端vscode插件

## 1. 插件推荐

### Auto Close Tag

自动闭合 HTML 标签

### Auto Rename Tag

修改 HTML 标签时，自动修改匹配的标签

### Beautify

css/sass/less 格式化

### Better Comments

编写更加人性化的注释
注释会在代码中显示不同颜色

```js
/**
 * ! #FF2D00 红色
 * ? #3498DB 蓝色
 * // #474747 灰色
 * * #98C379 绿色
 * todo #FF8C00 橙色
*/
```

### Bookmarks

添加行书签
| 动作 | 快捷键 |
| ---- | ---- |
| Toggle（标注/取消一個书签） | Ctrl + Alt + K |
| Jump to Next（跳到下一个书签） | Ctrl + Alt + J |
| Jump to Previous（跳到上一个书签）| Ctrl + Alt + L |

### Can I Use

HTML5、CSS3、SVG 的浏览器兼容性检查
通过命令面板输入Can I Use
再搜索兼容性内容即可

### Code Runner

运行选中代码段（支持大量语言，包括 Node）
| 动作 | 快捷键         |
| ---- | -------------- |
| 运行 | Ctrl + Alt + N |
| 停止 | Ctrl + Alt + M |

### Code Spellchecker

单词拼写检查，会自动检查单词拼写错误
选中单词右键点击【Add Word to User Dictionary】可以把自创单词加入字典中


### Color Highlight

颜色值在代码中高亮显示

### CSS Peek

使用此插件，你可以追踪至样式表中 CSS 类和 ids 定义的地方
在 HTML 文件中右键单击选择器时，选择“ Go to Definition 和 Peek definition ”选项，它便会给你发送样式设置的 CSS 代码
**但是不支持 Vue 文件**

### Document This

注释文档生成
将光标放置于 function 上面，使用 Ctrl + Alt + D
只支持 js 或 ts 文件

### ESLint

ESLint 插件，高亮提示

### EditorConfig for VS Code

EditorConfig 插件

### File Peek

鼠标移到路径名按住 ctrl 可打开文件，系统已内置

### Git

Git Blame 在状态栏显示当前行的 Git 信息
Git History(git log) 查看 git log
GitLens 显示文件最近的 commit 和作者，显示当前行 commit 信息 - GitLens — Git supercharged

### Guides

高亮缩进基准线
与内置的缩进参考线不同，Guides 能够让你通过配置项来修改参考线的颜色、样式、缩进空白的背景色等，如果你愿意折腾，甚至能够配置出类似 Indent Rainbow 那样风格的参考线。

### Helium Icon Theme

不同类型文件显示不同icon

### HTML CSS Support

让 html 标签上写 class 智能提示当前项目所支持的样式
新版已经支持 scss 文件检索
支持 vue

### HTMLHint

HTML 格式提示

### Indenticator

缩进高亮

### IntelliSense for css class names css class

css - class输入提示

### JavaScript (ES6) code snippets

ES6 TypeScript 语法代码段
imp→	imports entire module import fs from 'fs';
imd→	imports only a portion of the module using destructing import {rename} from 'fs';
env→	exports name variable export const nameVariable = localVariable;
fre→	forEach loop in ES6 syntax array.forEach(currentItem => {})
prom→	creates a new Promise return new Promise((resolve, reject) => {});
thenc→	adds then and catch declaration to a promise .then((res) => {}).catch((err) => {});
clo→	console log object with name console.log('object :>> ', object);

### JavaScript Standard Style

Standard 风格

### Less IntelliSense

less 变量与混合提示

### Lodash

Lodash 代码段

### MochaSnippets

Mocha 代码段

### Node modules resolve

快速导航到 Node 模块

### Output Colorizer

彩色输出信息

### Partial Diff

对比两段代码或文件

### Path Autocomplete

路径完成提示

### Path Intellisense

另一个路径完成提示

### PostCss Sorting

css 排序

### Prettify JSON

格式化 JSON

### Project Manager

快速切换项目

### REST Client

发送 REST 风格的 HTTP 请求

d### Sass

sass 插件

### Settings Sync VSCode

设置同步到 Gist

### Sort Typescript Imports

typescript 的 import 排序

### Sort lines

排序选中行

### String Manipulation

字符串转换处理（驼峰、大写开头、下划线等等）

### Syncing vscode

设置同步到 gist

### Todo Tree

TODO 管理

### TS/JS postfix completion

ts/js 前缀提示

### TSLint TypeScript

语法检查

### Test Spec Generator

测试用例生成（支持 chai、should、jasmine）

### TypeScript Import

TS 自动 import

### TypeSearch

TS 声明文件搜索

### Types auto installer

自动安装@types 声明依赖

### VSCode Great Icons

文件图标拓展

### Version Lens

package.json 文件显示模块当前版本和最新版本

### View Node Package

快速打开选中模块的主页和代码仓库

### VueHelper

Vue2 代码段（包括 Vue2 api、vue-router2、vuex2）

### FileSize

状态栏显示当前文件大小

### ftp-sync

同步文件到 ftp

### gitignore

.gitignore 文件语法

### htmltagwrap

快捷包裹 html 标签

### language-stylus Stylus

语法高亮和提示

### markdownlint Markdown

格式提示

### npm Intellisense

导入模块时，提示已安装模块名称

### npm

运行 npm 命令

### stylelint

css/sass/less 代码风格

### vetur

目前比较好的 Vue 语法高亮

### vscode-database

操作数据库，支持 mysql 和 postgres

### vscode-random

随机字符串生成器

### vscode-styled-components

styled-components 高亮支持

### vscode-styled-jsx

styled-jsx 高亮支持

## 2. vscode 设置文件

```json
{
  "editor.quickSuggestions": {
    "strings": true
  },
  "breadcrumbs.enabled": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "wxml": "html"
  },
  "files.associations": {
    "*.tpl": "html",
    "*.vtpl": "html",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "prettier.endOfLine": "crlf",
  "cSpell.userWords": [],
  "sync.gist": "",
  "sync.forceUpload": false,
  "sync.autoUpload": false,
  "editor.fontSize": 14, // 字体大小
  "editor.tabSize": 2, // table 2个空格
  "editor.minimap.enabled": false, // 不显示迷你地图
  "editor.wordWrap": "on", // 自动换行
  "editor.renderWhitespace": "all", // 渲染空格
  "editor.tabCompletion": "on", // 弃用tab按键自动补全
  "files.defaultLanguage": "html", // 新建文件后的默认文件类型
  "workbench.colorCustomizations": {
    "editor.lineHighlightBackground": "#1a2c1c", // 光标所在行的背景色
    "editor.lineHighlightBorder": "#7154978a" // 光标所在行的边框色
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": false,
    // For Stylelint 保存格式化css
    "source.fixAll.stylelint": false
  },
  "workbench.activityBar.visible": true, // 启用导航路径
  "search.followSymlinks": false,
  // Set the default
  "editor.formatOnSave": false,
  // Enable per-language
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.iconTheme": "vscode-great-icons",
  "gitlens.advanced.messages": {
    "suppressGitVersionWarning": true
  },
  "sync.autoDownload": false,
  "editor.renderIndentGuides": false,
  "php.executablePath": "/usr/bin/php",
  "git.ignoreLegacyWarning": true,
  "git.confirmSync": false,
  "window.zoomLevel": 0,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "search.exclude": {
    "**/logs": true
  },
  "explorer.compactFolders": false,
  "vetur.validation.template": false,
  "minapp-vscode.disableAutoConfig": true,
  "git.suggestSmartCommit": false,
  // 解决vscode中tab键无效
  "emmet.syntaxProfiles": {
    "vue-html":"html",
    "vue":"html"
  },
  "diffEditor.ignoreTrimWhitespace": false,
  "terminal.integrated.tabs.enabled": true,
  "terminal.integrated.defaultProfile.linux": "bash",
  "workbench.editorAssociations": [
    {
      "viewType": "jupyter.notebook.ipynb",
      "filenamePattern": "*.ipynb"
    }
  ],
}

```
