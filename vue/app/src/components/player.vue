<template>
  <div id="div-player" >
    <video v-show="this.visiblePlayer1" id='player' width="100%"  height="100%" ></video> 
    <video v-show="this.visiblePlayer2" id='player2' width="100%"  height="100%" ></video> 
    <img v-show="this.visibleImagenViewer" id="img" width="100%"  height="100%">
    <marquee/>
  </div>
</template>

<script>
import axios from 'axios'
import {mixin as VueTimers} from 'vue-timers'
import { mapActions, mapState } from 'vuex'
import marquee from './Marquee'


export default {
  mixins: [VueTimers],
  name: 'Player',
     components: {
        marquee
    },
  data(){
    return {
      playList : [],
      defaultVideo : [],
      currrentFile : 0,
      videoPlayer : null,
      videoPlayer2 : null,
      imagenPlayer : null,
      mediaPlaying : null ,//0 when is playing a video, 1 when is showing a picture
      nextVideo : false,
      playerUsed : 0, //1 player1, 2 player2
      visiblePlayer1 : true,
      visiblePlayer2 : true,
      visibleImagenViewer :true
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
    ...mapActions(['getUUID']),
    playNextFile : function (){
        if (this.playList.length ==1){
            if(this.mediaPlaying == 0){
               this.videoPlayer.play();
            }
        }else{
          if (this.playList[this.currrentFile].type == 'mp4'){
            this.mediaPlaying = 0;
            if (this.playerUsed == 1){
              this.visibleImagenViewer = false;
              this.visiblePlayer1 = false;
              this.visiblePlayer2 = true;
              this.videoPlayer2.play();
              this.playerUsed = 2;
            }else{
              this.visibleImagenViewer=false;
              this.visiblePlayer2 =false;
              this.visiblePlayer1 = true;
              this.videoPlayer.play();
              this.playerUsed = 1;
            }
          }else{
              this.mediaPlaying = 1;
              // this.imagenPlayer.style.display = 'none'; 
              this.visiblePlayer1 = false;
              this.visiblePlayer2 = false;
              this.imagenPlayer.src = this.playList[this.currrentFile].url;
              this.visibleImagenViewer = true;
          }
      }
        this.waitingFinish();    
    },
   
    waitingFinish : function (){
    //incremnt next media
      if (this.currrentFile >= (this.playList.length-1))
          this.currrentFile=0;
        else 
           this.currrentFile++;
      //load next file if it's video
      if (this.playList[this.currrentFile].type == 'mp4'){
          if (this.playerUsed == 1)
             this.videoPlayer2.src = this.playList[this.currrentFile].url;
          else
              this.videoPlayer.src = this.playList[this.currrentFile].url;
      }
      // console.log('Waiting to finish actually file');
      if (this.mediaPlaying == 0){
        if (this.playerUsed == 1){
          this.videoPlayer.onended =  this.playNextFile;
          this.videoPlayer.onerror =  this.playNextFile;
        }else if (this.playerUsed == 2){
          this.videoPlayer2.onended =  this.playNextFile;
          this.videoPlayer2.onerror =  this.playNextFile;
        }
      }else if (this.mediaPlaying == 1){
          this.$options.interval= setTimeout(this.playNextFile, 5000);
      }
    },

    playDefaultVideo : function (){
       if (this.defaultVideo.length>=1){ 
            if (this.defaultVideo[0].type == 'mp4'){                    
              this.videoPlayer.src = this.defaultVideo[0].url;
              this.imagenPlayer.style.display = 'none';
              this.videoPlayer.play();
              this.videoPlayer.onended =  this.loopDefaultVideo;
              this.videoPlayer.onerror =  this.loopDefaultVideo;
            } 
        }else{
            this.$router.push({name: 'AddScreen'})
        }
    },

    loopDefaultVideo : function (){
        this.videoPlayer.src = this.defaultVideo[0].url;
        this.imagenPlayer.style.display = 'none';
        this.videoPlayer.play();
    },

    startPlaylist : function (){   
        // console.log('Iniciando playlist');
        this.videoPlayer = document.getElementById('player');
        this.videoPlayer2 = document.getElementById('player2');  
        this.videoPlayer.muted = true; 
        this.videoPlayer2.muted = true; 
        this.imagenPlayer = document.getElementById('img'); 
      //get media from FTPserver
       axios.get("http://127.0.0.1:3333/playlist")
                .then(response => {
                    // console.log(response.data.data);
                    this.playList = response.data.data;  
                    //get default video
                     axios.get("http://127.0.0.1:3333/defaultVideo")
                          .then(response => {
                               this.defaultVideo = response.data.data;   
                                // start playing media
                                if (this.playList.length>=1){ 
                                    if (this.playList[this.currrentFile].type == 'mp4'){    
                                      this.mediaPlaying = 0;                  
                                      this.videoPlayer.src = this.playList[this.currrentFile].url;
                                      this.visibleImagenViewer = false;
                                      this.visiblePlayer2 = false;
                                      this.visiblePlayer1 = true;
                                      this.videoPlayer.play();
                                      this.playerUsed = 1;
                                    } else {
                                      //show images
                                      this.mediaPlaying = 1;   
                                      this.visiblePlayer1 = false;
                                      this.visiblePlayer2 = false;
                                      this.imagenPlayer.src = this.playList[this.currrentFile].url;
                                      this.visibleImagenViewer = true;
                                    }
                                    this.waitingFinish();
                                } else {
                                   this.playDefaultVideo();
                                }
                          })
                          .catch(err => {

                          }) 
                    //socket to listen changes in playlist
                    // this.sockets.subscribe(this.idScreen.toString(), (data) => {
                      
                    // })
                })
                .catch(err => {
                    this.$router.push({name: 'AddScreen'});
                })
    }
  },
  mounted(){
    this.$options.interval = setTimeout(this.startPlaylist, 1000);
    console.log('UUID: '+ this.uuid);
    
  },
  computed: {
    ...mapState(['uuid'])
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
