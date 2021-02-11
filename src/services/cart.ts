import { injectable, inject } from 'inversify'

import { MODEL_IDENTIFIER } from '../constants/identifiers'
import { ICart, ICartItem, ICartSummary } from '../interfaces/cart'

import CartModel from '../models/cart'
import ProductModel from '../models/product'

@injectable()
class CartService {
  constructor (
    @inject(MODEL_IDENTIFIER.CART) protected cartModel: CartModel,
    @inject(MODEL_IDENTIFIER.PRODUCT) protected productModel: ProductModel
  ) {}

  async getItemSummary (userId: string): Promise<ICartSummary> {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (cart === null) {
      const emptyCartSummary: ICartSummary = { items: [], price: 0, totalPrice: 0 }
      return emptyCartSummary
    }

    const cartItemIds = cart.items.map(item => item._id)
    const products = await this.productModel.list(cartItemIds)

    return this.cartModel.getSummary(cart, products)
  }

  async getByOwnerId (userId: string): Promise<ICart> {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (cart === null) throw new Error('Product not found')

    return cart
  }

  async update (userId: string, productId: string, quantity: number): Promise<ICartSummary> {
    // validate productId
    // validate quantity
    // update cart items
    const existingCart = await this.cartModel.getByOwnerId(userId)
    const newCart: ICart = {
      userId,
      items: []
    }
    const cart = existingCart ?? newCart

    const itemIndex: number = cart.items.findIndex(item => item._id === productId)
    const item: ICartItem = cart.items[itemIndex]

    // final quantity should not be less than 0
    if (item !== null) {
      const finalQuantity: number = item.quantity + quantity
      if (finalQuantity <= 0) {
        cart.items.splice(itemIndex, 1)
      } else {
        item.quantity = finalQuantity
      }
    } else {
      cart.items.push({ _id: productId, quantity })
    }

    await this.cartModel.updateOrCreate(cart)
    return this.getItemSummary(userId)
  }
}

export default CartService
