// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './assets/css/global.css'

import axios from 'axios'

// 本机地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//axios.defaults.baseURL = 'http://localhost:8989/springboot/'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  　　//NProgress.start()
  // console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
});

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
