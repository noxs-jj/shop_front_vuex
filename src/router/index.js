import Vue from 'vue'
import Router from 'vue-router'
import ProductCatalogue from '@/components/ProductCatalogue'
import ProductDetail from '@/components/ProductDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductCatalogue',
      component: ProductCatalogue
    },
    {
      path: '/product/:ref',
      name: 'ProductDetail',
      component: ProductDetail
    }
  ]
})
