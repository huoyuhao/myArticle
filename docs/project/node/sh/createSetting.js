/**
 * 创建blog配置目录
 */
let http = require("http")
let fs = require("fs")
let server = http.createServer()

const dirPath = "/data/myArticle/docs/"
const dirList = ['html', 'js', 'linux', 'network', 'tool', 'vue']
const reg = /(?<=[0-9]+\-)(.*)(?=\.md)/ig
const result = {};

dirList.forEach(item => {
  const path = dirPath + item
  const readDir = fs.readdirSync(path)
  result[`/${item}/`] = []
  readDir.forEach((name, index) => {
    if (/\.+/.test(name)) { // 文件
      if (reg.test(name)) {
        const [fileName] = name.match(reg)
        result[`/${item}/`].push({ title: fileName, path: `/${item}/${name}` })
      }
    } else { // 文件夹
      const childPath = dirPath + item + '/' + name
      const childDir = fs.readdirSync(childPath)
      const parentData = { title: name, sidebarDepth: 2, path: `/${item}/${name}/`, children: [] }
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