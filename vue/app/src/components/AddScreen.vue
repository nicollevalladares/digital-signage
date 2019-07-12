<template>
    <div>
		<div id="newScreen">
			<br>
			<h2 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h2>
			<h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en digitalSignage </h3>
			<h3>dirígase a <span style="color: rgb(21, 21, 192)">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración</h3>
			<div>----------</div>
			<h3 id="qr-text">o escanee el siguiente código QR:</h3>
			<br>
			<img id="barCode" src="" >
		</div>
    </div>
</template>



<script>
import axios from 'axios'

export default {
    name: 'AddScreen',
    components: {
    
    },
    data(){
        return {
        }
    },
    methods: {
    },
    created(){
        
    }
}
</script>

<style >

</style>
