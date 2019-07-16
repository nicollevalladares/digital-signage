var express = require("express")
var cors = require('cors')
const app = express()
var bodyParser = require("body-parser")
const http = require('http')
var server = http.createServer(app);
const path = require('path')

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(path.join(__dirname, 'files')))

//http://127.0.0.1:3331/uuid ------get
app.get('/uuid', function (req, res) {
  res.send(process.env.RESIN_DEVICE_UUID || 'No UUID-Development machine')
})


//delete a file
app.delete('/delete/:name', function (req, res) {
  //delete a file
})

//get list of files in storage
app.get('/list', function (req, res) {
  //delete a file
})


server.listen('3333', function () {
  console.log('Server successfully running at 3331 port');
})

