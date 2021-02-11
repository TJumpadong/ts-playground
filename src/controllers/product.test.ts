import { NextFunction } from 'express'
import { cleanUpMetadata, results } from 'inversify-express-utils'

import { IProduct } from '../interfaces/product'
import { BaseProductModel } from '../models/product'
import ProductService from '../services/product'
import ProductController from './product'

class MockProductModel implements BaseProductModel {
  async list (): Promise<IProduct[]> {
    return []
  }

  async create (): Promise<IProduct> {
    const result: IProduct = {
      _id: 'product-01',
      name: 'product-01',
      price: 100,
      images: []
    }
    return result
  }

  async get (): Promise<IProduct | null> {
    const result: IProduct = {
      _id: 'product-01',
      name: 'product-01',
      price: 100,
      images: []
    }
    return result
  }
}

describe('ProductController', () => {
  const nextFunction: NextFunction = () => {}
  let controller: ProductController

  beforeEach(() => {
    cleanUpMetadata()
    controller = new ProductController(new ProductService(new MockProductModel()))
  })

  it('should get product list', async () => {
    const result = await controller.list(nextFunction)
    expect(result).toBeInstanceOf(results.JsonResult)
    expect(result?.statusCode).toBe(200)
    expect(result?.json).toEqual([])
  })

  it('should get product', async () => {
    const result = await controller.getById('123', nextFunction)
    expect(result).toBeInstanceOf(results.JsonResult)
    expect(result?.statusCode).toBe(200)
    expect(result?.json).toBeTruthy()
  })
})
