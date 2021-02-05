import { injectable } from 'inversify'
import { model, Model, Schema } from 'mongoose'
import { IProduct, IProductDoc } from '../interfaces/product'

@injectable()
class ProductModel {
  protected model: Model<IProductDoc>

  constructor () {
    const productSchema = new Schema<IProduct>({
      name: String,
      price: String,
      images: [String]
    })

    this.model = model<IProductDoc>('Product', productSchema)
  }

  async list (): Promise<IProductDoc[]> {
    const products = await this.model.find()
    return products
  }

  async create (product: IProduct): Promise<IProductDoc> {
    const ProductDSModel = this.model
    const newProduct = new ProductDSModel(product)
    const createdProduct = await newProduct.save()
    return createdProduct
  }

  async get (id: string): Promise<IProductDoc | null> {
    return await this.model.findById(id)
  }

  async listByIds (ids: string[]): Promise<IProductDoc[]> {
    return await this.model.find({ _id: { $in: ids } })
  }
}

export default ProductModel
