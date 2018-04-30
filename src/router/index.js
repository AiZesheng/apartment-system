import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue'
import students from '@/components/students.vue'
import addStudents from '@/components/addStudents.vue'
import editStudents from '@/components/editStudents.vue'
import rooms from '@/components/rooms.vue'
import apartment from '@/components/apartment.vue'
import addRooms from '@/components/addRooms.vue'
import editRooms from '@/components/editRooms.vue'
import roomDetail from '@/components/roomDetail.vue'
import visitor from '@/components/visitor.vue'
import addVisitor from '@/components/addVisitor.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/index', name: 'index', component: index, children: [
      { path: '/students', name: 'students', component: students },
      { path: '/addStudents', name: 'addStudents', component: addStudents },
      { path: '/rooms', name: 'rooms', component: rooms },
      { path: '/addRooms', name: 'addRooms', component: addRooms },
      { path: '/editStudents/:id', name: 'editStudents', component: editStudents },
      { path: '/apartment', name: 'apartment', component: apartment },
      { path: '/editRooms', name: 'editRooms', component: editRooms },
      { path: '/roomDetail', name: 'roomDetail', component: roomDetail },
      { path: '/visitor', name: 'visitor', component: visitor },
      { path: '/addVisitor', name: 'addVisitor', component: addVisitor }
    ]}
  ]
})
export default router;
