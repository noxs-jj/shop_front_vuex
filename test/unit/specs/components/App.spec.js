import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '@/App'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  let getters = null
  let store = null
  let wrapper = null

  beforeEach(() => {
    getters = {
      getBasketProductsCount: () => '3'
    }
    store = new Vuex.Store({getters})
    wrapper = shallowMount(App, { store, localVue, VueRouter, stubs: ['router-link', 'router-view'] })
  })

  it('should render basket product number with correct contents', () => {
    const basketNumber = wrapper.find('#basket-product-numbers')
    expect(basketNumber.text()).toBe(getters.getBasketProductsCount())
  })

  it('should render Jumbotron h1 with correct contents', () => {
    const h1 = wrapper.find('.jumbotron h1')
    expect(h1.text()).toBe('Shop')
  })
})
