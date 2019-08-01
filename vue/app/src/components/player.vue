<template>
  <div id="div-player" >
    <video v-show="this.visiblePlayer1" id='player' width="100%"  height="100%" ></video>
    <video v-show="this.visiblePlayer2" id='player2' width="100%"  height="100%" ></video>
    <img v-show="this.visibleImagenViewer" id="img" width="100%"  height="100%">
    <marquee v-if="this.marqueeActive"/>
  </div>
</template>

<script>
import axios from 'axios'
import {mixin as VueTimers} from 'vue-timers'
import { mapActions, mapState } from 'vuex'
import marquee from './Marquee'
import dl from 'download-file-with-progressbar'
import servers from '../serverConfig.json'
import screenshot from 'electron-screenshot'


export default {
  mixins: [VueTimers],
  name: 'Player',
     components: {
        marquee
    },
  data(){
    return {
      playList : [],  // playlist media array
      defaultVideo : [],  //defaultVideos array
      currrentFile : 0,  //media actually
      videoPlayer : null,  //video player 1 element
      videoPlayer2 : null, //video player 2 element
      imagenPlayer : null, // imagen element
      mediaPlaying : null ,//0 when is playing a video, 1 when is showing a picture
      playerUsed : 0, //1 player1, 2 player2
      visiblePlayer1 : true, //show or hide player1
      visiblePlayer2 : true, //show or hide player2
      visibleImagenViewer :true, //show o hide imagenViewer
      updatingPlaylist : false,  //notify when playlist is updating
      totalFiles : 0,
      actuallyFileDownloading : 0,
      newFiles : [],
      playingDefaultVideo : false
    }
  },
    sockets: {

    },
  methods: {
    ...mapActions(['getUUID', 'getScreenInfo']),

    playNextFile : function (){
      if (!this.updatingPlaylist){
        if (this.playList.length ==1){
            if(this.mediaPlaying == 0){
               this.videoPlayer.play();
            }
        }else{
          if (this.playList[this.currrentFile].type == 'mp4'){
            this.mediaPlaying = 0;
            if (this.playerUsed == 1){
              this.showMedia (false, true, false);
              this.videoPlayer2.play();
              this.playerUsed = 2;
            }else{
              this.showMedia (true, false, false);
              this.videoPlayer.play();
              this.playerUsed = 1;
            }
          }else{
              this.mediaPlaying = 1;
              this.showMedia(false, false, true);
              this.imagenPlayer.src = this.playList[this.currrentFile].url;
          }
        }
        this.waitingFinish();
      }else{
         if (this.defaultVideo.length>=1){
           this.showMedia(true, false , false);
           this.videoPlayer.src = this.defaultVideo[0].url;
           this.videoPlayer.play();
           this.playerUsed = 1;
            // this.playDefaultVideo();
           this.loopDefaultVideo();
           this.startDownload();

         }else{
            this.$router.push({name: 'AddScreen'})
         }
      }
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
          this.$options.interval= setTimeout(this.playNextFile, this.imagesDuration * 1000 || '10000');
      }
    },

    playDefaultVideo : function (){
      this.playingDefaultVideo = true;
      if (!this.updatingPlaylist){
        // this.updatingPlaylist = true;
          //aqui ya se actualizó
          this.startPlaylist();

      }else {
       if (this.defaultVideo.length>=1){
            if (this.defaultVideo[0].type == 'mp4'){
              if (this.playerUsed == 1){
                this.showMedia(false, true, false);
                this.videoPlayer2.play();
                this.playerUsed = 2;
              }else {
                this.showMedia(true, false, false);
                this.videoPlayer.play();
                this.playerUsed = 1;
              }
            }
            this.loopDefaultVideo();
        }else{
           if(navigator.onLine) {
                  this.$router.push({name: 'AddScreen'})
            } else 
              this.$router.push({name: 'Error'})
        }
      }
    },

    loopDefaultVideo : function (){
      if (this.playerUsed == 1){
        this.videoPlayer2.src = this.defaultVideo[0].url;
      }else{
        this.videoPlayer.src = this.defaultVideo[0].url;
      }
      if (this.playerUsed == 1){
        this.videoPlayer.onended =  this.playDefaultVideo;
        this.videoPlayer.onerror =  this.playDefaultVideo;
      }else{
        this.videoPlayer2.onended =  this.playDefaultVideo;
        this.videoPlayer2.onerror =  this.playDefaultVideo;

      }
    },
    showMedia(player1, player2, viewer){
        this.visiblePlayer1 = player1;
        this.visiblePlayer2 = player2;
        this.visibleImagenViewer = viewer;
    },
    startPlaylist : function (){
        // console.log('Iniciando playlist');
        this.playingDefaultVideo = false;
        this.videoPlayer = document.getElementById('player');
        this.videoPlayer2 = document.getElementById('player2');
        this.imagenPlayer = document.getElementById('img');
        this.videoPlayer.muted = true;
        this.videoPlayer2.muted = true;
      //get media from FTPserver
       axios.get(`${servers.FTPServer}/playlist`)
                .then(response => {
                    // console.log(response.data.data);
                    this.playList = response.data.data;
                    //get default video
                     axios.get(`${servers.FTPServer}/defaultVideo`)
                          .then(response => {
                               this.defaultVideo = response.data.data;
                                // start playing media
                                if (this.playList.length>=1){
                                    if (this.playList[this.currrentFile].type == 'mp4'){
                                      this.mediaPlaying = 0;
                                      this.videoPlayer.src = this.playList[this.currrentFile].url;
                                      this.showMedia (true, false, false);
                                      this.videoPlayer.play();
                                      this.playerUsed = 1;
                                    } else {
                                      //show images
                                      this.mediaPlaying = 1;
                                      this.imagenPlayer.src = this.playList[this.currrentFile].url;
                                      this.showMedia (false, false, true);
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
    },
    startDownload (){
      //downloading
      this.actuallyFileDownloading = 0;
      console.log('downloading files');
      this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key});
       axios.post(`${servers.mainServer}/screens`, {
        idScreen: this.key.key
      })
      .then(response => {
        this.newFiles = response.data.data.files; 
        var files =  response.data.data.files;
        axios.post(`${servers.FTPServer}/deleteAll`,{
           newFiles : files
        }).then(response => {
          console.log(respose);  
        })
        console.log(this.newFiles);
         this.downloadNextFile();    
      })
      .catch(error => {
          console.log(error)
      })
    },
    downloadNextFile() {
      if (this.actuallyFileDownloading <= (this.newFiles.length-1)) {
         axios.get(`${servers.FTPServer}/exist/${this.newFiles[this.actuallyFileDownloading].dataName}`)
         .then(response => {
            // console.log(response);
             if (response.data.code != 1){
                 var option = {
                  filename: this.newFiles[this.actuallyFileDownloading].dataName,
                  dir: 'files/files/',
                  onDone: (info)=>{
                    console.log('file downloaded'); 
                    this.actuallyFileDownloading++;
                    this.downloadNextFile();     
                  },
                  onError: (err) => {
                    console.log('error', err); 
                    axios.delete(`${servers.FTPServer}/delete/${this.newFiles[this.actuallyFileDownloading].dataNam}`)
                    .then(res =>{
                        console.log(res);
                    });
                    this.downloadNextFile();   
                  },
                  onProgress: (curr, total) => {
                     let progress = (curr / total * 100).toFixed(2);
                     console.log(progress);    
                  }
                } 
                dl(this.newFiles[this.actuallyFileDownloading].url, option);
             }else{
                // console.log('file exist, no downloaded'); 
                this.actuallyFileDownloading++;
                this.downloadNextFile();   
             }
          })
          .catch(error => {
              console.log(error)
          })
        
        }else{
          console.log('update complete');
          this.updatingPlaylist = false;
          // this.startPlaylist();
        }  
    }
  },
  mounted(){
    this.$options.interval = setTimeout(this.startPlaylist, 1000);
  },
  computed: {
    ...mapState(['uuid', 'key' ,'imagesDuration', 'idPlaylist', 'marqueeActive'])
  },
  created(){
     this.sockets.subscribe(this.idPlaylist, (data) => {
        if (!this.playingDefaultVideo){
            console.log('Playlist Updated');
            this.updatingPlaylist=true;
        }
      }),
      this.sockets.subscribe(this.key.key.toString(), (data) => {
        console.log('Socket general: '+ data.type);

            if (data.type=='screenshot'){
              console.log('Haciendo petición de captura a ftp server');
              
                // axios.get(`${servers.FTPServer}/screenshot`).then(response=>{
                //     console.log(res);  
                // })
                 var options = {
                    filename : 'cap.png'
                  }
                  screenshot(options, (res)=>{
                    console.log(res); 
                  })
             }
             if (data.type=='general'){
                this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key})
               if(data.data.appSelected != 'DownloadFiles')
                  this.sockets.unsubscribe(this.key.key.toString());
             }
      })
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
    display: flex;
    justify-content: center;
    align-items: center;
 }
</style>
