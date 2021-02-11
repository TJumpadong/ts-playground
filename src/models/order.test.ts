import mongoose from 'mongoose'

import { IOrder } from '../interfaces/order'

import OrderModel from './order'

describe('OrderModel', () => {
  let orderModel: OrderModel

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.set('useFindAndModify', false)

    orderModel = new OrderModel()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create new order', async () => {
    const newOrder: IOrder = {
      userId: 'user-create-order',
      address: 'NYC',
      cartId: 'cart-01',
      items: [{
        _id: 'product-01',
        quantity: 1
      }],
      price: 100,
      totalPrice: 100
    }
    const result = await orderModel.create(newOrder)
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('_id')
  })

  it('should get order list', async () => {
    const userToListOrder = 'user-list-order'
    const newOrder: IOrder = {
      userId: userToListOrder,
      address: 'NYC',
      cartId: 'cart-02',
      items: [{
        _id: 'product-02',
        quantity: 1
      }],
      price: 100,
      totalPrice: 100
    }
    await orderModel.create(newOrder)

    const result = await orderModel.list(userToListOrder)
    expect(result).toBeTruthy()
    expect(result).toHaveLength(1)
  })

  it('should get order by id', async () => {
    const userToGetOrder = 'user-get-order'
    const newOrder: IOrder = {
      userId: userToGetOrder,
      address: 'NYC',
      cartId: 'cart-03',
      items: [{
        _id: 'product-03',
        quantity: 1
      }],
      price: 100,
      totalPrice: 100
    }
    const createdOrder = await orderModel.create(newOrder)

    const result = await orderModel.get(userToGetOrder, createdOrder._id as string)
    expect(result).toBeTruthy()
  })
})
