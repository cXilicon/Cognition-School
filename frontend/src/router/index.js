import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Main from '@/views/Main'
import User from '@/views/User'
import Test from '@/views/Test'
import QuestionBank from '@/views/QuestionBank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
          { path: '/main', component: Main, name: '系统介绍' },
          { path: '/user', component: User, name: '用户管理' },
          { path: '/test', component: Test, name: '测试管理' },
          { path: '/questionbank', component: QuestionBank, name: '题库管理' },
        ]
  
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,{
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})
