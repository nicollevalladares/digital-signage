var express = require("express")
var cors = require('cors')
const app = express()
var bodyParser = require("body-parser")
const http = require('http')
var server = http.createServer(app)
const path = require('path')
const fs = require('fs')
const rimraf = require("rimraf");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(path.join(__dirname, 'files')))

//create folder to save media files
fs.exists('files',function(exists){
  if(!exists)
      fs.mkdirSync('files');
}) 

fs.exists('files/defaultVideo',function(exists){
  if(!exists)
      fs.mkdirSync('files/defaultVideo');
}) 

fs.exists('files/files',function(exists){
  if(!exists)
      fs.mkdirSync('files/files');
}) 


//http://127.0.0.1:3331/uuid ------get
app.get('/uuid', function (req, res) {
  res.send(process.env.RESIN_DEVICE_UUID || 'No UUID-Development machine')
})

//get list of files in storage
app.get('/playlist', function (req, res) {
  var data = [];
  //reading videos folder
   try {
      fs.readdir('files/files/', function(err, files) {
        if (err) 
          return res.json ({code : 0, data : 'No directory found.'})
      files.forEach(file => {
        if (file.indexOf(".mp4") > -1)
          data.push({name: file , url : 'http://127.0.0.1:3333/files/'+file, type :'mp4'})
        else 
            data.push({name: file , url : 'http://127.0.0.1:3333/files/'+file, type :'img'})
      })
      res.json ({code : 1 , data : data})    
    })
   } catch (error) {
      return res.json ({code : 0, data : 'An error ocurred'})
   }
})


//get defaultVIdeo
app.get('/defaultVideo', function (req, res) {
  var data = [];
   try {
      fs.readdir('files/defaultVideo/', function(err, files) {
        if (err) 
          return res.json ({code : 0, data : 'No directory found.'})
      files.forEach(file => {
        if (file.indexOf(".mp4") > -1)
          data.push({name: file , url : 'http://127.0.0.1:3333/defaultVideo/'+file, type :'mp4'})
      })
      res.json ({code : 1 , data : data})    
    })
   } catch (error) {
      return res.json ({code : 0, data : 'An error ocurred'})
   }
})

// delete a file
app.delete("/delete/:fileName",function(req,res){
    var fileName = req.params.fileName
    try {
      fs.unlink('files/files/'+fileName, (error)=>{
        if (error)
            return res.json ({code : 0 , message : 'An error occurred while deleting the file or it may no longer exist.'})
        return res.json ({code : 1 , message : 'File deleted'})
    })
    } catch (error) {
        return res.json ({code : 0 , message : 'An error occurred while deleting the file or it may no longer exist.'})
    }
})

//file exist?
app.get("/exist/:fileName",function(req,res){
var fileName = req.params.fileName
  try {
    fs.exists('files/files/'+fileName,function(exists){
      if(!exists)
          return res.json ({code : 0 , message : 'File no exist.'})
      return res.json ({code : 1 , message : 'File exist.'})  
    })
  } catch (error) {
    return res.json ({code : 0 , message : 'An error occurred '})  
  }
})

// delete a defaultVideo
app.delete("/deleteDefaultVideo",function(req,res){
  rimraf("files/defaultVideo", function (err) { 
      if (err)
        return res.json ({code : 0 , message : 'An error occurred while deleting the file or it may no longer exist.'})
      fs.exists('files/defaultVideo',function(exists){
        if(!exists)
            fs.mkdirSync('files/defaultVideo');
            return res.json ({code : 1 , message : 'DefaultVideo deleted.'}) 
     })      
  })
})

server.listen('3333', function () {
  console.log('FTP Server running');
})


