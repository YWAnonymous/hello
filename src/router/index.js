import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

Vue.use(Router)

const routes = [
  
  { path: '/', redirect: '/HelloWorld' },{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/home',
    component: Home
  }
];
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == '/HelloWorld') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router;
