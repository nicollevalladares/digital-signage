<template>
    <div id="newScreen">
        <!-- <button>
            <router-link :to="{name: 'Player'}">Play</router-link>
        </button> -->
        <div v-if="!scanned">
             <h1 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h1>
            <hr>
            <h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en Digital Signage.</h3>
            <h3>Diríjase a <span id="url">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración</h3>
            <h3 id="idScreen">{{key}}</h3>
            <h3 id="qr-text">o escanee el siguiente código QR:</h3>
            <br>
            <img id="barCode" :src="src">
        </div>

        <div v-if="scanned && !configured">
            <img style="width: 250px; height:250px;" src="../assets/loading.svg">
			<!-- <progress value="6" max="10"></progress> -->
			<div style="color: white;" id="output">
                <h1>Esperando Configuración</h1>
            </div>
        </div>

        <div v-if="configured">
			<div style="color: white;" id="output">
                <h1>Configuración Finalizada</h1>
                <hr>
                <h2>Descargando Archivos...</h2>
            </div>
        </div>
       
    </div>
</template>



<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
var download = require('download-file')

export default {
    name: 'AddScreen',
    components: {
    
    },
    data(){
        return {
            src: null,
            idScreen: '9437618452',
            scanned: false,
            configured: false,
            key: null,
            uuid: null
        }
    },
    sockets: {
        connect: function () {
            // console.log('socket connected')
        },
        customEmit: function (data) {
            // console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
        ...mapActions(['getScreenInfo', 'getUUID'])
    },
    created(){
        this.getScreenInfo({idScreen: this.idScreen}),
        this.sockets.subscribe(this.idScreen, (data) => {
            if (data.type=='scanned'){
                this.scanned = true
            }

            else if(data.type=='configured'){
                this.configured = true

                
            }
            // store.dispatch('updateScreens',{ data })
        }),
        axios.get("http://localhost:3331/uuid")
        .then(response => {
            console.log(response.data);
        }),
        axios.get("http://192.168.100.89:3331/screens/generateKey")
        .then(response => {
            // console.log(response.data.key);
            this.key = response.data.key;
            
            axios.get("http://localhost:3333/uuid")
            .then(response => {
                this.uuid = response.data;

                axios.post("http://192.168.100.89:3331/screens/addNew",{
                    idScreen:  this.key,
                    uuid: this.uuid
                })
                .then(response => {
                    console.log(response);
                })
            })
        }),
        this.src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://signage.dev.hn/configQR/" + this.key
    },
    computed: {
      ...mapState(['screen', 'uuid'])
    }
}
</script>

<style>
    #newScreen{
        color: white;
        margin-top: 5%;
        text-align: center;
    }

    #newScreen h1{
        margin: 20px;
        font-size: 40px;
    }

    #newScreen h3{
        font-size: 30px;
    }
    
    #url{
        color: rgb(0, 0, 107);
    }

    #idScreen{
        font-style: italic;
    }

</style>
