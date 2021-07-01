import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// 导入全局样式表
import '../assets/css/global.css'
// 导入字体图标样式表
import '../assets/font/font_007i71y3dqjpx/iconfont.css'

// 配置axios
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转的登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
