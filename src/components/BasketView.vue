<template>
  <div class="">
    <div v-if="error" class="error">
      {{ this.error }}
    </div>

    <div class="" v-if="this.getBasket !== null">
      <div class="panel panel-info">
        <div class="panel-heading">
          <div class="panel-title">
            Price total: {{ priceTotal }}
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
                </div>

                <div class="col-xs-4">
                  <strong>{{ product.quantity }}</strong>
                </div>

                <div class="col-xs-2">
                  <button type="button" class="btn btn-link btn-xs">
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                </div>

              </div>
            </div>
            <hr/>
          </div>
        </div>

        <div class="panel-footer">
          Footer TODO
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
    ...mapGetters(['getBasket', 'getProductQuantity', 'getProductsList'])
  },
  methods: {
    ...mapActions(['actionAddProductWithQuantityOnBasket']),
    calculateTotalPrice () {
      let result = 0.0
      this.getBasket.products.forEach(baskProduct => {
        result += baskProduct.quantity * baskProduct.product.price
      })
      return result
    },
    fetchData () {
      this.priceTotal = this.calculateTotalPrice()
    },
    addToBacket (reference, quantity) {
      store.dispatch('actionAddProductWithQuantityOnBasket', { 'reference': reference, 'quantity': quantity })
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
