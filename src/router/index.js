import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue'
import students from '@/components/students.vue'
import rooms from '@/components/rooms.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/index', name: 'index', component: index, children: [
      { path: '/students', name: 'students', component: students },
      { path: '/rooms', name: 'rooms', component: rooms }
    ]}
  ]
})
export default router;
