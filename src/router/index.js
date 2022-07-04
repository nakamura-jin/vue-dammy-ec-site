import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '/',
        name: 'Home',
        // component: Home,
        component: () => import(/* webpackChankName "Home" */ '../views/Home.vue') ,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
