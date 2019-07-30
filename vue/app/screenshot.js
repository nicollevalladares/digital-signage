
var express = require("express")
// var cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs')
const screenshot = require('screenshot-desktop')
// app.use(cors())

app.use(express.static(path.join(__dirname, 'screenshot')))
// app.use('screenshot/',express.static(__dirname+"screenshot/"));

//create folder to save media files
fs.exists('screenshot',function(exists){
  if(!exists)
      fs.mkdirSync('screenshot');
}) 

app.get('/', function (req, res) {
  // res.send(process.env.RESIN_DEVICE_UUID || 'No UUID-Development machine')
  var name = process.env.RESIN_DEVICE_UUID +'_'+ Date.now();
  screenshot({ filename: 'screenshot/actuallyScreen.png' }).then((imgPath) => {
    res.sendFile(path.join(__dirname, './screenshot', 'actuallyScreen.png'))
  })
})

app.listen('8082', function () {
  // console.log('Screenshot ready');
})



