import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid:'',
    screen: '',
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
        list : 'RDRK1K2bCg4J8',
        ytVideoId : 'R2vVrWsis6I'
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
    setScreenInfo(state, screenInfo){
      state.screen = screenInfo;
    },
    setUUID(state, uuid){
      state.uuid = uuid;
    },
    setIdScreen(state, key){
      state.key = key;
    },
    setFiles(state, files){
      state.files = files;
      state.status = true;
    },
    setImagesDuration(state, imagesDuration){
      state.imagesDuration = imagesDuration;
    },
    setIdPlaylist(state, idPlaylist){
      state.idPlaylist = idPlaylist;
    },

  },
  actions: {
    getScreenInfo({commit}, payload){
      const uuid = payload.uuid;
      const idScreen = payload.idScreen;
      axios.post("http://connect.beanage.dev.hn/screens", {
        idScreen: idScreen
      })
      .then(response => {
        let files = response.data.data.files;
        let imagesDuration = response.data.data.imagesDuration;
        let idPlaylist = response.data.idPlaylist;        
        commit('setFiles', files)
        commit('setImagesDuration', imagesDuration)
        commit('setIdPlaylist', idPlaylist)
      })
      .catch(error => {
          console.log(error)
      });
    },
   
    getUUID({commit}){
      axios.get("http://localhost:3333/uuid")
      .then(response => {
       const uuid = response.data;
       commit('setUUID', uuid)
      })
    },
    getIdScreen({commit}){
      axios.get("http://connect.beanage.dev.hn/screens/generateKey")
      .then(response => {
        const key = response.data
        commit('setIdScreen', key)
      })
    },
  },
  getters: {

  }
})

