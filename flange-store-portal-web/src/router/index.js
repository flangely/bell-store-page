import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/Home')
    },
    {
      path:'/login',
      name:'Login',
      component: () => import('@/views/login/Login')
    },
    {
      path:'/search/:keyword',
      name:'Search',
      component: () => import('@/views/search/SearchResult')
    },
    {
      path:'/product/:productId',
      name:'Product',
      component: () => import('@/views/product/ProductDetail')
    },
    {
      path:'/order',
      name:'Order',
      component: () => import('@/views/order/Order')
    },
    {
      path:'/cart',
      name: 'Cart',
      component: () => import('@/views/cart/Cart')
    }
  ]
})
