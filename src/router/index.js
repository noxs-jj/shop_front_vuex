import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProductCatalogue from '@/components/ProductCatalogue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductCatalogue',
      component: ProductCatalogue
    },
    {
      path: '/hello-world',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
