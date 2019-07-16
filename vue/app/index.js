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

app.get('/uuid', function (req, res) {
  res.send(process.env.RESIN_DEVICE_UUID || 'No UUID-Development machine')
})


server.listen('3331', function () {
  console.log('Server successfully running at 3331 port',);
})

