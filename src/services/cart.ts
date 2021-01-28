import { ICart, ICartItem } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'
import getCartSummary, { ICartSummary } from '../modules/getCartSummary'
import CartModel from '../models/cart'
import ProductModel from '../models/product'

class CartService {
  protected cartModel: CartModel
  protected productModel: ProductModel

  constructor(cartModel: CartModel, productModel: ProductModel) {
    this.cartModel = cartModel
    this.productModel = productModel
  }

  async getItemSummary(userId: string): Promise<ICartSummary> {
    const cart: ICart = await this.cartModel.getByOwnerId(userId)
    if (!cart) {
      const emptyCartSummary: ICartSummary = { items: [], price: 0, totalPrice: 0 }
      return emptyCartSummary
    }

    const cartItemIds: Array<string> = cart.items.map(item => item._id)
    const products: Array<IProductDoc> = await this.productModel.listByIds(cartItemIds)

    return getCartSummary(cart, products)
  }

  async getByOwnerId(userId: string): Promise<ICart> {
    const cart: ICart = await this.cartModel.getByOwnerId(userId)
    if (!cart) throw new Error('Product not found')

    return cart
  }

  async update(userId: string, productId: string, quantity: number) {
    // validate productId
    // validate quantity
    // update cart items
    const existingCart: ICart = await this.cartModel.getByOwnerId(userId)
    const newCart: ICart = {
      userId,
      items: [],
    }
    const cart = existingCart || newCart

    const itemIndex: number = cart.items.findIndex(item => item._id === productId)
    const item: ICartItem = cart.items[itemIndex]

    // final quantity should not be less than 0
    if (item) {
      const finalQuantity: number = item.quantity + quantity
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

export default CartService
