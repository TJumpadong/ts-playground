import { Document, Model, model, Schema } from 'mongoose'

interface IOrderItem {
  _id: string,
  quantity: number,
}

export interface IOrder {
  address: string,
  userId: string,
  orderId: string,
  items: Array<IOrderItem>,
  price: number,
  totalPrice: number,
}

export interface IOrderDoc extends Document, IOrder {}

class OrderModel {
  model: Model<IOrderDoc>

  constructor() {
    const orderSchema = new Schema<IOrder>({
      address: String,
      userId: String,
      orderId: String,
      items: [{ _id: String, quantity: Number }],
      price: Number,
      totalPrice: Number,
    })

    this.model = model<IOrderDoc>('Order', orderSchema)
  }

  async create(order: IOrder) {
    const newOrder = new this.model(order)
    const createdOrder = await newOrder.save()
    return createdOrder
  }

  list(userId: string) {
    return this.model.find({ userId })
  }

  get(userId: string, orderId: string) {
    return this.model.findOne({ _id: orderId, userId })
  }
}

export default OrderModel
