<template>
  <div>
    <h2>UUID: {{uuid}}</h2>
    <h2>prueba: {{prueba}}</h2>
    <h2>project: {{project}}</h2>
    <h2>appid: {{appid}}</h2>
    

  </div>
</template>

<script>
import axios from 'axios'
var download = require('download-file')
// function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

export default {
  name: 'LandingPage',
  data(){
    return {
      prueba: null,
      project: process.env.npm_package_productName || 'Only Available in Development Mode',
      projectver: process.env.npm_package_version || 'Only Available in Development Mode',
      projectdesc: process.env.npm_package_description || 'Only Available in Development Mode',
      projectmaintainer: process.env.npm_package_author_name || 'Only Available in Development Mode',
      uuid: process.env.RESIN_DEVICE_UUID || 'No UUID - Development Machine',
      appid: process.env.RESIN_APP_ID || 'No APPID - Development Machine',
      appname: process.env.RESIN_APP_NAME || 'No Data - Development Machine',
      devtype: process.env.RESIN_DEVICE_TYPE || 'No Data - Development Machine',
      osver: process.env.RESIN_HOST_OS_VERSION || 'No Data - Development Machine',
      node: process.versions.node,
    }
  },
  methods:{
    
  },
  created(){
    axios.get('http://connect.dev.hn/playlists')
    .then(response => {
      this.prueba = response + process.env.BALENA_DEVICE_UUID;
    })

  // var options = {
  //     // directory: "/home/benavidez25/Descargas/img",
  //     filename: "cat.gif"
  // }

  //   download("http://i.imgur.com/G9bDaPH.jpg", options, function(err){
  //     if (err) throw err
  //       console.log("meow") // eslint-disable-next-line
  //   }) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
