<template>
  <div id="div-yt">
       <vytia-player 
          :ytid=" this.youtubeUserConfig.ytVideoId"
          :playerVars ="{
            'listType': this.youtubeUserConfig.type, 
            'list': this.youtubeUserConfig.list,
            'controls': 0,
            'autoplay' : 1,
            'modestbranding': 0,
            'iv_load_policy': 3,
            'showinfo': 0
            }" 
            :width ="this.$vssWidth" 
            :height="this.$vssHeight"
             >
        </vytia-player> 
         <!-- <iframe ref="frame" type="text/html" width="500" height="300"
            src="http://www.youtube.com/embed?autoplay=1&controls=0&enablejsapi=1&modestbranding=0&iv_load_policy=0&version=3&showinfo=0&listType=playlist&list=RDRK1K2bCg4J8"
            frameborder="0" />  -->
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
import axios from 'axios'
import { setTimeout } from 'timers';

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
  },
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
