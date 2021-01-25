import { Document, Model, model, Schema } from 'mongoose'

export interface ICartItem {
  _id: string,
  quantity: number,
}

export interface ICart {
  userId: string,
  items: Array<ICartItem>,
}

export interface ICartDoc extends Document, ICart {}

class CartModel {
  protected model: Model<ICartDoc>

  constructor() {
    const cartSchema = new Schema<ICart>({
      userId: String,
      items: [{ _id: String, quantity: Number }]
    })

    this.model = model<ICartDoc>('Cart', cartSchema)
  }

  getByOwnerId(userId: string) {
    return this.model.findOne({ userId })
  }

  updateOrCreate(userId: string, cart: ICart) {
    return this.model.findOneAndUpdate({ userId }, cart, { new: true, upsert: true })
  }

  removeByOwnerId(userId: string) {
    return this.model.deleteOne({ userId })
  }
}

export default CartModel
