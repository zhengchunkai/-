import Vue from 'vue'
// 第一个页面
import App from './App.vue'
// 路由的配置
import router from './router'
// 导入全局样式，去掉内边距和外边距
import '@/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import { Form, Input, FormItem, Button, Message, Container, Aside, Header, Main, Footer, Tree, Menu, Submenu, MenuItem, MenuItemGroup, RadioGroup, RadioButton, Table, TableColumn, Switch } from 'element-ui'

// 使用自己公司的图标库，不使用elementUI的
import '@/assets/font/iconfont.css'

// 导入axios网络框架，全局导入后面任何vue页面都可以使用
import axios from 'axios'

// 通过axios的实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/'
})

// 只要使用axios发送网路请求，就一定会执行这个请求拦截器
instance.interceptors.request.use((config) => {
  console.log('我监听到网络请求了', config)
  // 从localStorage中获取userInfo，访问token属性
  var userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // 一定要判断这个是否为空
  if (userInfo) {
    config.headers.Authorization = userInfo.token
  }
  return config
})

// 把axios挂在到Vue的原型对象上，这样vue的实例就可以使用这个变量了
Vue.prototype.$http = instance

Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Tree)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)

Vue.prototype.$msg = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
