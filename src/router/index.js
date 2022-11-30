import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/LoginComponent.vue'
import Registration from '../components/RegistationComponent.vue'
import ListCompanies from '../components/companies/ListComponent.vue'
import CreateCompanies from '../components/companies/CreateComponent.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: { guest: true },
    },
    // {
    //     path: '/companies/:id',
    //     component: Companies
    // },
    {
        path: '/companies',
        component: ListCompanies,
        name: 'ListCompanies',
        meta: { requiresAuth: true },
    },
    {
        path: '/companies/create',
        component: CreateCompanies,
        name: 'CreateCompanies',
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router