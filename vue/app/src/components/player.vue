<template>
  <div id="div-player" >
    <video id='player' width="100%" src="" height="100%" ></video> 
    <img id="img" width="100%" src="" height="100%">
  </div>
</template>

<script>
import axios from 'axios'
import { log } from 'util';
import fs from 'fs';
import {mixin as VueTimers} from 'vue-timers';

export default {
  mixins: [VueTimers],
  name: 'Player',
     components: {
    
    },
  data(){
    return {
      videoElement : null,
      playList : [],
      currrentFile : 0,
      videoPlayer : null,
      imagenPlayer : null,
      mediaPlaying : null //0 when is playing a video, 1 when is showing a picture
    }
  },
    sockets: {
        connect: function () {
            // console.log('socket connected')
        },
        customEmit: function (data) {
            // console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
  methods: {
    playNextFile : function (){
        if (this.currrentFile >= (this.playList.length-1))
          this.currrentFile=0;
        else 
           this.currrentFile++;

        if (this.playList.length ==1){
            if(this.mediaPlaying == 0){
               this.videoPlayer.play();
            }
        }else{
        if (this.playList[this.currrentFile].type == 'mp4'){
            this.mediaPlaying = 0;
            this.imagenPlayer.style.display = 'none';
            this.videoPlayer.style.display = 'block';
            this.videoPlayer.src = this.playList[this.currrentFile].url;
            this.videoPlayer.play();
        }else{
            this.mediaPlaying = 1;
            this.imagenPlayer.style.display = 'none'; 
            this.videoPlayer.style.display = 'none';
            this.imagenPlayer.src = this.playList[this.currrentFile].url;
            this.imagenPlayer.style.display = 'block'; 
        }
      }
        this.waitingFinish();
    },
   
    waitingFinish : function (){
      // console.log('Waiting to finish actually file');
      if (this.mediaPlaying == 0){
          this.videoPlayer.onended =  this.playNextFile;
          this.videoPlayer.onerror =  this.playNextFile;
      }else if (this.mediaPlaying == 1){
          this.$options.interval= setTimeout(this.playNextFile, 5000);
      }
    },

    startPlaylist : function (){
        console.log('Iniciando playlist');
        this.videoPlayer = document.getElementById('player'); 
        this.imagenPlayer = document.getElementById('img'); 
      //get media from FTPserver
       axios.get("http://127.0.0.1:3333/playlist")
                .then(response => {
                    console.log(response.data.data);
                    this.playList = response.data.data;   
                    // start playing media
                    if (this.playList.length>=1){ 
                        if (this.playList[this.currrentFile].type == 'mp4'){    
                          this.mediaPlaying = 0;                  
                          this.videoPlayer.src = this.playList[this.currrentFile].url;
                          this.imagenPlayer.style.display = 'none';
                          this.videoPlayer.play();
                        } else {
                          //show images
                          this.mediaPlaying = 1;   
                          this.videoPlayer.style.display = 'none';
                          this.imagenPlayer.src = this.playList[this.currrentFile].url;
                        }
                        this.waitingFinish();
                    }else {
                         axios.get("http://127.0.0.1:3333/defaultVideo")
                          .then(response => {
                              console.log(response);
                          })
                          .catch(err => {

                          })
                    }
                    //socket to listen changes in playlist
                    // this.sockets.subscribe(this.idScreen.toString(), (data) => {
                      
                    // })
                })
                .catch(err => {
                    console.log('Ha ocurrido un error, inténtelo nuevamente.');
                })
    }
  },
  mounted(){
    this.$options.interval = setTimeout(this.startPlaylist, 1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #div-player{
   top: 0;
   left: 0;
   position: absolute;
   overflow: hidden;
   max-height: 100%;
   min-height : 100%;
   max-width: 100%;
   min-width : 100%;
   background: black;
 }
</style>
