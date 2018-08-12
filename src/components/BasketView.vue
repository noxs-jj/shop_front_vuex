<template>
  <div class="">
    <div v-if="error" class="error">
      {{ this.error }}
    </div>

    <div class="" v-if="this.getBasket !== null">
      <div class="panel panel-info">
        <div class="panel-heading">
          <div class="panel-title">

            <div class="row">
              <div class="col-xs-6">
                <h5><span class="glyphicon glyphicon-shopping-cart"></span>Shopping Cart</h5>
              </div>
              <div class="col-xs-6">
                <router-link :to="{ path: '/' }">
                  <button class="btn btn-primary btn-sm btn-block">
                    <span class="glyphicon glyphicon-share-alt"></span> Continue shopping
                  </button>
                </router-link>
              </div>
            </div>
          </div>

        </div>

        <div class="panel-body">
          <div v-for="(product, index) in this.getBasket.products" :key="index">
            <div class="row">
              <div class="col-xs-2">
                <img
                  class="image-thumbnail"
                  v-bind:src="product.product.images_preview_url"
                  v-bind:title="product.product.name"
                  v-bind:alt="product.product.name"
                >
              </div>

              <div class="col-xs-4">
                <h4 class="product-name"><strong>{{ product.product.name }}</strong></h4>
                <h4><small>{{ product.product.description }}</small></h4>
              </div>

              <div class="col-xs-6">
                <div class="col-xs-6 text-right">
                  <h6>
                    <strong>{{ product.product.price }}</strong>
                    <span class="text-muted">x</span>
                  </h6>
                  <strong>= {{ (product.product.price * product.quantity).toFixed(2) }}</strong>
                </div>

                <div class="col-xs-4">
                  <br>
                  <button type="button" class="btn btn-link btn-xs" v-on:click="addToBacket(product.product.reference, 1)">
                    <span class="glyphicon glyphicon-plus-sign"></span>
                  </button>
                  <strong>{{ product.quantity }}</strong>
                  <button type="button" class="btn btn-link btn-xs" v-on:click="removeOnUnitFromProduct(product.product.reference, 1)">
                    <span class="glyphicon glyphicon-minus-sign"></span>
                  </button>
                </div>

                <div class="col-xs-2">
                  <br>
                  <button type="button" class="btn btn-link btn-xs" v-on:click="deleteProduct(product.product.reference)">
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                </div>

              </div>
            </div>
            <hr/>
          </div>
        </div>

        <div class="panel-footer">
          <div class="row">
            <div class="col-xs-9">
              <h4 class="text-right">Total: {{ priceTotal.toFixed(2) }}</h4>
            </div>
            <div class="col-xs-3">
              <button class="btn btn-default btn-block">
                ...Checkout Soon
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
  name: 'BasketView',
  computed: {
    ...mapGetters([
      'getBasket',
      'getProductQuantity',
      'getProductsList'
    ])
  },
  methods: {
    ...mapActions([
      'actionAddProductWithQuantityOnBasket',
      'actionDeleteProductOnBasket',
      'actionRemoveOnUnitFromProductOnBasket'
    ]),
    calculateTotalPrice () {
      let result = 0.0
      if (this.getBasket === null) { return result }
      this.getBasket.products.forEach(baskProduct => {
        result += baskProduct.quantity * baskProduct.product.price
      })
      return result
    },
    fetchData () {
      this.priceTotal = this.calculateTotalPrice()
    },
    addToBacket (reference, quantity) {
      store.dispatch('actionAddProductWithQuantityOnBasket', { reference, quantity })
    },
    deleteProduct (reference) {
      store.dispatch('actionDeleteProductOnBasket', reference)
    },
    removeOnUnitFromProduct (reference, quantity) {
      store.dispatch('actionRemoveOnUnitFromProductOnBasket', { reference, quantity })
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  updated () {
    this.fetchData()
  },
  created () {
    this.fetchData()
  },

  data () {
    return {
      loading: true,
      error: null,
      priceTotal: 0.0
    }
  }
}
</script>

<style scoped>
.image-thumbnail {
  width: 128px;
  height: 96px;
}
</style>
