const mongoose = require('mongoose')

class OrderModel {
  constructor() {
    this.model = mongoose.model('Order', {
      address: String,
      userId: String,
      orderId: mongoose.ObjectId,
      items: [{ _id: mongoose.ObjectId, quantity: Number}],
      price: Number,
      totalPrice: Number,
    })
  }

  async create(order) {
    const newOrder = new this.model(order)
    const createdOrder = await newOrder.save()
    return createdOrder
  }

  list(userId) {
    return this.model.find({ userId })
  }

  get(userId, orderId) {
    return this.model.findOne({ _id: orderId, userId })
  }
}

module.exports = OrderModel
