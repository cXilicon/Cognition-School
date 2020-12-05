import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../pages/HelloWorld'
import Login from '../pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
          component:resolve => require(['../pages/login.vue'],resolve),
          meta: { title: '登录' }
    },
      {
        path: '/helloWorld',
        component:resolve => require(['../pages/HelloWorld.vue'],resolve),
        meta: { title: '登录' }
    }
    ,
  ]
})
