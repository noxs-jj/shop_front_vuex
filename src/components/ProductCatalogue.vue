<template>
  <div class="">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="(product, index) in this.getProductsList" :key="index">
        <div class="thumbnail">

          <div class="caption">
            <router-link :to="{ path: '/product/' + product['reference'] }">
                <img v-bind:src="product['images_preview_url']" v-bind:title="product['name']" v-bind:alt="product['name']">
            </router-link>
          </div>

          <h3 class="text-center">{{ product['name'] }}</h3>

          <div class="row">
            <div class="col-xs-6">
              <p class="lead">{{ product['price']}}</p>
            </div>
            <div class="col-xs-6">
              <AddProductBasketButton v-bind:productReference="product['reference']" />
            </div>
          </div>

          <p>{{ product['description'] }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddProductBasketButton from '@/components/AddProductBasketButton'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
  name: 'ProductCatalogue',
  components: {
    AddProductBasketButton
  },
  computed: {
    ...mapGetters(['getProductsList'])
  },
  methods: {
    ...mapActions(['actionFetchProductsCatalogue'])
  },
  beforeCreate () {
    if (this.$store.getters.getProductsList.length === 0) {
      store.dispatch('actionFetchProductsCatalogue')
    }
  }
}
</script>

<style scoped></style>
