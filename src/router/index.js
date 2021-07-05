import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'
import Admins from '../components/Admins.vue'
import Power from '../components/Power.vue'
import Modules from '../components/modules.vue'
// 导入全局样式表
import '../assets/css/global.css'
// 导入字体图标样式表
import '../assets/font/font_oljbkqn65i8/iconfont.css'
// 导入树表控件
import TreeTable from 'vue-table-with-tree-grid'

// 配置axios
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = ''
// axios请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.use(VueRouter)

Vue.component('tree-table', TreeTable)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/admins',
        component: Admins
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/powers',
        component: Power
      },
      {
        path: '/moduleList',
        component: Modules
      }
    ]
  }
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
