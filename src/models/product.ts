import { injectable } from 'inversify'
import { model, Model, Schema } from 'mongoose'
import { IProduct, IProductDoc } from '../interfaces/product'

@injectable()
class ProductModel {
  protected model: Model<IProductDoc>

  constructor() {
    const productSchema = new Schema<IProduct>({
      name: String,
      price: String,
      images: [String],
    })
    
    this.model = model<IProductDoc>('Product', productSchema)
  }

  async list(): Promise<IProductDoc[]> {
    const products = await this.model.find()
    return products
  }

  async create(product: IProduct) {
    const newProduct = new this.model(product)
    const createdProduct = await newProduct.save()
    return createdProduct
  }

  async get(id: string): Promise<IProductDoc | null> {
    return this.model.findById(id)
  }

  listByIds(ids: string[]) {
    return this.model.find({ _id: { $in: ids } })
  }
}

export default ProductModel
