import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import mitt from 'mitt'
import './base.css'
import './my-styles.scss'
import '../public/font/iconfont.css'
const app = createApp(App)

app.use(router)

axios.defaults.baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
app.config.globalProperties.$http = axios
app.config.globalProperties.$bus = mitt()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
// app.directive('load', function (el) {
// el.classList.add('loading')
// })
// 自定义全局指令
app.directive('load', {

  mounted(el, binding) {
    if (binding.value === false) {
      // console.log(binding.value)
      el.classList.add('loading')
    }
  },
  updated(el, binding) {
    // 元素更新时执行的逻辑
    if (binding.value === true) {
      el.classList.remove('loading')
    }
  }
})
// 自定义全局指令
app.directive('pd', {
  mounted(el, binding) {
    if (binding.value === true) {
      // console.log(binding.value)
      let ps = el.querySelectorAll('p');
      ps[1].classList.remove('price')
      ps[1].classList.add('ms')
      el.style.backgroundColor = "#fff"
    }
  },
  updated() {

  }
})
app.mount('#app')
