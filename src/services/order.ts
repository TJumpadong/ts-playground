import { ICartDoc } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'
import getCartSummary, { ICartSummary } from '../modules/getCartSummary'
import CartModel from "../models/cart"
import OrderModel, { IOrder, IOrderDoc } from "../models/order"
import ProductModel from "../models/product"

class OrderService {
  protected orderModel: OrderModel
  protected cartModel: CartModel
  protected productModel: ProductModel

  constructor(orderModel: OrderModel, cartModel: CartModel, productModel: ProductModel) {
    this.orderModel = orderModel
    this.cartModel = cartModel
    this.productModel = productModel
  }

  async create(userId: string, address: string): Promise<IOrderDoc> {
    const cart: ICartDoc = await this.cartModel.getByOwnerId(userId)
    if (!cart) throw new Error('Cannot checkout without cart')

    const cartItemIds: Array<string> = cart.items.map(item => item._id)
    const products: Array<IProductDoc> = await this.productModel.listByIds(cartItemIds)

    const cartItemSummary: ICartSummary = getCartSummary(cart, products)
    const order: IOrder = {
      address,
      userId: cart.userId,
      orderId: cart._id,
      items: cart.items,
      price: cartItemSummary.price,
      totalPrice: cartItemSummary.totalPrice,
    }

    // check result
    const createdOrder: IOrderDoc = await this.orderModel.create(order)

    // reset cart
    await this.cartModel.removeByOwnerId(userId)

    // return orderId
    return createdOrder
  }

  list(userId: string) {
    return this.orderModel.list(userId)
  }

  get(userId: string, orderId: string) {
    return this.orderModel.get(userId, orderId)
  }
}

export default OrderService
