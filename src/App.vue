<template>
  <div id="app">
    <div class="container">
      <div class="jumbotron">
        <router-link :to="{ path: '/' }"><h1>Shop</h1></router-link>
        <router-link :to="{ path: '/basketview' }">
          <span class="glyphicon glyphicon-shopping-cart"></span>
          {{ this.getBasketProductsCount }}
        </router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getBasketProductsCount'])
  }
}
</script>

<style></style>
