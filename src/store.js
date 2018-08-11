import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import { productServiceFetchAllProducts } from '@/service/productService'
const uuidv1 = require('uuid/v1')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket: [],
    productsList: [],
    userUUID: null
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
    },
    getUserUUID: state => {
      return state.userUUID
    }
  },
  mutations: {
    PRODUCTS_FETCH_LIST: (state, data) => {
      state.productsList = data.products
    },
    COOKIE_UPDATE_USER_UUID: (state, data) => {
      state.userUUID = data
    },
    BASKET_UPDATE: (state, data) => {
      if (data === {}) { return }
      state.basket = data.basket
    }
  },
  actions: {
    actionFetchProductsCatalogue: context => { productServiceFetchAllProducts(context) },
    actionUpdateBasket: context => basket => { context.commit('BASKET_UPDATE', basket) },
    actionCreateOrUpdateCookieUserUUID: context => {
      let uuid = (Cookie.get('user_uuid') === undefined) ? uuidv1() : Cookie.get('user_uuid')
      Cookie.set('user_uuid', uuid, { expires: 30 })
      context.commit('COOKIE_UPDATE_USER_UUID', uuid)
    }
  }
})
