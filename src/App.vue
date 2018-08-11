<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron">
        <h1>Shop</h1>
        {{ basketCount }}
      </div>

      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const axios = require('axios')

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getProductsList', 'getUserUUID'])
  },
  methods: {
    ...mapActions(['actionFetchProductsCatalogue']),
    fetchData () {
      console.log('App fetchData')
      this.basketCount = this.getBasketProductsCount
      if (this.basketCount === 0) {
        this.error = null
        axios.create({baseURL: process.env.SHOP_API}).get('/api/v1/basket/' + this.getUserUUID + '/show')
          .then(response => {
            console.log('App 0')
            this.$store.dispatch('actionUpdateBasket', response.data)
            this.basketCount = this.getBasketProductsCount
          })
          .catch(error => {
            console.log('App 1')
            this.error = error.toString()
          })
      }
    }
  },
  create () {
    console.log('APP create')
    this.fetchData()
  },
  data () {
    return {
      error: null,
      basketCount: 0
    }
  }
}
</script>

<style></style>
