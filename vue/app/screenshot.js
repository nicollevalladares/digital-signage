
var express = require("express")
const app = express()
const path = require('path')
const http = require('http')
const fs = require('fs')
const screenshot = require('screenshot-desktop')
var server = http.createServer(app);
var bodyParser = require("body-parser")
var cors = require('cors')

fs.exists('screenshot',function(exists){
  if(!exists)
      fs.mkdirSync('screenshot');
}) 

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(express.static(path.join(__dirname, 'screenshot')))

app.get('/', function (req, res) {
  screenshot({ filename: 'screenshot/actuallyScreen.png' }).then((imgPath) => {
    res.sendFile(path.join(__dirname, './screenshot', 'actuallyScreen.png'))
  })
})

server.listen(80, function () {
   console.log('Screenshot ready');
})



