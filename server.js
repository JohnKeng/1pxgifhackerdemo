var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]


if(!port){
  console.log('請指定端口，例如：node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method


  console.log('得到 HTTP 路徑\n' + path)
  console.log('查詢字符串為\n' + query)
  console.log('不含查詢字符串的路徑為\n' + pathNoQuery)

  if(path == '/style'){
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  }else if(path == '/script'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("I am JS")')
    response.end()
  }else if(path == '/index' || path == '/'){
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'  + 
      '<head><link rel="stylesheet" href="/style">' +
      '</head><body>'  +
      '<h1>你好</h1>' +
      '<script src="/script"></script>' +
      '</body></html>')
    response.end()
  }else if(pathNoQuery == '/log.gif'){
    // 1px gif 
    var imgdata = [
        0x47,0x49, 0x46,0x38, 0x39,0x61, 0x01,0x00, 0x01,0x00, 0x80,0x00, 0x00,0xFF, 0xFF,0xFF,
        0x00,0x00, 0x00,0x21, 0xf9,0x04, 0x04,0x00, 0x00,0x00, 0x00,0x2c, 0x00,0x00, 0x00,0x00,
        0x01,0x00, 0x01,0x00, 0x00,0x02, 0x02,0x44, 0x01,0x00, 0x3b
      ]
    var imgbuf = Buffer.from(imgdata)

    console.log( 'quert: ' + query)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'image/gif')
    response.setHeader('Content-Type', imgdata.length)
    response.end(imgbuf)
  }
  else{
    response.statusCode = 404
    response.end()
  }



})

server.listen(port)
console.log('監聽中 ' + port + ' 成功\n伺服器已啟動 http://localhost:' + port)


