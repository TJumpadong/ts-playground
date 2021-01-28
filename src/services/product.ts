import { injectable, inject } from 'inversify'

import { MODEL_IDENTIFIER } from '../constants/identifiers'
import { IProductDoc } from '../interfaces/product'
import ProductModel from "../models/product"

@injectable()
class ProductService {
  protected productModel: ProductModel

  constructor(@inject(MODEL_IDENTIFIER.PRODUCT) productModel: ProductModel) {
    this.productModel = productModel
  }

  list() {
    return this.productModel.list()
  }

  async get(id: string): Promise<IProductDoc> {
    const product: IProductDoc = await this.productModel.get(id)
    if (!product) throw new Error('Product not found')

    return product
  }
}

export default ProductService
