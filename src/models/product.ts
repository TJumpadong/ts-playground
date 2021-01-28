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

  list() {
    return this.model.find()
  }

  async create(product: IProduct) {
    const newProduct = new this.model(product)
    const createdProduct = await newProduct.save()
    return createdProduct
  }

  get(id: string) {
    return this.model.findById(id)
  }

  listByIds(ids: Array<string>) {
    return this.model.find({ _id: { $in: ids } })
  }
}

export default ProductModel
