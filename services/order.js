const getCartItemSummary = require('../modules/getCartItemSummary')

class OrderService {
  constructor(orderModel, cartModel, productModel) {
    this.orderModel = orderModel
    this.cartModel = cartModel
    this.productModel = productModel
  }

  async create(userId, address) {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (!cart) return {}
    const cartItemIds = cart.items.map(item => item._id)
    const products = await this.productModel.listByIds(cartItemIds)

    const cartItemSummary = getCartItemSummary(cart, products)
    const order = {
      address,
      userId: cart.userId,
      orderId: cart.id,
      items: cart.items,
      price: cartItemSummary.price,
      totalPrice: cartItemSummary.totalPrice,
    }

    // check result
    const createdOrder = await this.orderModel.create(order)

    // reset cart
    await this.cartModel.removeByOwnerId(userId)

    // return orderId
    return createdOrder
  }

  async list(userId) {
    const orders = await this.orderModel.list(userId)
    return orders.map(order => ({ _id: order._id }))
  }

  get(userId, orderId) {
    return this.orderModel.get(userId, orderId)
  }
}

module.exports = OrderService
