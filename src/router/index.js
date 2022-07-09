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
        component: () =>
          import(/* webpackChankName "Home" */ '../views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () =>
          import(/* webpackChankName "Login" */ '../views/Login/Login.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () =>
          import(/* webpackChankName "Menu" */ '../views/Menu/Menu.vue'),
      },
      {
        path: '/menu/:id',
        name: 'MenuDetails',
        component: () =>
          import(
            /* webpackChankName "MenuDetails" */ '../views/Menu/MenuDetails.vue'
          ),
      },
      {
        path: 'cart/:id',
        name: 'Cart',
        component: () => import(/* webpackChankName "Cart" */ '../views/Cart/Cart.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChankName "Order" */ '../views/Order/Order.vue')
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
