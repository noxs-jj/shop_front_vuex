import Vue from 'vue'
import Vuex from 'vuex'
import { productServiceFetchAllProducts } from '@/service/productService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket: [
      {'name': 'test1'},
      {'name': 'test2'}
    ],
    productsList: []
  },
  getters: {
    getBasket: state => {
      return state.basket
    },
    getBasketProductsCount: state => {
      return state.basket.length
    },
    getProductsList: state => {
      return state.productsList
    },
    getOneProduct: state => reference => {
      return state.currentProductDetail
    }
  },
  mutations: {
    PRODUCTS_FETCH_LIST: (state, data) => {
      state.productsList = data.products
    }
  },
  actions: {
    actionFetchProductsCatalogue: context => { productServiceFetchAllProducts(context) }
  }
})
