<template>
  <div id="div-yt">
       <vytia-player 
       autoplay 
       :ytid=" this.youtubeUserConfig.ytVideoId"
       :playerVars ="{
        'listType': this.youtubeUserConfig.type, 
        'list': this.youtubeUserConfig.list,
        'controls': 0,
        'modestbranding': 0,
        'iv_load_policy': 3,
        'showinfo': 0
        }" 
        :width ="this.$vssWidth" 
        :height="this.$vssHeight"
        ref="yt" >
        <marquee v-if="this.marqueeActive"/>
        </vytia-player> 
        <!-- <iframe id="player" type="text/html" :width="this.$vssWidth" :height="this.$vssHeight"
        src="https://www.youtube.com/embed?autoplay=1&listType=playlist&list=RDRK1K2bCg4J8"
        frameborder="0"></iframe> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueScreenSize from 'vue-screen-size'
import marquee from './Marquee'


export default {
    name: 'Youtube',
    mixins: [VueScreenSize.VueScreenSizeMixin],
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
     onPlayerReady () {
      this.$refs.yt.player.playVideo();
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
            console.log(this.$refs.yt);
            
    })
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
