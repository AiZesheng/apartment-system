import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/index', name: 'index', component: index },
    { path: '/login', name: 'login', component: login }
  ]
})
export default router;
