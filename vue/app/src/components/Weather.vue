<template>
  <div>
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
      <marquee v-if="this.marqueeActive"/>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import {mixin as VueTimers} from 'vue-timers'
import { setInterval, setTimeout } from 'timers'
import axios from 'axios'
import weather from 'openweather-apis'
import marquee from './Marquee'

export default {
    mixins: [VueTimers],
    name: 'Weather',
    components: {
        marquee
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
   sockets: {
        connect: function () {
            // console.log('socket connected')
        }
    },
  methods :{
     ...mapActions(['getScreenInfo']),

      updateInfo (){
          this.today = moment().format('dddd, D MMMM YYYY');
          this.minutes= moment().format('mm');
          if (moment().format('h')<10){
              this.hour = '0'+ moment().format('h'); 
          }else
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
    ...mapState(['marqueeActive', 'key'])
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

      this.sockets.subscribe(this.key.key.toString(), (data) => {
          if (data.type=='general'){
            this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key})
            if(data.data.appSelected != 'Weather')
              this.sockets.unsubscribe(this.key.key.toString());
        }
      })
  }
}

</script>

<style scoped>
  #div-weather {
    /* background-image: url('../assets/weather.jpg'); */
    background-size: cover;
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
    background-color: blue;
    background: rgb(14, 1, 255);
    background: linear-gradient(60deg, rgb(62, 56, 179) 0%, rgb(103, 103, 180) 35%, rgb(21, 149, 175) 100%);

  }
  #temp {
    font-size: 5vw;
    color: white;
    font-weight: bold;
    /* margin-left: 70%; */
  }
 #date{
    font-size: 2vw;
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
    height: 20vw;
    margin-top: 15%;
    /* overflow: hidden; */
 }

#hour, #minutes{
  width: 12vw;
  height: 12vw;
  background-color: rgba(255, 255, 255, 0.733);
  z-index: 100;
  margin-top: -70px;
  border-radius: 5px;
  color: black;
  font-size: 10vw;
  font-weight: bold;
  margin-left: 15px;
  float: left;
  background: rgb(14, 1, 255);
  background: linear-gradient(60deg, rgb(243, 243, 243) 0%, rgb(128, 128, 131) 35%, rgb(170, 170, 170) 100%);
}

#m{
    font-size: 1.5vw;
    float: left;
    margin-top: -10%;
    margin-left: 5%;
}

#city {
  font-size: 3vw;
  color: white;
  font-weight: bold;
}

</style>
