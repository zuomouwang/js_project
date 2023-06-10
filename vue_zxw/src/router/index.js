import { createRouter, createWebHashHistory } from 'vue-router'
import Word from '../components/word/WordAll.vue'
import Home from '../views/HomeVue.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/word',
      component: Word
    }
  ]
})

export default router
