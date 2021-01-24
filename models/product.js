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

  // async create(product) {
  //   const result = await this.model(product)
  //   console.log(result)
  //   return true
  // }

  get(id) {
    return this.model.findById(id)
  }

  listByIds(ids) {
    return this.model.find({ _id: { $in: ids } })
  }
}

module.exports = ProductModel
