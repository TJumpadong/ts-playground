const mongoose = require('mongoose')

class CartModel {
  constructor() {
    this.model = mongoose.model('Cart', {
      userId: String,
      items: [{ _id: mongoose.ObjectId, quantity: Number}]
    })
  }

  getByOwnerId(userId) {
    return this.model.findOne({ userId })
  }

  updateOrCreate(userId, cart) {
    return this.model.findOneAndUpdate({ userId }, cart, { new: true, upsert: true })
  }

  removeByOwnerId(userId) {
    return this.model.deleteOne({ userId })
  }
}

module.exports = CartModel
