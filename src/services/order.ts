import { ICartDoc } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'
import getCartSummary, { ICartSummary } from '../modules/getCartSummary'
import CartModel from "../models/cart"
import OrderModel, { IOrder, IOrderDoc } from "../models/order"
import ProductModel from "../models/product"
import { MODEL_IDENTIFIER } from '../constants/identifiers'
import { injectable, inject } from 'inversify'

@injectable()
class OrderService {
  constructor(
    @inject(MODEL_IDENTIFIER.ORDER) protected orderModel: OrderModel,
    @inject(MODEL_IDENTIFIER.CART) protected cartModel: CartModel,
    @inject(MODEL_IDENTIFIER.PRODUCT) protected productModel: ProductModel,
  ) {}

  async create(userId: string, address: string): Promise<IOrderDoc> {
    const cart = await this.cartModel.getByOwnerId(userId)
    if (!cart) throw new Error('Cannot checkout without cart')

    const cartItemIds: string[] = cart.items.map(item => item._id)
    const products: IProductDoc[] = await this.productModel.listByIds(cartItemIds)

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

  async get(userId: string, orderId: string): Promise<IOrder> {
    const order = await this.orderModel.get(userId, orderId)
    if (!order)
      throw new Error('Order not found')
    
    return order
  }
}

export default OrderService
