var express = require("express")
var app = express()

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

app.use('/static', express.static('public'))


app.listen(3001, function() {
  console.log("App started on port 3001")
})