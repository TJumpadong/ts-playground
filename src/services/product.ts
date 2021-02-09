import { injectable, inject } from 'inversify'

import { MODEL_IDENTIFIER } from '../constants/identifiers'
import { IProduct } from '../interfaces/product'

import ProductModel from '../models/product'

import { NotFoundError } from '../utils/error'

@injectable()
class ProductService {
  constructor (
    @inject(MODEL_IDENTIFIER.PRODUCT) protected productModel: ProductModel
  ) {}

  async list (): Promise<IProduct[]> {
    return await this.productModel.list()
  }

  async get (id: string): Promise<IProduct> {
    const product = await this.productModel.get(id)
    if (product === null) throw new NotFoundError('Product not found')

    return product
  }
}

export default ProductService
