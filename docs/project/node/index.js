var express = require("express")
var app = express()


// cors 配置
// app.use('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*') //这个表示任意域名都可以访问，这样写不能携带cookie了。
//   // res.header('Access-Control-Allow-Origin', 'http://www.test.huoyuhao.net') //这样写，只有 www.test.huoyuhao.net 可以访问
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')//设置方法
//   if (req.method == 'OPTIONS') {
//     res.send(200) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
//   }
//   else {
//     next()
//   }
// })

app.get("/crossDomain", function(req, res) {
  var query = req.query
  var reqData = { name: 'liam' }
  console.log(query)
  if (query.callback) {
    var str =  query.callback + '(' + JSON.stringify(reqData) + ')' // jsonp
    res.end(str)
  } else {
    res.end(JSON.stringify(reqData))
  }
})
app.get("/crossDomain2", function(req, res) {
  var reqData = { name: 'liam' }
  res.end(JSON.stringify(reqData))
})

// 静态资源请求
app.use('/static', express.static('public'))



app.listen(3000, function() {
  console.log("App started on port 3000")
})