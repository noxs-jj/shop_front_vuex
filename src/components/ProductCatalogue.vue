<template>
  <div class="">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="(product, index) in this.getProductsList" :key="index">
        <div class="thumbnail">

          <router-link :to="{ path: '/product/' + product['reference'] }">Go to Foo</router-link>

          <a href="#" class="caption">
            <img v-bind:src="product['images_preview_url']" v-bind:title="product['name']" v-bind:alt="product['name']">
          </a>

          <h3 class="text-center">{{ product['name'] }}</h3>

          <div class="row">
            <div class="col-xs-6">
              <p class="lead">{{ product['price']}}</p>
            </div>
            <div class="col-xs-6">
              <a href="#" class="btn btn-small btn-block btn-success">Add Basket</a>
            </div>
          </div>

          <p>{{ product['description'] }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCatalogue',
  computed: {
    ...mapGetters(['getProductsList'])
  },
  methods: {
    ...mapActions(['actionFetchProductsCatalogue'])
  },
  beforeCreate () {
    if (this.$store.getters.getProductsList.length === 0) {
      this.$store.dispatch('actionFetchProductsCatalogue')
    }
  }
}
</script>

<style scoped></style>
