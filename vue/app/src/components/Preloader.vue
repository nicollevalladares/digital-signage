<template>
  <div id="wrapper">
    <div v-if="state" class="loader">
      <svg viewBox="0 0 334.04 361.77">
        <path id="fLeft" d="M713.68,275a21.19,21.19,0,0,1-1,16.2c-9.33,19.06-34.25,70.17-45.43,95.09-4.48,10-2.65,14.68,7.2,19.66C705.51,421.68,793,465.2,804.52,473.4c5.87,4.2,9.58,10,12.65,16.18,0,0,21,43.23,31.5,65.16,3.86,8-4.77,12-9.62,9.51L581,434.62c-4.13-2.33-6-7.66-3.91-13.46L678,206.5c2.75-3.94,8.84-2.46,10.7,2.16C688.67,208.66,706.83,254.92,713.68,275Z" transform="translate(-516.1 -203.73)"/>
        <path id="fRight" d="M527.65,562.4a7.75,7.75,0,0,1-10.89-8.56c1.06-5.26,31.19-68.58,42.72-95.76,2.69-6.35,7.77-8.63,13.93-5.56q36.09,18,72,36.46c6.1,3.14,5.56,9.9,1.45,12.39C646.83,501.37,541.56,555.89,527.65,562.4Z" transform="translate(-516.1 -203.73)"/>
      </svg>
      <h1 class="name">{{name}}</h1>
    </div>
  </div>
</template>

<script>
const isReachable = require('is-reachable')
import ProgressBar from 'progressbar.js'
import router from '../router'
import axios from 'axios'

  export default {
    name: 'preloader',
    components: {
    },
    data() {
      return {
          name : '',
          state: true,
          screen: false
      }

    },
    methods: {
    },
    mounted(){
      let playlistProgress = new ProgressBar.Path('#fLeft', {
        // strokeWidth: 0.6,
        // easing: 'easeInOut',
        duration: 5000,
        // from: { color: '#fff '},
        // to: { color: '#e21e30 '},
        // color: '#ffffff',
        // trailColor: '#fff',
        // trailWidth: 0.5,
        // svgStyle: null
      });
      let playlistProgress2 = new ProgressBar.Path('#fRight', {
        // strokeWidth: 0.6,
        // easing: 'easeInOut',
        duration: 5000,
        // from: { color: '#fff '},
        // to: { color: '#e21e30 '},
        step: (state, bar, attachment) => {
          if(state.offset == 0){
            document.querySelector('.loader').classList.add('finished');
            this.name = 'DIGITAL SIGNAGE'
            setTimeout(()=>{
              isReachable(['beanar.io', 'https://canihazip.com', 'https://www.bancatlan.hn', 'https://dashboard.resin.io', 'https://status.resin.io']).then(reachable => {
                axios.get("http://localhost:3333/uuid")
                .then(response => {
                    // console.log(response.data);
                    var uuid = response.data
                    axios.get("http://192.168.100.89:3331/screens")
                    .then(response => {
                      // console.log(response.data);
                      response.data.forEach(doc => {
                        console.log(doc.uuid);
                        if(doc.uuid == uuid){
                          console.log('prueba');
                          this.state = false;
                          this.$router.push({name: 'Player'});
                          this.screen = true
                        }
                      })

                      console.log('salio');
                    })

                    if(this.screen == false){
                      this.state = false;
                      this.$router.push({name: 'AddScreen'})
                    }
                })
                .catch(err => {
                  console.log(err);
                })
                // console.log(reachable);
                // if (!reachable) {
                // //   this.$router.push({name: 'offline-screen'})
                //   this.state = false;
                //   this.$router.push({name: 'AddScreen'})
                //     // window.location ='/'
                // } else {
                //   this.state = false;
                //   this.$router.push({name: 'AddScreen'})
                //     //    window.location ='/landingPage'
                // }
              });
            },2000)
          } else {
          }
        },
        // color: '#ffffff',
        // trailColor: '#fff',
        // trailWidth: 0.5,
        svgStyle: null
      });
      playlistProgress.set(0);
      playlistProgress2.set(0);
      playlistProgress.animate(1,{});
      playlistProgress2.animate(1);
    },
    destroyed(){
    }
  }
</script>

<style>
.name {
    color: white;
    font-weight: bold;
    margin-top: -50px;
    font-size: 3rem;
    letter-spacing: 10px;
}
.loader{
    width: 50%;
    height: 50%;
    /* top: 20%; */
    /* left: 50%; */
    /* margin: -150px; */
    margin-left: auto;
    margin-right: auto;
}
.loader svg{
  width: 60%;
  margin: 0%;
  transition: 0.3s all;
}
.loader svg path{
  stroke-width: 3px;
  stroke: #fff;
  fill: rgba(0,0,0,0);
  stroke-miterlimit: 10;
  opacity: 1;
  transition: fill 0.5s 0.3s;
}
.loader.finished svg {
  transform: scale3d(0.5, 0.5, 0.5);
}
.loader.finished svg path{
  fill: rgba(255,255,255,1);
}
body {
   background-color: rgb(56, 73, 146)
 }
</style>