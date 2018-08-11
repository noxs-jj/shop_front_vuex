const axios = require('axios')

const baseUri = process.env.SHOP_API

const productServiceFetchAllProducts = (context) => {
  axios.create({baseURL: baseUri}).get('/api/v1/products')
    .then(response => { context.commit('PRODUCTS_FETCH_LIST', response.data) })
    .catch(error => { error = '' })
}

module.exports = {
  productServiceFetchAllProducts
}
