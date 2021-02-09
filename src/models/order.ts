import { injectable } from 'inversify'
import { Document, Model, model, Schema } from 'mongoose'

import { IOrder } from '../interfaces/order'

declare type IOrderDoc = Document & IOrder

@injectable()
class OrderModel {
  model: Model<IOrderDoc>

  constructor () {
    const orderSchema = new Schema({
      address: String,
      userId: String,
      orderId: String,
      items: [{ _id: String, quantity: Number }],
      price: Number,
      totalPrice: Number
    })

    this.model = model<IOrderDoc>('Order', orderSchema)
  }

  async create (order: IOrder): Promise<IOrder> {
    const OrderDSModel = this.model
    const newOrder = new OrderDSModel(order)
    const createdOrder = await newOrder.save()
    return createdOrder
  }

  async list (userId: string): Promise<IOrder[]> {
    return await this.model.find({ userId })
  }

  async get (userId: string, orderId: string): Promise<IOrder | null> {
    return await this.model.findOne({ _id: orderId, userId })
  }
}

export default OrderModel
