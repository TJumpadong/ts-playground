import ProductModel, { IProductDoc } from "../models/product"

class ProductService {
  protected productModel: ProductModel

  constructor(productModel: ProductModel) {
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
