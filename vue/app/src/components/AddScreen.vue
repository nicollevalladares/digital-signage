<template>
    <div id="newScreen">
        <div v-if="!scanned">
             <h1 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h1>
            <hr>
            <h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en Digital Signage.</h3>
            <h3>Diríjase a <span id="url">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración</h3>
            <div id="idScreen">9437618452</div>
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

export default {
    name: 'AddScreen',
    components: {
    
    },
    data(){
        return {
            src: null,
            idScreen: '9437618452',
            scanned: false,
            configured: false
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
        ...mapActions(['getScreenInfo'])
    },
    created(){
        this.getScreenInfo({idScreen: this.idScreen}),
        this.sockets.subscribe(this.idScreen, (data) => {
            console.log(data.type);
            if (data.type=='scanned'){
                this.scanned = true
            }

            else if(data.type=='configured'){
                this.configured = true
            }
            // store.dispatch('updateScreens',{ data })
        }),
        this.src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://signage.dev.hn/configQR/9437618452"
    },
    computed: {
      ...mapState(['screen'])
    }
}
</script>

<style>
    #newScreen{
        color: white;
        margin-top: 10%;
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
