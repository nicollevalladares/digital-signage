
var express = require("express")
const app = express()
const path = require('path')
const fs = require('fs')
const screenshot = require('screenshot-desktop')
app.use(express.static(path.join(__dirname, 'screenshot')))

fs.exists('screenshot',function(exists){
  if(!exists)
      fs.mkdirSync('screenshot');
}) 

app.get('/', function (req, res) {
  screenshot({ filename: 'screenshot/actuallyScreen.png' }).then((imgPath) => {
    res.sendFile(path.join(__dirname, './screenshot', 'actuallyScreen.png'))
  })
})

app.listen('80', function () {
   console.log('Screenshot ready');
})



