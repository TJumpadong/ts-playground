import { injectable } from 'inversify'
import { Document, model, Model, Schema } from 'mongoose'

import { IProduct } from '../interfaces/product'

declare type ProductDocument = Document & IProduct

@injectable()
class ProductModel {
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
    const filterQuery: object = ids.length ? { _id: { $in: ids } } : {}
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
