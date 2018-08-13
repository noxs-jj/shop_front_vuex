import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import { productServiceFetchAllProducts } from '@/service/productService'
import {
  basketServiceFetchBasket,
  basketServiceAddProductWithQuantity,
  basketServiceDeleteProductOnBasket,
  basketServiceRemoveOnUnitFromProductOnBasket
} from '@/service/basketService'
const uuidv1 = require('uuid/v1')

Vue.use(Vuex)

export const state = {
  basket: null,
  productsList: [],
  userUUID: null
}

export const getters = {
  getBasket: state => { return state.basket },
  getBasketProductsCount: state => {
    if (state.basket === null || state.basket === undefined) { return 0 }
    return state.basket.products.length
  },
  getProductQuantity: state => reference => {
    if (state.basket === null || state.basket === undefined) { return 0 }
    let result = state.basket.products.filter(x => x.product.reference === reference)
    if (result.length === 0) { return 0 }
    return result[0].quantity
  },
  getProductsList: state => { return state.productsList },
  getOneProduct: state => reference => { return state.currentProductDetail },
  getUserUUID: state => { return state.userUUID }
}

export const mutations = {
  PRODUCTS_FETCH_LIST: (state, data) => { state.productsList = data.products },
  COOKIE_UPDATE_USER_UUID: (state, data) => { state.userUUID = data },
  BASKET_UPDATE: (state, data) => {
    if (data === {}) { return }
    state.basket = data.basket
  }
}

export const actions = {
  actionFetchProductsCatalogue: context => { productServiceFetchAllProducts(context) },
  actionFetchBasket: context => { basketServiceFetchBasket(context) },
  actionUpdateBasket: context => data => { context.commit('BASKET_UPDATE', data.basket) },
  actionAddProductWithQuantityOnBasket (context, {reference, quantity}) { basketServiceAddProductWithQuantity(context, reference, quantity) },
  actionDeleteProductOnBasket (context, reference) { basketServiceDeleteProductOnBasket(context, reference) },
  actionRemoveOnUnitFromProductOnBasket (context, {reference, quantity}) { basketServiceRemoveOnUnitFromProductOnBasket(context, reference, quantity) },
  actionCreateOrUpdateCookieUserUUID: context => {
    let uuid = (Cookie.get('user_uuid') === undefined) ? uuidv1() : Cookie.get('user_uuid')
    Cookie.set('user_uuid', uuid, { expires: 30 })
    context.commit('COOKIE_UPDATE_USER_UUID', uuid)
  }
}

export default new Vuex.Store({ state, getters, mutations, actions })
