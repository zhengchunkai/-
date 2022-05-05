import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/loginNew/LoginNew.vue'
// import Main from '../views/main/Main.vue'
import Main2 from '../views/mainNew/Main2New.vue'
import UserList from '@/views/user/UserList'
import PermissionList from '@/views/permission/PermissionList'
import RoleList from '@/views/permission/RoleList'
import Welcome from '@/views/welcomeNew/WelcomeNew.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/main2',
    component: Main2,
    // 路由重定向，当地址栏为/main2的时候自动转换为/welcome
    redirect: '/welcome',
    children: [
      {
        path: '/users',
        component: UserList
      },
      {
        path: '/roles',
        component: RoleList
      },
      {
        path: '/rights',
        component: PermissionList
      },
      {
        path: '/welcome',
        component: Welcome
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫，它是一个拦截器，只要尝试改变地址栏都会触发这个函数
router.beforeEach((to, from, next) => {
  // 如果你访问的是登录页面，直接放行，允许跳转
  if (to.path === '/') {
    console.log('放行到登录')
    next()
  } else {
    // 没有token ， 直接跳转到登录界面
    var userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) {
      next('/')
    } else {
      // 有token，直接放行
      next()
    }
  }
})

export default router
