import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import ProductService from './services/product'
import CartService from './services/cart'
import OrderService from './services/order'
import ProductModel from './models/product'
import CartModel from './models/cart'
import OrderModel from './models/order'

import config from './config'

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const MOCK_USER_ID = '1'

// const users = [{
//   id: MOCK_USER_ID,
//   firstname: 'F',
//   lastname: 'L',
//   email: 'a@b.com'
// }]

mongoose.connect('mongodb://localhost:27017/e-shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.dbUser,
  pass: config.dbPassword,
  authSource: config.dbAuthSource,
})
mongoose.set('useFindAndModify', false)

const getUserIdFromSession = () => MOCK_USER_ID

const productModel = new ProductModel()
const cartModel = new CartModel()
const orderModel = new OrderModel()
const productService = new ProductService(productModel)
const cartService = new CartService(cartModel, productModel)
const orderService = new OrderService(orderModel, cartModel, productModel)

// READ ME FIRST
// On the first run, please uncomment this to generate mock data

// const testingProduct1 = new productModel.model({
//   id: '1',
//   name: 'Product 1',
//   price: 100,
//   images: ['https://purr.objects-us-east-1.dream.io/i/Geqgs.jpg'],
// })
// const testingProduct2 = new productModel.model({
//   id: '2',
//   name: 'Product 2',
//   price: 500,
//   images: ['https://purr.objects-us-east-1.dream.io/i/1276001593_201006082154274911254601_0.jpg'],
// })
// const testingProduct3 = new productModel.model({
//   id: '3',
//   name: 'Product 3',
//   price: 10,
//   images: ['https://purr.objects-us-east-1.dream.io/i/392616_10151525292071211_2030227685_n.jpg'],
// })

// testingProduct1.save().then(() => console.log('SAVE PRODUCT 1'))
// testingProduct2.save().then(() => console.log('SAVE PRODUCT 2'))
// testingProduct3.save().then(() => console.log('SAVE PRODUCT 3'))

// TODO: store config/secret in process.env for each env (test/production)
// TODO: query/body validation middleware
// TODO: error handler
// TODO: handle parsing data type

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/products', async (req, res) => {
  const products = await productService.list()
  res.json(products)
})

app.get('/products/:productId', async (req, res, next) => {
  try {
    // validate productId
    const { productId } = req.params
    const product = await productService.get(productId)

    res.json(product)
  } catch (err) {
    next(err)
  }
})

app.get('/carts', async (req, res) => {
  const userId = getUserIdFromSession()
  const cartItemSummary = await cartService.getItemSummary(userId)
  res.json(cartItemSummary)
})

app.put('/carts', async (req, res) => {
  const userId = getUserIdFromSession()
  const productId = req.body.productId
  const rawQuantity = req.body.quantity
  const quantity = parseInt(rawQuantity, 10)

  const cartItemSummary = await cartService.update(userId, productId, quantity)

  res.json(cartItemSummary)
})

app.post('/orders', async (req, res) => {
  const userId = getUserIdFromSession()
  const address = req.body.address

  const order = await orderService.create(userId, address)
  res.json(order)
})

app.get('/orders', async (req, res) => {
  const userId = getUserIdFromSession()
  const orders = await orderService.list(userId)
  res.json(orders)
})

app.get('/orders/:orderId', async (req, res) => {
  const userId = getUserIdFromSession()
  const orderId = req.params.orderId

  const order = await orderService.get(userId, orderId)

  res.json(order)
})

// error handlers
app.use((err, _req, res, _next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
