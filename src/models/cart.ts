import { injectable } from 'inversify'
import { Document, Model, model, Schema } from 'mongoose'

import { ICart, ICartSummary, ICartSummaryItem } from '../interfaces/cart'
import { IProduct } from '../interfaces/product'

import { getFixedNotation } from '../utils/number'

declare type ICartDoc = Document & ICart

@injectable()
class CartModel {
  protected model: Model<ICartDoc>

  constructor () {
    const cartSchema = new Schema({
      userId: String,
      items: [{ _id: String, quantity: Number }]
    })

    this.model = model<ICartDoc>('Cart', cartSchema)
  }

  async getByOwnerId (userId: string): Promise<ICart | null> {
    return await this.model.findOne({ userId })
  }

  async updateOrCreate (cart: ICart): Promise<ICart> {
    return await this.model.findOneAndUpdate({ userId: cart.userId }, cart, { new: true, upsert: true })
  }

  async removeByOwnerId (userId: string): Promise<void> {
    await this.model.deleteOne({ userId })
  }

  getSummary (cart: ICart, products: IProduct[]): ICartSummary {
    const cartItems: ICartSummaryItem[] = []

    cart.items.forEach(item => {
      const product = products.find(product => product._id === item._id)

      if (product?._id !== undefined) {
        cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity: item.quantity
        })
      }
    })

    const cartPrice: number = cartItems.reduce((price: number, item: ICartSummaryItem) =>
      price + getFixedNotation(item.price * item.quantity),
    0
    )

    return {
      items: cartItems,
      price: cartPrice,
      totalPrice: getFixedNotation(cartPrice * 1.07)
    }
  }
}

export default CartModel
