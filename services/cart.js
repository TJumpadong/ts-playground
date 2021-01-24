const getCartItemSummary = require('../modules/getCartItemSummary')

class CartService {
  constructor(cartModel, productModel) {
    this.cartModel = cartModel
    this.productModel = productModel
  }

  async getItemSummary(userId) {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (!cart) return {}

    const cartItemIds = cart.items.map(item => item._id)
    const products = await this.productModel.listByIds(cartItemIds)

    return getCartItemSummary(cart, products)
  }

  async getByOwnerId(userId) {
    const cart = await this.cartModel.get({ userId })
    if (!cart) throw new Error('Product not found')

    return cart
  }

  async update(userId, productId, quantity) {
    // validate productId
    // validate quantity
    // update cart items
    const existingCart = await this.cartModel.getByOwnerId(userId)
    const cart = existingCart || {
      userId,
      items: []
    }

    const itemIndex = cart.items.findIndex(item => item._id.equals(productId))
    const item = cart.items[itemIndex]

    // final quantity should not be less than 0
    if (item) {
      const finalQuantity = item.quantity + quantity
      if (finalQuantity <= 0) {
        cart.items.splice(itemIndex, 1)
      } else {
        item.quantity = finalQuantity
      }
    } else {
      cart.items.push({ _id: productId, quantity })
    }

    await this.cartModel.updateOrCreate(userId, cart)
    return this.getItemSummary(userId)
  }
}

module.exports = CartService
