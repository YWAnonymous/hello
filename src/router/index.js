import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Home from '../components/Home'
import Users from '../views/User/index.vue'

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


export default router;
