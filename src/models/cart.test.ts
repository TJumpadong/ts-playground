import mongoose from 'mongoose'
import { ICart } from '../interfaces/cart'

import CartModel from './cart'

describe('CartModel', () => {
  let cartModel: CartModel

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    mongoose.set('useFindAndModify', false)

    cartModel = new CartModel()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create new cart', async () => {
    const userToCreateCart = 'user-create-cart'
    const newCart: ICart = {
      userId: userToCreateCart,
      items: []
    }
    const result = await cartModel.updateOrCreate(newCart)
    expect(result).toBeDefined()
  })

  it('should update existing cart', async () => {
    const userToUpdateCart = 'user-update-cart'
    const newCart: ICart = {
      userId: userToUpdateCart,
      items: []
    }
    await cartModel.updateOrCreate(newCart)

    const cartWithNewItems: ICart = {
      userId: userToUpdateCart,
      items: [{
        _id: 'item-01',
        quantity: 1
      }]
    }
    const result = await cartModel.updateOrCreate(cartWithNewItems)
    expect(result).toBeDefined()
    expect(result.items).toHaveLength(1)
  })

  it('should get back cart', async () => {
    const userToGetCart = 'user-get-cart'
    const newCart: ICart = {
      userId: userToGetCart,
      items: []
    }
    await cartModel.updateOrCreate(newCart)

    const result = await cartModel.getByOwnerId(userToGetCart)
    expect(result).toBeTruthy()
  })

  // it('should remove cart', () => {

  // })

  // it('should get summary back', () => {

  // })
})

// const getCartItemSummary = require('./getCartSummary').default
// const mockObjectId = (val) => ({
//   val,
//   equals: term => val === term.val
// })

// describe('getCartItemSummary module unit tests', () => {
//   test('cart empty', () => {
//     const result = getCartItemSummary()
//     expect(result).toEqual({
//       items: [],
//       price: 0,
//       totalPrice: 0
//     })
//   })

//   test('product not found', () => {
//     const cart = {
//       items: [{
//         _id: mockObjectId('1'),
//         quantity: 1
//       }]
//     }

//     const result = getCartItemSummary(cart)
//     expect(result).toEqual({
//       items: [],
//       price: 0,
//       totalPrice: 0
//     })
//   })

//   test('single item', () => {
//     const cart = {
//       items: [{
//         _id: mockObjectId('1'),
//         quantity: 1
//       }]
//     }
//     const products = [{
//       _id: mockObjectId('1'),
//       price: 10
//     }]

//     const result = getCartItemSummary(cart, products)
//     expect(result.items).toHaveLength(1)
//     expect(result.price).toEqual(10)
//     expect(result.totalPrice).toEqual(10.7)
//   })

//   test('multiple items', () => {
//     const cart = {
//       items: [{
//         _id: mockObjectId('1'),
//         quantity: 1
//       }, {
//         _id: mockObjectId('2'),
//         quantity: 1
//       }]
//     }
//     const products = [{
//       _id: mockObjectId('1'),
//       price: 10
//     }, {
//       _id: mockObjectId('2'),
//       price: 10
//     }]

//     const result = getCartItemSummary(cart, products)
//     expect(result.items).toHaveLength(2)
//     expect(result.price).toEqual(20)
//     expect(result.totalPrice).toEqual(21.4)
//   })

//   test('mixed items', () => {
//     const cart = {
//       items: [{
//         _id: mockObjectId('1'),
//         quantity: 1
//       }, {
//         _id: mockObjectId('2'),
//         quantity: 2
//       }]
//     }
//     const products = [{
//       _id: mockObjectId('1'),
//       price: 10
//     }, {
//       _id: mockObjectId('2'),
//       price: 10
//     }]

//     const result = getCartItemSummary(cart, products)
//     expect(result.items).toHaveLength(2)
//     expect(result.price).toEqual(30)
//     expect(result.totalPrice).toEqual(32.1)
//   })
// })
