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

  async list (): Promise<IProduct[]> {
    const products = await this.model.find()
    return products
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

  async listByIds (ids: string[]): Promise<IProduct[]> {
    return await this.model.find({ _id: { $in: ids } }).lean()
  }
}

export default ProductModel
