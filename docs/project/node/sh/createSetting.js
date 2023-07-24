/**
 * 创建blog配置目录
 */
let http = require("http")
let fs = require("fs")
let server = http.createServer()

const dirPath = "/Users/huoyuhao/Desktop/code/github/myArticle/docs/"
const dirList = ['web', 'linux', 'network', 'other', 'frame']
const reg = /(?<=[0-9]+\-)(.*)(?=\.md)/ig
const regFile = /(?<=[0-9]+?\-)(.*)/ig
const result = {};

dirList.forEach(item => {
  const path = dirPath + item
  const readDir = fs.readdirSync(path)
  result[`/${item}/`] = []
  readDir.forEach((name) => {
    if (/\.+/.test(name)) { // 文件
      if (reg.test(name)) {
        const [fileName] = name.match(reg)
        result[`/${item}/`].push({ title: fileName, path: `/${item}/${name}` })
      }
    } else { // 文件夹
      const childPath = dirPath + item + '/' + name
      const childDir = fs.readdirSync(childPath)
      const [fileName] = name.match(regFile);
      const parentData = { title: fileName, sidebarDepth: 2, children: [] }
      result[`/${item}/`].push(parentData)
      childDir.forEach(child => {
        if (/\.+/.test(child)) { // 文件
          if (reg.test(child)) {
            const [fileName] = child.match(reg)
            parentData.children.push({ title: fileName, path: `/${item}/${name}/${child}` })
          }
        }
      })
    }
  })
})
console.log('\n\n')
console.log(JSON.stringify(result))
console.log('\n\n')