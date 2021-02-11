import { injectable } from 'inversify'
import { Document, model, Model, Schema } from 'mongoose'

import { IProduct } from '../interfaces/product'

export type ProductDocument = Document & IProduct

export abstract class BaseProductModel {
  abstract create (product: IProduct): Promise<IProduct>
  abstract get (id: string): Promise<IProduct | null>
  abstract list (ids?: string[]): Promise<IProduct[]>
}

@injectable()
class ProductModel implements BaseProductModel {
  protected model: Model<ProductDocument>

  constructor () {
    const productSchema = new Schema({
      name: String,
      price: String,
      images: [String]
    })

    this.model = model<ProductDocument>('Product', productSchema)
  }

  async list (ids: string[] = []): Promise<IProduct[]> {
    const filterQuery: object = ids.length !== 0 ? { _id: { $in: ids } } : {}
    return await this.model.find(filterQuery)
  }

  async create (product: IProduct): Promise<IProduct> {
    const ProductDSModel = this.model
    const newProduct = new ProductDSModel(product)
    const createdProduct = await newProduct.save()
    return createdProduct
  }

  async get (id: string): Promise<IProduct | null> {
    return await this.model.findById(id)
  }
}

export default ProductModel
