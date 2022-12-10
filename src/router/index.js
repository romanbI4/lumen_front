import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/LoginComponent.vue'
import Registration from '../components/RegistationComponent.vue'
import ResetPassword from '../components/ResetPasswordComponent.vue'
import Logout from '../components/LogoutComponent.vue'
import ListCompanies from '../components/companies/ListComponent.vue'
import CreateCompany from '../components/companies/CreateComponent.vue'
import EditCompany from '../components/companies/EditComponent';

const ifAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            return !ifAuthenticated()
        },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            return !ifAuthenticated()
        },
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            return !ifAuthenticated()
        },
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
        meta: { requiresAuth: true },
        beforeEnter: () => {
            return ifAuthenticated()
        },
    },
    {
        path: '/companies/:id',
        name: 'EditCompany',
        component: EditCompany,
        meta: { requiresAuth: true },
        beforeEnter: () => {
            return ifAuthenticated()
        },
    },
    {
        path: '/companies',
        component: ListCompanies,
        name: 'ListCompanies',
        meta: { requiresAuth: true },
        beforeEnter: () => {
            return ifAuthenticated()
        },
    },
    {
        path: '/companies/create',
        component: CreateCompany,
        name: 'CreateCompany',
        meta: { requiresAuth: true },
        beforeEnter: () => {
            return ifAuthenticated()
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router