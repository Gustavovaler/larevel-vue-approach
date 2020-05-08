<template>
    <div>
        <h3>Agregar notas</h3>
        <form @submit.prevent="agregar">
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
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            notas: [
                {}
            ],
            nota: {nombre: '', descripcion: ''},
        }
    },
    created(){
        axios.get('/notas').then( res =>{
            this.notas = res.data;
            console.log(res.data);
        })
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
                this.notas.push(res.data);
             })
        }
    }
    
}
</script>