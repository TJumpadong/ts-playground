import mongoose from 'mongoose'
import { IProduct } from '../interfaces/product'

import ProductModel from './product'

describe('ProductModel', () => {
  let productModel: ProductModel

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.set('useFindAndModify', false)

    productModel = new ProductModel()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create new product', async () => {
    const newProduct: IProduct = {
      name: 'product-01',
      price: 100,
      images: []
    }
    const result = await productModel.create(newProduct)
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('_id')
  })

  it('should get product by id', async () => {
    const newProduct: IProduct = {
      name: 'product-02',
      price: 100,
      images: []
    }
    const createdProduct = await productModel.create(newProduct)

    const result = await productModel.get(createdProduct._id as string)
    expect(result).toBeTruthy()
  })

  it('should get product list', async () => {
    const existingProducts = await productModel.list()
    const newProduct: IProduct = {
      name: 'product-03',
      price: 100,
      images: []
    }
    await productModel.create(newProduct)

    const result = await productModel.list()
    expect(result).toHaveLength(existingProducts.length + 1)
  })

  it('should get product list by ids', async () => {
    const newProduct: IProduct = {
      name: 'product-04',
      price: 100,
      images: []
    }
    const createdProduct = await productModel.create(newProduct)

    const unknownProductId = '5a1154523a6bcc1d245e143d'
    const firstAttempt = await productModel.list([unknownProductId])
    const secondAttempt = await productModel.list([createdProduct._id as string])
    expect(firstAttempt).toHaveLength(0)
    expect(secondAttempt).toHaveLength(1)
  })
})
