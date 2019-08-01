<template>
  <div id="div-yt">
       <!-- <vytia-player 
          :ytid=" this.youtubeUserConfig.ytVideoId"
          :playerVars ="{
            'listType': this.youtubeUserConfig.type, 
            'list': this.youtubeUserConfig.list,
            'controls': 0,
            'autoplay' : 1,
            'modestbranding': 0,
            'iv_load_policy': 3,
            'showinfo': 0,
            'origin' : 'file://'
            }" 
            :width ="this.$vssWidth" 
            :height="this.$vssHeight"
             >
        </vytia-player>  -->
         <!-- <iframe ref="frame" id="player" type="text/html" :width="this.$vssWidth" :height="this.$vssHeight"
            src="http://www.youtube.com/embed?autoplay=1&controls=0&enablejsapi=1&modestbranding=0&iv_load_policy=0&version=3&showinfo=0&listType=playlist&list=RDRK1K2bCg4J8"
            frameborder="0" /> -->
            <video autoplay id="vid"></video>
      <marquee v-if="this.marqueeActive"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueScreenSize from 'vue-screen-size'
import marquee from './Marquee'
import {mixin as VueTimers} from 'vue-timers'
import screenshot from 'electron-screenshot'
import { desktopCapturer }  from 'electron'
import { log } from 'util';

export default {
    name: 'Youtube',
    mixins: [VueScreenSize.VueScreenSizeMixin, VueTimers],
      components: {
        marquee
    },
    data(){
        return {
      
        }
  },
  sockets: {

    },
  methods :{
    //  ...mapActions(['getScreenInfo']),
    //  onPlayerReady () {
    //   // this.$refs.yt.player.playVideo();
    // }

   handleStream : function(stream) {
      console.log('rec stream');
       const video = document.getElementById('vid')
       video.srcObject = stream
       video.onloadedmetadata = (e) => video.play()
       console.log(stream);
      
    },

    handleError (e) {
      console.log(e)
  }   
  },
   computed: {
      ...mapState(['youtubeUserConfig','key', 'marqueeActive'])
  },
  created(){
      this.sockets.subscribe(this.key.key.toString(), (data) => {
             if (data.type=='general'){
                this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key})
               if(data.data.appSelected != 'Youtube')
                  this.sockets.unsubscribe(this.key.key.toString());
            }
        })
    
    setTimeout(function(){
      console.log('play');
      var that = this;
        desktopCapturer.getSources({ types:['window', 'screen'] }, async function(error, sources) {
          for (let source of sources) {
            console.log("Name: " + source.name);
            console.log("Name: " + source.id);
            if (source.name === 'own-vue-sol') {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  audio: false,
                  video: {
                    mandatory: {
                      chromeMediaSource: 'desktop',
                      chromeMediaSourceId: source.id,
                      minWidth: 1280,
                      maxWidth: 1280,
                      minHeight: 720,
                      maxHeight: 720
                    }
                  }
                })
                console.log(stream);
                const video = document.getElementById('vid')
                video.srcObject = stream
                video.onloadedmetadata = (e) => video.play()
                          
                // handleStream(stream)
              } catch (e) {
                handleError(e)
              }
            }
          }
        });
      // desktopCapturer.getSources({ types: ['window', 'screen'] }, function(sources){
      //   console.log(sources);
        
      // })
      // desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      //   console.log(sources);
        // for (const source of sources) {
        //   if (source.name === 'Electron') {
        //     try {
        //       const stream = await navigator.mediaDevices.getUserMedia({
        //         audio: false,
        //         video: {
        //           mandatory: {
        //             chromeMediaSource: 'desktop',
        //             chromeMediaSourceId: source.id,
        //             minWidth: 1280,
        //             maxWidth: 1280,
        //             minHeight: 720,
        //             maxHeight: 720
        //           }
        //         }
        //       })
        //       that.handleStream(stream)
        //     } catch (e) {
        //       handleError(e)
        //     }
        //     return
        //   }
        // }
      // })
    },2000)
  }
}

</script>

<style scoped>
 /* vytia-player{
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
 } */
 #div-yt {
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
