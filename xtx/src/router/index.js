import { createRouter, createWebHashHistory } from 'vue-router'
import HomeCom from '../views/HomeCom.vue'
import Goods from '../views/GoodsCom.vue'
import HomePage from '../views/HomePage.vue'
import LogIn from '../views/RegisterCom.vue'
import Cart from '../views/CartCom.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', component: HomePage, children: [
        {
          path: '/',
          redirect: "/Home"
        },
        {
          path: '/Home',
          component: HomeCom
        },
        {
          path: '/Goods/:id',
          component: Goods,
          props: true
        },
        {
          path: '/cart',
          component: Cart
        }
      ]
    },
    {
      path: '/login/:type', component: LogIn, props: true
    }
  ]
})

export default router
