import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/navigator/Header'
import Home from '@/views/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test/test',
      name: 'Test',
      component: Header

    }
  ]
})
