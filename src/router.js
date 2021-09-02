import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import User from './components/User'
import UserAuth from './components/UserAuth'
import Menu from './views/Menu'
import Register from './views/Register'
import Carrito from './views/Carrito'
import Orders from './views/Orders'

const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/auth',
        name: "user_auth",
        component: UserAuth
    },
    {
        path: '/user/:username',
        name: "user",
        component: User
    },
    {
        path: '/user/menu',
        name: "menu",
        component: Menu
    },
    {
        path: '/register/',
        name: "register",
        component: Register
    },
    {
        path: '/carrito/',
        name: "carrito",
        component: Carrito
    },
    {
        path: '/orders/',
        name: "orders",
        component: Orders
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router