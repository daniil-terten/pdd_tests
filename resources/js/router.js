import vueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(vueRouter);

import Testing from "./views/Testing";
import indexView from "./views/indexView";
import Select from "./views/Select";
import Register from "./views/Register";
import Login from "./views/Login";
import Statistics from "./views/Statistics";


const routes = [
    {
        path: '/',
        component: indexView,
        name: 'indexView',
        meta: {
            auth: undefined
        }
    },
    {
        path: '/testing',
        component: Testing,
        meta: {
            auth: undefined
        }
    },
    {
        path: '/testing/:id',
        component: Testing,
        meta: {
            auth: undefined
        }
    },
    {
        path: '/select',
        component: Select
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: Statistics,
        meta: {
            auth: true
        }
    },
]

// const router = new VueRouter({
//     routes // сокращённая запись для `routes: routes`
// })
export default new vueRouter({
    // mode: "history",
    routes
})

