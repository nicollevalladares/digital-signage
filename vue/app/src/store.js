import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import firebase from 'firebase'
import router from './router'

Vue.use(Vuex)

// var firebaseConfig = {
//   apiKey: "AIzaSyAsjqIczn5XD0SuBSsmgaTfo1yEdnnJCDA",
//   authDomain: "bean-signage.firebaseapp.com",
//   databaseURL: "https://bean-signage.firebaseio.com",
//   projectId: "bean-signage",
//   storageBucket: "bean-signage.appspot.com",
//   messagingSenderId: "889184599823",
//   appId: "1:889184599823:web:e2a25c1ef4f2a881"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export default new Vuex.Store({
  state: {
    uuid:'',
    screen: '',
    key: ''
  },
  mutations: {
    setScreenInfo(state, screenInfo){
      state.screen = screenInfo;
    },
    // updateScreen(state, data){
    //   if(state.screen.id == data.idScreen){
    //       // doc.active = data.screen.active
    //     }
    // }
    setUUID(state, uuid){
      state.uuid = uuid;
    },
    setIdScreen(state, key){
      state.key = key;
    }
  },
  actions: {
    getScreenInfo({commit}, payload){
      const uuid = payload.id;
      const screenInfo = [];

      axios.get("http://connect.dev.hn/screens")
      .then(response => {
          response.data.forEach(doc => {
            if(doc.uuid == uuid){
              let screen = doc;
              screenInfo.push(screen);
            }

            // console.log(screenInfo);
            
          });
      })

      commit('setScreenInfo', screenInfo);
    },
    // updateScreens({commit}, payload){
    //   const data = payload.data
    //   commit('updateScreen', data)
    // },
    getUUID({commit}){
      const uuid = []

      axios.get("http://localhost:3333/uuid")
      .then(response => {
        uuid.push(response.data)
      })

      console.log(uuid);
      
      commit('setUUID', uuid)
    },
    getIdScreen({commit}){
      axios.get("http://192.168.100.89:3331/screens/generateKey")
      .then(response => {
        const key = response.data
        commit('setIdScreen', key)
      })
    }
  },
  getters: {

  }
})
