<template>
    <div id="newScreen">
        <button>
            <router-link :to="{name: 'DownloadFiles'}">Download Files</router-link>
        </button>
        <button>
            <router-link :to="{name: 'Player'}">Player</router-link>
        </button>
        <div v-if="!scanned">
             <h1 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h1>
            <hr>
            <h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en Digital Signage.</h3>
            <h3>Diríjase a <span id="url">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración</h3>
            <h3 id="idScreen">{{idScreen}}</h3>
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
    </div>
</template>



<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'AddScreen',
    components: {
    
    },
    props: ['idScreen'],
    data(){
        return {
            src: null,
            scanned: false,
            configured: false,
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
        this.getUUID();
        this.sockets.subscribe(this.idScreen.toString(), (data) => {
            if (data.type=='scanned'){
                this.scanned = true
            }
            else if(data.type=='configured'){
                this.configured = true
                this.$router.push({name: 'DownloadFiles'})
            }
            // store.dispatch('updateScreens',{ data })
        }),
        axios.get("http://localhost:3333/uuid")
        .then(response => {
            this.uuid = response.data
        }),
        this.getScreenInfo({id: this.uuid}),
        this.src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://signage.dev.hn/configQR/" + this.idScreen
    },
    updated(){
        // this.sockets.subscribe(document.getElementById('idScreen').firstChild, (data) => {
        //     if (data.type=='scanned'){
        //         this.scanned = true
        //     }
        //     else if(data.type=='configured'){
        //         this.configured = true
        //         this.$router.push({name: 'DownloadFiles'})
        //     }
        //     // store.dispatch('updateScreens',{ data })
        // })
    },
    computed: {
      ...mapState(['screen'])
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
