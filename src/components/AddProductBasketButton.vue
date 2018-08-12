<template>
  <div class="">
    <div class="row">
      <div class="col-xs-2">
        {{ this.getProductQuantity(this.productReference) }}
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button
          v-on:click="addToBacket(reference, 1)"
          class="btn btn-small btn-block btn-success">
            Add Basket<br/>{{ reference }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
  name: 'AddProductBasketButton',
  props: ['productReference'],
  computed: {
    ...mapGetters(['getProductQuantity'])
  },
  methods: {
    ...mapActions(['actionAddProductWithQuantityOnBasket']),
    fetchData () {
      this.quantity = this.getProductQuantity(this.productReference)
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
      reference: this.productReference
    }
  }
}
</script>

<style scoped></style>
