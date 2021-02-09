import mongoose from 'mongoose'

import { ICart } from '../interfaces/cart'
import { IProduct } from '../interfaces/product'

import CartModel from './cart'

describe('CartModel', () => {
  let cartModel: CartModel

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.set('useFindAndModify', false)

    cartModel = new CartModel()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should create new cart', async () => {
    const userToCreateCart = 'user-create-cart'
    const newCart: ICart = {
      userId: userToCreateCart,
      items: []
    }
    const result = await cartModel.updateOrCreate(newCart)
    expect(result).toBeTruthy()
  })

  test('should update existing cart', async () => {
    const userToUpdateCart = 'user-update-cart'
    const newCart: ICart = {
      userId: userToUpdateCart,
      items: []
    }
    await cartModel.updateOrCreate(newCart)

    const cartWithNewItems: ICart = {
      userId: userToUpdateCart,
      items: [{
        _id: 'product-01',
        quantity: 1
      }]
    }
    const result = await cartModel.updateOrCreate(cartWithNewItems)
    expect(result).toBeTruthy()
    expect(result.items).toHaveLength(1)
  })

  test('should get back cart', async () => {
    const userToGetCart = 'user-get-cart'
    const newCart: ICart = {
      userId: userToGetCart,
      items: []
    }
    await cartModel.updateOrCreate(newCart)

    const result = await cartModel.getByOwnerId(userToGetCart)
    expect(result).toBeTruthy()
  })

  test('should remove cart', async () => {
    const userToDeleteCart = 'user-delete-cart'
    const newCart: ICart = {
      userId: userToDeleteCart,
      items: []
    }
    await cartModel.updateOrCreate(newCart)
    await cartModel.removeByOwnerId(userToDeleteCart)

    const result = await cartModel.getByOwnerId(userToDeleteCart)
    expect(result).toBeNull()
  })

  describe('getSummary', () => {
    test('product not found', () => {
      const cart: ICart = {
        userId: 'user-01',
        items: [{
          _id: 'product-01',
          quantity: 1
        }]
      }
      const products: IProduct[] = []
      const result = cartModel.getSummary(cart, products)
      expect(result).toEqual({
        items: [],
        price: 0,
        totalPrice: 0
      })
    })

    test('single item', () => {
      const cart: ICart = {
        userId: 'user-01',
        items: [{
          _id: 'product-01',
          quantity: 1
        }]
      }
      const products: IProduct[] = [{
        _id: 'product-01',
        price: 10,
        name: 'product-01',
        images: []
      }]

      const result = cartModel.getSummary(cart, products)
      expect(result.items).toHaveLength(1)
      expect(result.price).toEqual(10)
      expect(result.totalPrice).toEqual(10.7)
    })

    test('multiple items', () => {
      const cart: ICart = {
        userId: 'user-01',
        items: [{
          _id: 'product-01',
          quantity: 1
        }, {
          _id: 'product-02',
          quantity: 1
        }]
      }
      const products: IProduct[] = [{
        _id: 'product-01',
        price: 10,
        name: 'product-01',
        images: []
      }, {
        _id: 'product-02',
        price: 10,
        name: 'product-02',
        images: []
      }]

      const result = cartModel.getSummary(cart, products)
      expect(result.items).toHaveLength(2)
      expect(result.price).toEqual(20)
      expect(result.totalPrice).toEqual(21.4)
    })

    test('mixed items', () => {
      const cart: ICart = {
        userId: 'user-01',
        items: [{
          _id: 'product-01',
          quantity: 1
        }, {
          _id: 'product-02',
          quantity: 2
        }]
      }
      const products: IProduct[] = [{
        _id: 'product-01',
        price: 10,
        name: 'product-01',
        images: []
      }, {
        _id: 'product-02',
        price: 10,
        name: 'product-02',
        images: []
      }]

      const result = cartModel.getSummary(cart, products)
      expect(result.items).toHaveLength(2)
      expect(result.price).toEqual(30)
      expect(result.totalPrice).toEqual(32.1)
    })
  })
})
