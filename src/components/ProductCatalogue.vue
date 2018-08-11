<template>
  <div class="">
    <div class="row">
      <div class="col-sm-4" v-for="(product, index) in this.getProductsList" :key="index">
        <div class="thumbnail">
          <a href="#" class="caption">
            <img v-bind:src="product['images_preview_url']" v-bind:title="product['name']" v-bind:alt="product['name']">
          </a>
          <h3>{{ product['name'] }}</h3>
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

  data () {
    return {
      catalogue: ((this.$store.getters.getProductsList.length > 1) ? this.$store.getters.getProductsList : this.actionFetchProductsCatalogue())
    }
  }
}
</script>

<style scoped></style>
