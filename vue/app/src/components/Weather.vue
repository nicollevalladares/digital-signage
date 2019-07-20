<template>
  <div id="div-weather">
    <div id="div-data">
      <div id="hour">{{hour}}
        <span id="m">{{formate}}</span>
      </div>
      <div id="minutes">{{minutes}}</div>
      <h1 id="temp">22° C</h1>
      <h1 id="city"> {{today}}</h1>
    </div> 
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import {mixin as VueTimers} from 'vue-timers'
import { setInterval } from 'timers';
import axios from 'axios'


export default {
    mixins: [VueTimers],
    name: 'Weather',
    components: {
        
    },
    data(){
        return {
          today : '' ||moment().format('dddd, D MMMM YYYY'),
          minutes: '' || moment().format('mm'),
          hour: '' || moment().format('h'),
          formate: '' || moment().format('A')
        }
  },
  methods :{
      updateInfo (){
          this.today = moment().format('dddd, D MMMM YYYY');
          this.minutes= moment().format('mm');
          this.hour = moment().format('h'); 
          this.formate = moment().format('A'); 



      },
      updateTemp(){
        axios.get("http://api.apixu.com/v1/current.json?key=7c257385079849e2af631538191907&q=Honduras")
        .then(response => {
          console.log(respose);
          
        })
        .catch(err => {
          
        })
      }
  },
   computed: {
      ...mapState([''])
  },
  created (){

  },
  mounted (){
    moment.locale('es');
    this.$options.interval = setInterval(this.updateInfo, 1000);
    this.$options.interval = setInterval(this.updateTemp, 600000);
     axios.get("http://api.apixu.com/v1/current.json?key=7c257385079849e2af631538191907&q=Honduras")
        .then(response => {
          console.log(respose);
          
        })
        .catch(err => {
          console.log('err');
          
        })

  }
}

</script>

<style scoped>
  #div-weather {
    background-image: url('../assets/weather2.jpg');
    background-size: cover;
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
  }
  #temp {
    font-size: 50px;
    color: white;
    font-weight: bold;
    margin-left: 70%;
  }
 #city{
    font-size: 20px;
    color: white;
    margin-left: 2%;
    margin-top: 8%;
 }
 #div-data {
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    border-radius: 5px;
    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 80%;
    height: 250px;
    text-align: left;

 }

#hour, #minutes{
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.733);
  z-index: 100;
  margin-top: -25px;
  border-radius: 5px;
  color: black;
  font-size: 120px;
  font-weight: bold;
  margin-left: 15px;
  float: left;
}

#m{
    font-size: 20px;
    float: left;
    margin-top: -8%;
    margin-left: 5%;
}


</style>
