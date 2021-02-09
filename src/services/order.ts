import { injectable, inject } from 'inversify'

import { MODEL_IDENTIFIER } from '../constants/identifiers'
import { ICartSummary } from '../interfaces/cart'
import { IProduct } from '../interfaces/product'
import { IOrder } from '../interfaces/order'

import CartModel from '../models/cart'
import OrderModel from '../models/order'
import ProductModel from '../models/product'

import { NotFoundError } from '../utils/error'

@injectable()
class OrderService {
  constructor (
    @inject(MODEL_IDENTIFIER.ORDER) protected orderModel: OrderModel,
    @inject(MODEL_IDENTIFIER.CART) protected cartModel: CartModel,
    @inject(MODEL_IDENTIFIER.PRODUCT) protected productModel: ProductModel
  ) {}

  async create (userId: string, address: string): Promise<IOrder> {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (cart === null || cart._id === undefined) throw new NotFoundError('Cannot checkout without cart')

    const cartItemIds: string[] = cart.items.map(item => item._id)
    const products: IProduct[] = await this.productModel.listByIds(cartItemIds)

    const cartItemSummary: ICartSummary = this.cartModel.getSummary(cart, products)
    const order: IOrder = {
      address,
      userId: cart.userId,
      cartId: cart._id,
      items: cart.items,
      price: cartItemSummary.price,
      totalPrice: cartItemSummary.totalPrice
    }

    // check result
    const createdOrder: IOrder = await this.orderModel.create(order)

    // reset cart
    await this.cartModel.removeByOwnerId(userId)

    // return orderId
    return createdOrder
  }

  async list (userId: string): Promise<IOrder[]> {
    return await this.orderModel.list(userId)
  }

  async get (userId: string, orderId: string): Promise<IOrder> {
    const order = await this.orderModel.get(userId, orderId)
    if (order === null) { throw new Error('Order not found') }

    return order
  }
}

export default OrderService
