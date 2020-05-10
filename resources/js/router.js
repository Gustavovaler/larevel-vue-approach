import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Nota = {
    template: '<div>Notas </div>'
}

export default new VueRouter({
    routes: [
        {path: '/notas/:id', component: Nota}
    ]
})