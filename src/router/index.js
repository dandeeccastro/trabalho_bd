import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/desfechos',
    name: 'Desfechos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Desfechos.vue')
  },
  {
    path: '/desfechos',
    name: 'Desfechos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Desfechos.vue')
  },
  {
    path: '/exames',
    name: 'Exames',
    component: () => import(/* webpackChunkName: "about" */ '../views/Exames.vue')
  },
  {
    path: '/clinicas',
    name: 'Clinicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Clinicas.vue')
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacientes.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
