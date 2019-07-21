<template>
    <div id="marquee" 
        :style="
        `background-color: ${this.marquee.backgroundColor}; 
        color: ${this.marquee.fontColor};
        font-family: ${this.marquee.fontFamily};
        font-size:  ${this.marquee.fontSize};
        `
        ">
        <marquee-text>
            {{this.marquee.news}}
        </marquee-text>
        <div v-if="this.marquee.time" id='clock'
        :style="
        `background-color:  ${this.marquee.timeConf.backgroundColor}; 
        color: ${this.marquee.timeConf.fontColor};
        font-size: ${this.marquee.timeConf.fontSize};
        left: ${this.marquee.timeConf.left};
        right: ${this.marquee.timeConf.right}
        `
        ">
           {{time}}
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MarqueeText from 'vue-marquee-text-component'
import moment from 'moment'
import {mixin as VueTimers} from 'vue-timers'

export default {
    name: 'Marquee',
    mixins: [],
    components: {
        MarqueeText
    },
    data(){
        return {
            time : moment().format('LT')
        }
  },
  methods: {
      updateTime(){
          this.time =  moment().format('LT');
      }
  },
   computed: {
      ...mapState(['youtubeUserConfig','marquee'])
  },
  created(){
        this.$options.interval = setInterval(this.updateTime, 1000);
  }
}

</script>

<style scoped>
 #marquee{
        position: fixed;
        overflow: hidden;
        margin: 0;
        padding: 7px 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 5vh;
}
#clock {
    position: absolute;
    bottom: 0;
    padding: 7px;
    border-radius: 2px;
    height: 5vh;
}
</style>
