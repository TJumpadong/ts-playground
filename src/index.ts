import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './api'
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

mongoose.connect('mongodb://localhost:27017/e-shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.dbUser,
  pass: config.dbPassword,
  authSource: config.dbAuthSource,
})
mongoose.set('useFindAndModify', false)

const getUserIdFromSession = () => MOCK_USER_ID

// const productModel = new ProductModel()
// const cartModel = new CartModel()
// const orderModel = new OrderModel()
// const productService = new ProductService(productModel)
// const cartService = new CartService(cartModel, productModel)
// const orderService = new OrderService(orderModel, cartModel, productModel)

// TODO: store config/secret in process.env for each env (test/production)
// TODO: query/body validation middleware
// TODO: error handler
// TODO: handle parsing data type

app.get('/', (req, res) => {
  res.send('ok')
})

app.use(routes())

// app.get('/carts', async (req, res) => {
//   const userId = getUserIdFromSession()
//   const cartItemSummary = await cartService.getItemSummary(userId)
//   res.json(cartItemSummary)
// })

// app.put('/carts', async (req, res) => {
//   const userId = getUserIdFromSession()
//   const productId = req.body.productId
//   const rawQuantity = req.body.quantity
//   const quantity = parseInt(rawQuantity, 10)

//   const cartItemSummary = await cartService.update(userId, productId, quantity)

//   res.json(cartItemSummary)
// })

// app.post('/orders', async (req, res) => {
//   const userId = getUserIdFromSession()
//   const address = req.body.address

//   const order = await orderService.create(userId, address)
//   res.json(order)
// })

// app.get('/orders', async (req, res) => {
//   const userId = getUserIdFromSession()
//   const orders = await orderService.list(userId)
//   res.json(orders)
// })

// app.get('/orders/:orderId', async (req, res) => {
//   const userId = getUserIdFromSession()
//   const orderId = req.params.orderId

//   const order = await orderService.get(userId, orderId)

//   res.json(order)
// })

// error handlers
app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  // res.status(err.status || 500)
  res.status(500)
  res.json({
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
