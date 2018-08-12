const axios = require('axios')
const Cookie = require('js-cookie')
const baseUri = process.env.SHOP_API

const basketServiceFetchBasket = (context) => {
  const userUUID = Cookie.get('user_uuid')

  axios.create({baseURL: baseUri}).get('/api/v1/basket/' + userUUID + '/show')
    .then(response => { context.commit('BASKET_UPDATE', response.data) })
    .catch(error => { error = '' })
}

const basketServiceAddProductWithQuantity = (context, reference, quantity) => {
  const userUUID = Cookie.get('user_uuid')
  const body = { 'product_ref': reference, 'add': quantity }
  const headers = { 'Content-Type': 'application/json' }

  axios.create({baseURL: baseUri}).post('/api/v1/basket/' + userUUID + '/add', body, { headers })
    .then(response => { context.commit('BASKET_UPDATE', response.data) })
    .catch(error => { error = '' })
}

const basketServiceDeleteProductOnBasket = (context, reference) => {
  const quantity = context.getters.getProductQuantity(reference) + 1
  basketServiceAddProductWithQuantity(context, reference, -quantity)
}

const basketServiceRemoveOnUnitFromProductOnBasket = (context, reference, quantity) => {
  basketServiceAddProductWithQuantity(context, reference, -quantity)
}

module.exports = {
  basketServiceFetchBasket,
  basketServiceAddProductWithQuantity,
  basketServiceDeleteProductOnBasket,
  basketServiceRemoveOnUnitFromProductOnBasket
}
