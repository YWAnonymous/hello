import router from "./index";


router.beforeEach((to, from, next) => {
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