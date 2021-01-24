class ProductService {
  constructor(productModel) {
    this.productModel = productModel
  }

  list() {
    return this.productModel.list()
  }

  async get(id) {
    const product = await this.productModel.get(id)
    if (!product) throw new Error('Product not found')

    return product
  }
}

module.exports = ProductService
