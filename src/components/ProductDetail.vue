<template>
  <div v-if="this.loading" class="loading">
    Loading...
  </div>
  <div v-else-if="error" class="error">
    {{ this.error }}
  </div>

  <div v-else-if="this.product" class="row">

      <div class="row">
        <div class="col-xs-6">
          <h1>{{ this.product['name'] }}</h1>
        </div>
        <div class="col-xs-4">
          <p class="lead">{{ this.product['price'] }}</p>
        </div>
        <div class="col-xs-2">
          <button class="btn btn-small btn-block btn-success">Add Basket</button>
        </div>
      </div>

    <div class="owncarousel">
      <div class="carousel slide">

        <ol class="carousel-indicators">
          <li v-for="(carousel, index) in product['images_caroussel']"
              :key="index"
              v-bind:class="[ (index === carouselImage) ? 'active' : '' ]"
          ></li>
        </ol>

        <div class="carousel-inner" role="listbox" v-for="(carousel, index) in product['images_caroussel']" :key="index">
          <div v-bind:class="[ (index === carouselImage) ? 'item active' : 'item' ]">
            <img v-bind:src="carousel" v-bind:alt="product['name']">
          </div>
        </div>

        <a class="left carousel-control" v-on:click="imagePrevious" role="button">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" v-on:click="imageNext" role="button">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>

      </div>

    </div>

    <br>
    <br>
    <br>

    <div class="panel panel-default">
      <div class="panel-body">
        {{ this.product['long_description'] }}
      </div>
    </div>

  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ProductDetail',
  methods: {
    fetchData () {
      this.error = this.product = null
      this.loading = true
      axios.create({baseURL: process.env.SHOP_API}).get('/api/v1/product/' + this.$route.params.ref + '/show')
        .then(response => {
          this.loading = false
          this.product = response.data.product
          this.carouselLength = this.product['images_caroussel'].length
        })
        .catch(error => {
          this.error = error.toString()
        })
    },
    imageNext: function () {
      this.carouselImage += 1
      if (this.carouselImage > this.carouselLength - 1) {
        this.carouselImage = 0
      }
    },
    imagePrevious: function () {
      this.carouselImage -= 1
      if (this.carouselImage < 0) {
        this.carouselImage = this.carouselLength - 1
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  },

  data () {
    return {
      loading: false,
      product: null,
      error: null,
      carouselImage: 0,
      carouselLength: 0
    }
  }
}
</script>

<style scoped>
.owncarousel {
  max-width: 640px;
  width: 640px;
  float: none;
  margin: 0 auto;
}
</style>
