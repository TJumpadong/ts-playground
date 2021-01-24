const mongoose = require('mongoose')

class ProductModel {
  constructor() {
    this.model = mongoose.model('Product', {
      name: String,
      price: Number,
      images: [String]
    })
  }

  list() {
    return this.model.find()
  }

  async create(product) {
    const newProduct = new this.model(product)
    const createdProduct = await newProduct.save()
    return createdProduct
  }

  get(id) {
    return this.model.findById(id)
  }

  listByIds(ids) {
    return this.model.find({ _id: { $in: ids } })
  }
}

module.exports = ProductModel
