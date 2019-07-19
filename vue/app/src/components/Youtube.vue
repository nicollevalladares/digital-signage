<template>
  <div id="div-yt">
       <vytia-player :playerVars ="playerVars" :width ="this.$vssWidth" :height="this.$vssHeight" @ready="onPlayerReady"></vytia-player> 
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import VueScreenSize from 'vue-screen-size'
import {mixin as VueTimers} from 'vue-timers'
import { setInterval, setImmediate } from 'timers';
// import VueYoutube from 'vue-youtube'

export default {
    name: 'Youtube',
    mixins: [VueTimers,VueScreenSize.VueScreenSizeMixin],
    components: {
        
    },
    data(){
        return {
            videoId: 'lG0Ys-2d4MA',
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 0,
                iv_load_policy: 0,
                showinfo: 0,
                version: 3,
                listType: null,
                list: null,
                origin : 'http://sigange.dev.hn',
                rel : 0,
                loop: 1
            },
            userConfig : {
              type: 'playlist' ,//can be a video, playlist, search, user_videos
              videoId: 'lG0Ys-2d4MA',
              list : 'RDRK1K2bCg4J8',
              fullScreen : true,
              loop : 1
            },
            ready :false
        }
  },
   methods: {
     startPlay : function (){
        this.playerVars.listType = this.userConfig.type;
        this.playerVars.list = this.userConfig.list;
        this.playerVars.loop = this.userConfig.loop;
        this.ready =true;
        // console.log(this.playerVars);
    },
     onPlayerReady () {
      // you have access to the ref here
      // this.$refs.yt.player.playVideo();
        // console.log('paaa');
 
      // you can see the full list of methods available here
      // https://developers.google.com/youtube/iframe_api_reference?hl=fr#Playback_controls
    }
  },
  async created(){
    this.$options.interval = await setImmediate(this.startPlay);
    while (!this.ready) {
      console.log('Waiting configuration');
    }
    // this.$options.interval = setInterval(this.prueba, 1000);
  },
  mounted (){
    console.log('montado');
  },
   computed: {
      ...mapState(['screen'])
  }
}

</script>

<style scoped>
 vytia-player{
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
 }
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
