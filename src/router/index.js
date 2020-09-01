import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Home from '../components/Home'
import Users from '../components/User'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/HelloWorld'
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {path: '/users',component:Users}
    ]
  }
];
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.name == '/HelloWorld') return next()
  //  获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // if(!tokenStr) return next('/HelloWorld')
  // next()
  const tokenStr = window.sessionStorage.getItem('token');
  if (to.path != '/HelloWorld' && !tokenStr) {
    next({
      path: '/login'
    })
  } else {
    if (to.path == '/login' && tokenStr) {
      next('/home')
    } else {
      next()
    }
  }
})
export default router;
