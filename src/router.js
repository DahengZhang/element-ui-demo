import Vue from 'vue'
import VueRouter from 'vue-router'
import FormDemos from '@/views/FormDemos.vue'
import UploadDemos from '@/views/UploadDemos.vue'
import PanelDemos from '@/views/PanelDemos.vue'
import SelectDemos from '@/views/SelectDemos.vue'
import TableDemos from '@/views/TableDemos.vue'
import JsonDemos from '@/views/JsonDemos.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/form',
            name: 'Form',
            component: FormDemos
        },
        {
            path: '/upload',
            name: 'upload',
            component: UploadDemos
        },
        {
            path: '/panel',
            name: 'panel',
            component: PanelDemos
        },
        {
            path: '/select',
            name: 'select',
            component: SelectDemos
        },
        {
            path: '/table',
            name: 'table',
            component: TableDemos
        },
        {
            path: '/json',
            name: 'json',
            component: JsonDemos
        }
    ]
})

export default router
