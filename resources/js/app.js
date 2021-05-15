/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

import VueRouter from 'vue-router'
import axios from 'axios'
import 'es6-promise/auto'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth';
import auth from './auth'
// import router from './router'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);


// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

window.Vue = require('vue').default;

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('test', require('./components/Test.vue').default);
Vue.component('header-non-auth', require('./components/headerNonAuth.vue').default);



Vue.router = router
Vue.use(VueRouter)

Vue.use(VueAxios, axios)
// axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api/v1`
Vue.use(VueAuth, auth)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    router
});

