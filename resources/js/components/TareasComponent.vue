<template>
    <div>

        <form @submit.prevent="editarNota" v-if="editandoNota">
            <h4>Editar nota</h4>
            <input type="text" placeholder="Nombre" class="form-control mb-2" v-model="nota.nombre">
             <input type="text" placeholder="Descripcion" class="form-control mb-2" v-model="nota.descripcion">  
             <button class="btn btn-success" @click="guardarNota">Guardar</button>   
             <button class="btn btn-warning" @click="cancelarEdicion">Cancelar</button>  
        </form>

        <form @submit.prevent="agregar" v-else>
        <h4>Agregar notas</h4>
            <input type="text" placeholder="Nombre" class="form-control mb-2" v-model="nota.nombre">
             <input type="text" placeholder="Descripcion" class="form-control mb-2" v-model="nota.descripcion">  
             <button class="btn btn-primary" type="submit">Agregar</button>   


        </form>


        <hr class="mt-3">
        <h3>Seccion de notas</h3>

        <ul class="list-group my-2">
            <li class="list-group-item" 
            v-for="(item, index) in notas"  :key="index">
            <span class="badge badge-primary float-right">{{item.updated_at}}</span>
              <p>{{item.nombre}}</p>
              <p>{{item.descripcion}}</p>
              <button class="btn btn-danger btn-sm" @click="eliminarNota(item, index)">Eliminar</button>
               <button class="btn btn-secondary btn-sm" @click="editarNota(item, index)">Editar</button> 
                <span class="btn btn-outline-success btn-sm" @click="showNota(item)"> Detalles</span>
                {{numero}}
            </li>
        </ul>

        <button @click="aumentar">Aumentar</button>
       
    </div>
</template>

<script>
import  ventana  from "./ModalWindow.vue";
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    components: {
        ventana
    },
    data(){
        return{
            notas: [
                {}
            ],
            nota: {nombre: '', descripcion: ''},
            editandoNota: false,
            currentItem: 0,
            showModal: false
        }
    },
    created(){
        axios.get('/notas').then( res =>{
            for (let i = 0; i < res.data.length; i++) {
                const fecha = new Date(res.data[i]['updated_at']);
                res.data[i].updated_at = fecha.toLocaleString();
                
            }            
            this.notas = res.data;
        });
    },
    computed:{
        ...mapState(['numero'])
    },
    methods:{
        agregar(){
            if (this.nota.nombre.trim() === '' || this.nota.descripcion.trim() === '') {
                alert('Debes rellenar los campos');
                return;
            }

            const params = {nombre: this.nota.nombre, descripcion:  this.nota.descripcion }
             this.nota.nombre = '';
             this.nota.descripcion = '';
            axios.post('/notas', params).then( res => {
                var fecha = new Date(res.data.updated_at);
                res.data.updated_at = fecha.toLocaleString();
                console.log(res.data.updated_at);
               
                this.notas.push(res.data);
             })
            
        },
         ...mapMutations(['aumentar']),

        eliminarNota(item, index){
            axios.delete(`/notas/${item.id}`).then( () => this.notas.splice(index, 1));
        },
        editarNota(item, index){
            this.editandoNota = true;
            this.nota.nombre = item.nombre;
            this.nota.descripcion = item.descripcion;
            this.currentItem = item.id;
            
            
        },
        guardarNota(){
            const params = {nombre: this.nota.nombre, descripcion:  this.nota.descripcion }
            axios.put(`/notas/${this.currentItem}`, params).then(res  => {
                this.editandoNota = false;
            })
            axios.get('/notas').then( res =>{
            for (let i = 0; i < res.data.length; i++) {
                const fecha = new Date(res.data[i]['updated_at']);
                res.data[i].updated_at = fecha.toLocaleString();
                
            }            
            this.notas = res.data;
        });
        },

        cancelarEdicion(){
            this.nota.nombre = '';
            this.nota.descripcion = '';
            this.editandoNota = false;
        },

        showNota(item){
            console.log(item.id); 
            console.log(item.nombre);
            console.log(item.descripcion);
            var date = new Date(item.updated_at);
            console.log(date.toLocaleString());
        }
    }
    
}
</script>