import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import servers from './serverConfig.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid:'',
    key: '',
    progress: '',
    appSelected : '',
    files: [],
    imagesDuration : '',
    idPlaylist: '',
    status: false,
    downloadFile: '',
    isDownloading: false,
    youtubeUserConfig : {
        type : 'playlist',
        list : 'RDRK1K2bCg4J8'
        // ytVideoId : 'R2vVrWsis6I'
    },
    marqueeActive: false,
    marquee : {
      news : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.      ',
      backgroundColor: 'blue',
      fontColor : 'white',
      fontFamily: 'Verdana',
      fontSize : '1.5vw' || null,
      time : true,
      timeConf :{
        backgroundColor: 'rgb(180, 154, 3)',
        fontColor: 'white',
        fontSize : '1.5vw' || null,
        left: null,
        right : 0
      }
    }
  },

  mutations: {
 
    setUUID(state, uuid){
      state.uuid = uuid;
    },
    setIdScreen(state, key){
      state.key = key;
    },

    setConfiguration (state, conf){
 
          if (conf.data.files){
            state.files = conf.data.files;
            state.status = true;
          }

          if (conf.data.imagesDuration)
             state.imagesDuration = conf.data.imagesDuration;

          if (conf.idPlaylist)
             state.idPlaylist = conf.idPlaylist;

          if (conf.otherConf.news != undefined)
            state.marqueeActive = conf.otherConf.news;

          if (conf.otherConf.appSelected && (conf.otherConf.appSelected != state.appSelected)){
             state.appSelected = conf.otherConf.appSelected;
             router.push({name : state.appSelected})
          }
    }
  },
  actions: {
    getScreenInfo({commit}, payload){
      const idScreen = payload.idScreen;      
      axios.post(`${servers.mainServer}/screens`, {
        idScreen: idScreen
      })
      .then(response => {
          if (response.data.code ==2) {
              router.push({name : 'AddScreen',
                            params: {
                            idScreen : idScreen
                          }})
        }else if(response.data.code == 1){
            var conf = response.data;
            var files = response.data.data.files;
            // commit('setFiles', files)  
            commit('setIdScreen', {key: idScreen})
            commit ('setConfiguration', conf);
        }
      })
      .catch(error => {
          console.log(error)
      });
    },
   
    getUUID({commit}){
      axios.get(`${servers.FTPServer}/uuid`)
      .then(response => {
       const uuid = response.data;
       commit('setUUID', uuid)
      })
    },

    getIdScreen({commit}){
      axios.get(`${servers.mainServer}/screens/generateKey`)
      .then(response => {
        const key = response.data
        commit('setIdScreen', key)
      })
    },
  }
})

