<template>
  <!-- <div id="div-weather">
    <div id="div-data">
      <div id="hour">{{hour}}
        <span id="m">{{formate}}</span>
      </div>
      <div id="minutes">{{minutes}}</div>
      <h1 id="temp">° C</h1>
      <h1 id="date"> {{today}}</h1>
      <span id="city"> {{city}}</span>
    </div> 
  </div> -->
  <div id="div-weather">
    <div id="div-data">
      <v-container grid-list-md text-xs-center>
        <v-layout align-center justify-center>
          <v-flex xs6>
            <div id="hour">{{hour}}
              <span id="m">{{formate}}</span>
            </div>
            <div id="minutes">{{minutes}}</div>
            <h1 id="date"> {{today}}</h1>
          </v-flex>
          <v-flex >
            <h1 id="temp">° C</h1>
            <h1 id="city"> {{city}}</h1>
          </v-flex>
        </v-layout>
      </v-container>
    </div> 
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import {mixin as VueTimers} from 'vue-timers'
import { setInterval, setTimeout } from 'timers'
import axios from 'axios'
import weather from 'openweather-apis'
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
          formate: '' || moment().format('A'),
          temp: '',
          city : 'Tegucigalpa' || 'Honduras'
        }
  },
  methods :{
      updateInfo (){
          this.today = moment().format('dddd, D MMMM YYYY');
          this.minutes= moment().format('mm');
          this.hour = moment().format('h'); 
          this.formate = moment().format('A'); 
      },
      updateTemp (){
         weather.getTemperature(function(err, tempC){
            console.log(tempC);
            document.getElementById('temp').innerHTML = Math.round(tempC-1) + ' °C';
        })
      }
  },
   computed: {
      ...mapState([''])
  },
  mounted (){
    moment.locale('es');
    this.$options.interval = setInterval(this.updateInfo, 1000);
    this.$options.interval = setInterval(this.updateTemp, 500000);
    this.$options.interval = setTimeout(this.updateTemp, 1000);

    weather.setLang('es');
    weather.setCoordinate(14.0932, -87.2013);
    weather.setUnits('metric');
    weather.setAPPID('2259f69889076f587bb92ac8d0d9c046');
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
    /* margin-left: 70%; */
  }
 #date{
    font-size: 20px;
    color: white;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    text-align: center;
 }
 #div-data {
    background-color: rgba(0,0,0,0.6);
    border-radius: 8px;
    padding: 5px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    height: 250px;
    margin-top: 15%;
    /* overflow: hidden; */
 }

#hour, #minutes{
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.733);
  z-index: 100;
  margin-top: -70px;
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

#city {
  font-size: 30px;
  color: white;
  font-weight: bold;
}

</style>
